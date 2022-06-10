import axios, { AxiosResponse } from "axios"

export const fetchContent = async ({ slug }: any) => {
  try {
    let { data }: AxiosResponse<any> = await axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
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
