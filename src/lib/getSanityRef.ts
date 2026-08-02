import axios, { AxiosResponse } from "axios"

export const getSanityRef = async (type: string, key: string, value: any) => {
  let sanityRef: AxiosResponse<any>
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || "7p4bxs1b"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || "production"
    sanityRef = await axios.post(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}`,
      {
        query: `*[_type =='${type}' && ${key}=="${value}"]`,
      }
    )

    return sanityRef?.data?.result
  } catch (err) {
    return []
  }
}
