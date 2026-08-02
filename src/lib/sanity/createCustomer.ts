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
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || "7p4bxs1b"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || "production"
    await axios.post(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
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
