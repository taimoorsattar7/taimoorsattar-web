import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityRequest, sanityUpdate } from '@/src/lib/sanity/sanityActions'
import {
  stripeUpsertProduct,
  stripeCreatePrice,
  stripeDeactivatePrices,
} from '@/src/lib/stripe/stripeActions'

/**
 * POST /api/sanity-stripe-sync
 *
 * Called by a Sanity webhook (or manually) when a `price` document is saved.
 * For each plan in the price document:
 *   1. Upsert a Stripe Product (named after the price doc title)
 *   2. Create a new Stripe Price with the updated amount
 *   3. Deactivate old Stripe Prices for that product
 *   4. Write the new Stripe Price ID back to Sanity (priceID_test or priceID)
 *
 * Webhook payload shape (Sanity sends the full document under result._id / result.plans):
 *   { _id, _type, title, plans: [{ _key, keyword, price, currency, source }] }
 *
 * You can also call this route directly with a JSON body containing the Sanity price doc ID:
 *   POST /api/sanity-stripe-sync  { "sanityDocId": "<price-doc-id>" }
 */

// Detect whether we are using live or test Stripe keys
const isLiveMode = String(process.env.GATSBY_STRIPE_secret_ID).startsWith('sk_live')

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // ── 1. Resolve the Sanity price document ID ──────────────────────────────
    //
    // Two invocation modes:
    //   A) Sanity webhook: payload has `_id` at the top level (the price doc)
    //   B) Manual trigger: payload has { sanityDocId: "..." }
    //
    let priceDocId: string =
      req.body?._id ||        // Sanity webhook (document mutation)
      req.body?.sanityDocId   // Manual POST trigger

    if (!priceDocId) {
      return res.status(400).json({ message: 'Missing price document ID (body._id or body.sanityDocId)' })
    }

    // ── 2. Fetch the full price document from Sanity ────────────────────────
    const docs: any[] = await sanityRequest(
      `*[_type == 'price' && _id == '${priceDocId}']{
        _id,
        title,
        product->{ title },
        plans[]{ _key, keyword, price, currency, source, priceID, priceID_test }
      }`
    )

    if (!docs || docs.length === 0) {
      return res.status(404).json({ message: `Price doc not found: ${priceDocId}` })
    }

    const priceDoc = docs[0]
    const plans: any[] = priceDoc.plans || []
    const productTitle: string = priceDoc.product?.title || priceDoc.title || 'Course'

    if (plans.length === 0) {
      return res.status(200).json({ message: 'No plans to sync', synced: [] })
    }

    // ── 3. Process each plan ────────────────────────────────────────────────
    const results: any[] = []

    for (const plan of plans) {
      // Skip free plans — no Stripe price needed
      if (!plan.price || Number(plan.price) === 0) {
        results.push({ key: plan._key, keyword: plan.keyword, skipped: true, reason: 'free plan' })
        continue
      }

      const unitAmount = Math.round(Number(plan.price) * 100) // dollars → cents

      // 3a. Upsert a Stripe Product for this price plan
      //     We use the Sanity price doc _id as a stable product identifier
      const planProductName = `${productTitle} — ${plan.keyword || 'Plan'}`
      const stripeProduct = await stripeUpsertProduct(planProductName, `${priceDocId}_${plan._key}`)

      // 3b. Create a new Stripe Price (recurring monthly)
      const stripePrice = await stripeCreatePrice({
        productId: stripeProduct.id,
        unitAmount,
        currency: 'usd',
        interval: 'month',
        planKey: plan.keyword,
        sanityPlanKey: plan._key,
      })

      // 3c. Deactivate old prices so only the new one is active
      await stripeDeactivatePrices(stripeProduct.id, stripePrice.id)

      // 3d. Write the new Stripe Price ID back to Sanity
      //     Use a patch on the specific array item via its _key
      const fieldToUpdate = isLiveMode ? 'priceID' : 'priceID_test'

      // Sanity patch for an array item requires the `setIfMissing` + item key path
      await sanityUpdate(priceDocId, {
        [`plans[_key=="${plan._key}"].${fieldToUpdate}`]: stripePrice.id,
      })

      results.push({
        key: plan._key,
        keyword: plan.keyword,
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
        mode: isLiveMode ? 'live' : 'test',
        fieldUpdated: fieldToUpdate,
      })
    }

    console.log('[sanity-stripe-sync] Sync complete:', JSON.stringify(results, null, 2))

    return res.status(200).json({
      message: 'Sync complete',
      synced: results,
    })
  } catch (err: any) {
    console.error('[sanity-stripe-sync] Error:', err?.message || err)
    return res.status(500).json({
      message: err?.message || 'Internal server error',
    })
  }
}
