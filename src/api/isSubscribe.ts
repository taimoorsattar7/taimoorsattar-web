import type { NextApiRequest, NextApiResponse } from "next"
import validator from "validator"
import jwt from "jsonwebtoken"

import { sanityRequest } from "../lib/sanity/sanityActions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body?.token || req.query?.token
    const moduleRef = req.body?.moduleRef || req.query?.moduleRef

    if (!token) {
      return res.status(200).json({
        is: false,
        message: "A token is required for authentication",
      })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, String(process.env.jwt || "secret"))
    } catch (e) {
      return res.status(200).json({
        is: false,
        message: "Invalid or expired token",
      })
    }

    if (!decoded?.email || !validator.isEmail(decoded.email)) {
      return res.status(200).json({
        is: false,
        message: "Invalid email in token",
      })
    }

    let dataQuery = await sanityRequest(
      `*[_type == 'subscriptions' && customer._ref in *[_type=='customer' && email=='${decoded.email}']._id]{price->{_id, content}}`
    )

    if (dataQuery && dataQuery.length > 0 && (dataQuery[0]?.price?.content?._ref === moduleRef || !moduleRef)) {
      return res.status(200).json({
        refid: dataQuery[0]?.price?.content?._ref,
        is: true,
        message: "success",
      })
    } else {
      return res.status(200).json({
        is: false,
        message: "not subscribe to the course",
      })
    }
  } catch (error: any) {
    const status = error.status || error.statusCode || error.response?.status || 500
    const message = error.response?.data?.message || error?.message || "Internal server error"

    return res.status(status).json({
      is: false,
      message,
    })
  }
}
