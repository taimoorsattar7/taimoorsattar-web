import axios from "axios"

export const createCustomer = async (data: any) => {
  try {
    let mutation = [
      {
        createIfNotExists: {
          _id: data.id,
          _type: "customer",
          email: data.email,
          name: data.name,
          cusid: data.id,
        },
      },
    ]
    await axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.GATSBY_SANITY_DATASET}`,
      {
        mutations: mutation,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_SANITY_BEARER_TOKEN}`,
        },
      }
    )
    return true
  } catch (e) {
    return false
  }
}
