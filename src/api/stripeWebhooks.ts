import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

import stripeAPI from "stripe"

// Export a config object
// to configure the bodyParser
export const config = {
  bodyParser: {
    raw: {
      type: `*/*`,
    },
  },
}

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
      apiVersion: "2020-08-27",
    })
    const endpointSecret: any = process.env.STRIPE_ENDPOINT_SECRET
    const sig: any = req.headers["stripe-signature"]
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)

    // Handle the verified event,
    // event data can be trusted
    switch (event.type) {
      case "customer.subscription.created":
        console.log("CheckoutSession completed, fulfill the order!")
      case "checkout.session.completed":
        console.log("CheckoutSession completed, fulfill the order!")
        // Handle the event
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    res.status(200)
  } catch (err) {
    console.warn(err.message)
    res.status(400)
  }
}
