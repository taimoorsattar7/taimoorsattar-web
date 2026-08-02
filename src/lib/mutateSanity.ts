import Axios from "axios"

export const mutateSanity = async (mutationRequest: any) => {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || "7p4bxs1b"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || "production"
    let results = await Axios.post(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`,
      {
        mutations: mutationRequest,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_SANITY_BEARER_TOKEN}`,
        },
      }
    )

    return results.data
  } catch (e) {
    return {
      message: null,
    }
  }
}
