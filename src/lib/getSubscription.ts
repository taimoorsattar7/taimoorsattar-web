import axios, { AxiosResponse } from "axios"

export default async function getSubscription({ email = "" }) {
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || "7p4bxs1b"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || "production"
    let { data }: AxiosResponse<any> = await axios.post(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}`,
      {
        query: `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${email}']._id]{'module': price->content->{_id, title, seo, 'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}, slug}}`,
      }
    )
    return { data: data.result }
  } catch (e) {
    return null
  }
}
