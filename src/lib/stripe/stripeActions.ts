import stripeAPI from 'stripe'

const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
  apiVersion: '2022-11-15',
})

export const stripeUpdate: any = async (id: string, obj: any) => {
  try {
    let subscription = await stripe.subscriptions.update(id, obj)
    return subscription
  } catch (err: any) {
    return err
  }
}

/**
 * Find an existing Stripe product by name, or create a new one.
 * Uses metadata.sanity_product_name to avoid duplicates.
 */
export const stripeUpsertProduct = async (
  name: string,
  sanityPriceDocId: string
): Promise<stripeAPI.Product> => {
  // Search for existing product with matching metadata
  const existing = await stripe.products.search({
    query: `metadata['sanity_price_doc_id']:'${sanityPriceDocId}'`,
    limit: 1,
  })

  if (existing.data.length > 0) {
    // Update existing product name in case it changed
    const updated = await stripe.products.update(existing.data[0].id, {
      name,
    })
    return updated
  }

  // Create a new product
  const product = await stripe.products.create({
    name,
    metadata: {
      sanity_price_doc_id: sanityPriceDocId,
    },
  })

  return product
}

/**
 * Create a Stripe Price for a given product.
 * Always creates a new price (Stripe prices are immutable).
 * Pass interval='one_time' for one-time payments.
 */
export const stripeCreatePrice = async ({
  productId,
  unitAmount, // in cents
  currency = 'usd',
  interval = 'month',
  planKey,
  sanityPlanKey,
}: {
  productId: string
  unitAmount: number
  currency?: string
  interval?: 'month' | 'year' | 'one_time'
  planKey?: string
  sanityPlanKey?: string
}): Promise<stripeAPI.Price> => {
  const priceData: stripeAPI.PriceCreateParams = {
    product: productId,
    unit_amount: unitAmount,
    currency,
    metadata: {
      ...(planKey ? { plan_key: planKey } : {}),
      ...(sanityPlanKey ? { sanity_plan_key: sanityPlanKey } : {}),
    },
  }

  if (interval !== 'one_time') {
    priceData.recurring = { interval }
  }

  const price = await stripe.prices.create(priceData)
  return price
}

/**
 * Archive all previously active prices for a product so only the latest is active.
 * Stripe prices are immutable — we create a new one and deactivate old ones.
 */
export const stripeDeactivatePrices = async (
  productId: string,
  exceptPriceId: string
): Promise<void> => {
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  })

  for (const price of prices.data) {
    if (price.id !== exceptPriceId) {
      await stripe.prices.update(price.id, { active: false })
    }
  }
}
