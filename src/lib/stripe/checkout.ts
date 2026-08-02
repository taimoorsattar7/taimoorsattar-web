import stripeAPI from "stripe"

export const createSession = async ({
  successUrl,
  cancelUrl,
  email,
  priceId,
  mode,
  allow_promotion_codes,
  metadata = {},
}: any) => {
  const secretKey = process.env.STRIPE_TEST_SECRET_KEY || process.env.STRIPE_SECRET_KEY || process.env.GATSBY_STRIPE_secret_ID
  const stripe = new stripeAPI(String(secretKey), {
    apiVersion: "2022-11-15",
  })

  // Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: email,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: allow_promotion_codes,
    mode: mode,
    metadata: metadata,
  })

  return session
}

export const retrieveSession = async ({ id }: any) => {
  const secretKey = process.env.STRIPE_TEST_SECRET_KEY || process.env.STRIPE_SECRET_KEY || process.env.GATSBY_STRIPE_secret_ID
  const stripe = new stripeAPI(String(secretKey), {
    apiVersion: "2022-11-15",
  })
  const session = await stripe.checkout.sessions.retrieve(id)
  return session
}
