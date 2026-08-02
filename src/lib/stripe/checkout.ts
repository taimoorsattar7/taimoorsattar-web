import stripeAPI from "stripe"
import { sanityRequest } from "../sanity/sanityActions"

async function getOrCreate100PercentOffCoupon(stripe: stripeAPI) {
  const couponId = "100OFF_FOREVER"
  try {
    return await stripe.coupons.retrieve(couponId)
  } catch (e) {
    try {
      return await stripe.coupons.create({
        id: couponId,
        name: "100% Off Recurring Discount",
        percent_off: 100,
        duration: "forever",
      })
    } catch (err) {
      return null
    }
  }
}

export const createSession = async ({
  successUrl,
  cancelUrl,
  email,
  priceId,
  mode,
  allow_promotion_codes,
  metadata = {},
}: any) => {
  const testKey = process.env.STRIPE_TEST_SECRET_KEY
  const liveKey = process.env.STRIPE_SECRET_KEY || process.env.GATSBY_STRIPE_secret_ID
  const secretKey = (testKey && String(priceId).includes("test") ? testKey : null) || testKey || liveKey

  const stripe = new stripeAPI(String(secretKey), {
    apiVersion: "2022-11-15",
  })

  const buildSession = async (activePriceId: string) => {
    let discountsParam: any = undefined
    try {
      const coupon = await getOrCreate100PercentOffCoupon(stripe)
      if (coupon) {
        discountsParam = [{ coupon: coupon.id }]
      }
    } catch (e) {}

    return stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: activePriceId,
          quantity: 1,
        },
      ],
      ...(discountsParam ? { discounts: discountsParam } : { allow_promotion_codes: true }),
      mode: mode,
      metadata: metadata,
    })
  }

  try {
    return await buildSession(priceId)
  } catch (error: any) {
    const errorMsg = String(error?.message || "")
    if (errorMsg.includes("live mode key was used") || errorMsg.includes("No such price")) {
      try {
        const query = metadata?.priceRef
          ? `*[_id == "${metadata.priceRef}"]{plans[]}[0]`
          : `*[_type == "productPrice" && (plans[].priceID_test == "${priceId}" || plans[].priceID == "${priceId}")]{plans[]}[0]`

        const sanityDoc: any = await sanityRequest(query)
        if (sanityDoc?.plans) {
          const match = sanityDoc.plans.find(
            (p: any) => p.priceID === priceId || p.priceID_test === priceId || p.priceID || p.priceID_test
          )
          const fallbackPriceId = match?.priceID || match?.priceID_test
          if (fallbackPriceId && fallbackPriceId !== priceId) {
            return await buildSession(fallbackPriceId)
          }
        }
      } catch (sanityErr) {}
    }
    throw error
  }
}

export const retrieveSession = async ({ id }: any) => {
  const secretKey = process.env.STRIPE_TEST_SECRET_KEY || process.env.STRIPE_SECRET_KEY || process.env.GATSBY_STRIPE_secret_ID
  const stripe = new stripeAPI(String(secretKey), {
    apiVersion: "2022-11-15",
  })
  const session = await stripe.checkout.sessions.retrieve(id)
  return session
}
