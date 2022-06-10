import axios, { AxiosResponse } from "axios"

export const getSanityRef = async (type: string, key: string, value: any) => {
  let sanityRef: AxiosResponse<any>
  try {
    sanityRef = await axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
      {
        query: `*[_type =='${type}' && ${key}=="${value}"]`,
      }
    )

    return sanityRef?.data?.result
  } catch (err) {
    return []
  }
}
