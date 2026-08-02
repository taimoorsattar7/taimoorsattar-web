import axios, { AxiosResponse } from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
// var jwt = require("jsonwebtoken")

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || "7p4bxs1b"
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || "production"
    let response: AxiosResponse<any>
    response = await axios.post(
      `https://${projectId}.api.sanity.io/v2021-06-07/data/query/${dataset}`,
      {
        query: `*[_type == 'subscriptions' && _id=='${req.body._id}']{_id, active, dates, price->{_id,title, 'files': files[].asset->{_updatedAt, extension, originalFilename, url} }}`,
      }
    )

    let newdata = response.data.result.map((doc: any) => {
      return {
        _id: doc._id,
        active: doc.active,
        dates: doc.dates,
        title: doc.price.title,
        priceID: doc.price._id,
        files: doc.price.files,
      }
    })

    res.json({ data: newdata })
  } catch (e) {
    res.json({ message: "notFound" })
  }
}
