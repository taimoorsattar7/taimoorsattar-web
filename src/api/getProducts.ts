import axios, { AxiosResponse } from "axios"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
// var jwt = require("jsonwebtoken")

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  try {
    let response: AxiosResponse<any>
    response = await axios.post(
      `https://${process.env.GATSBY_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${process.env.GATSBY_SANITY_DATASET}`,
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
