import axios, { AxiosResponse } from "axios"

export const mutateSanity = async (mutation: any) => {
  try {
    let results: AxiosResponse<any, any> = await axios.post(
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

    return results.data
  } catch (e) {
    return {
      message: null,
    }
  }
}
