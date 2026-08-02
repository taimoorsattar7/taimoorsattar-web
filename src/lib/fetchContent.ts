import axios, { AxiosResponse } from "axios"

export const fetchContent = async ({ slug }: any) => {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || "7p4bxs1b"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || "production"
    let { data }: AxiosResponse<any> = await axios.post(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}`,
      {
        query: `*[_type =='content' && slug.current=='${slug}']{_id, title, slug, body, plan, seo}`,
      }
    )

    if (data?.result?.length > 0) {
      if (data?.result[0]?.plan == "Basic") {
        return {
          message: "success",
          content: data?.result[0],
        }
      } else {
        return {
          message: "authFail",
          content: data?.result[0],
        }
      }
    } else {
      return {
        message: "notFound",
        content: null,
      }
    }
  } catch (e) {
    return {
      message: "fail",
      content: null,
    }
  }
}
