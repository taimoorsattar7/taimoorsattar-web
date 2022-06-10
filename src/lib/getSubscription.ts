import axios, { AxiosResponse } from "axios"

export default async function getSubscription({ email = "" }) {
  try {
    let { data }: AxiosResponse<any> = await axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
      {
        query: `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${email}']._id]{'module': price->content->{_id, title, seo, 'img': seo.image.asset->{_updatedAt, extension, originalFilename, url}, slug}}`,
      }
    )
    return { data: data.result }
  } catch (e) {
    return null
  }
}
