import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import validator from "validator"
import jwt from "jsonwebtoken"

// @ts-ignore
import { querySanity } from "../lib/querySanity.ts"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const token = req.body?.token || req.query?.token

    const moduleRef = req.body?.moduleRef || req.query?.moduleRef

    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    var decoded: any = jwt.verify(token, String(process.env.jwt))

    if (!validator.isEmail(decoded.email)) {
      throw {
        status: 400,
        message: "Bad Token",
      }
    }

    let dataQuery = await querySanity(`
    *[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${decoded.email}']._id]{price->{_id, content}}
        `)

    if (dataQuery[0]?.price?.content?._ref == moduleRef) {
      res.status(200).json({
        refid: dataQuery[0]?.price?.content?._ref,
        is: true,
        message: "success",
      })
    } else {
      throw {
        is: false,
        status: 500,
        message: "not subscribe to the course",
      }
    }
  } catch (error: any) {
    const status = error.response?.status || error?.statusCode || 500
    const message = error.response?.data?.message || error?.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
