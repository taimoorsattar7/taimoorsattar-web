import stripeAPI from "stripe"

const stripe = new stripeAPI(String(process.env.GATSBY_STRIPE_secret_ID), {
  apiVersion: "2022-11-15",
})

export const stripeUpdate: any = async (id: string, obj: any) => {
  try {
    let subscription = await stripe.subscriptions.update(id, obj)
    return subscription
  } catch (err: any) {
    return err
  }
}
