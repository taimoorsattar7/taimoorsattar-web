import axios, { AxiosResponse } from "axios"

export const querySanity = async (query: string) => {
  let sanityRef: AxiosResponse<any>
  try {
    sanityRef = await axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
      {
        query: query,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_SANITY_BEARER_TOKEN}`,
        },
      }
    )

    return sanityRef.data?.result
  } catch (err) {
    return []
  }
}
