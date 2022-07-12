import stripeAPI from "stripe"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

// @ts-ignore
import { mutateSanity } from "../lib/sanity/mutateSanity.ts"

// const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

// Export a config object
// to configure the bodyParser
export const config = {
  bodyParser: {
    raw: {
      type: `*/*`,
    },
  },
}

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
      apiVersion: "2020-08-27",
    })
    const sig = req.headers["stripe-signature"]

    const event: any = stripe.webhooks.constructEvent(
      req.body,
      String(sig),
      String(process.env.STRIPE_ENDPOINT_SECRET)
    )

    console.log(event.type)

    // Handle the verified event,
    // event data can be trusted
    switch (event.type) {
      case "customer.subscription.updated":
        console.log("customer.subscription.updated")
        let canceled_at: any = new Date(event?.data?.object?.canceled_at * 1000)
        canceled_at = canceled_at.toISOString().split("T")[0]

        let cancel_at: any = new Date(event?.data?.object.cancel_at * 1000)
        cancel_at = cancel_at.toISOString().split("T")[0]

        await mutateSanity([
          {
            patch: {
              id: event?.data?.object.id,
              set: {
                status: event?.data?.object?.status,
                cancel_at_period_end: event?.data?.object?.cancel_at_period_end,
                canceled_at: canceled_at,
                cancel_at: cancel_at,
                livemode: event?.data?.object?.livemode,
              },
            },
          },
        ])

        console.log("customer.subscription.updated Done")

        // Handle the event
        break
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    res.status(400)
  }
}
