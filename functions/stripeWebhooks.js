// http://localhost:8888/.netlify/functions/stripeWebhooks

const stripe = require("stripe")(process.env.GATSBY_STRIPE_secret_ID)
const Axios = require("axios")
// const { formatDate } = require("../src/lib/formatDate.ts")

exports.handler = async ({ body, headers }) => {
  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      body,
      headers["stripe-signature"],
      "whsec_aebb8c4b17a906355d44aab423612a1084bcf77b668018f3e46c8f8e1c5ba5e2"
    )
    // console.log(stripeEvent.type)
    // console.log("-------------------")
    // console.log(stripeEvent?.data?.object)

    if (stripeEvent.type === "customer.subscription.created") {
      let canceled_at = new Date(stripeEvent?.data?.object.canceled_at * 1000)
      canceled_at = canceled_at.toISOString().split("T")[0]

      let cancel_at = new Date(stripeEvent?.data?.object.cancel_at * 1000)
      cancel_at = cancel_at.toISOString().split("T")[0]

      await Axios.post(
        `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.GATSBY_SANITY_DATASET}`,
        {
          mutations: [
            {
              patch: {
                id: stripeEvent?.data?.object.id,
                set: {
                  status: stripeEvent?.data?.object.status,
                  cancel_at_period_end:
                    stripeEvent?.data?.object.cancel_at_period_end,
                  canceled_at: canceled_at,
                  cancel_at: cancel_at,
                  livemode: stripeEvent?.data?.object.livemode,
                },
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GATSBY_SANITY_BEARER_TOKEN}`,
          },
        }
      )
    }
  } catch (err) {
    console.log(err)
  }
}
