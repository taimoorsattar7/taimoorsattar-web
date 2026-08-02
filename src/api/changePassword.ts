import type { NextApiRequest, NextApiResponse } from "next"
import normalizeEmail from "validator/lib/normalizeEmail"
import validator from "validator"
import { sanityRequest, sanityUpdate } from "../lib/sanity/sanityActions"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rawEmail = req.body?.email || req.query?.email
    const prvPassword = req.body?.prvPassword || req.query?.prvPassword
    const newPassword = req.body?.newPassword || req.query?.newPassword

    if (!rawEmail || !validator.isEmail(String(rawEmail))) {
      return res.status(400).json({
        is: false,
        message: "A valid email address is required",
      })
    }

    if (!prvPassword) {
      return res.status(400).json({
        is: false,
        message: "Current password is required",
      })
    }

    if (!newPassword || String(newPassword).length < 6) {
      return res.status(400).json({
        is: false,
        message: "New password must be at least 6 characters",
      })
    }

    const email = normalizeEmail(String(rawEmail))

    let dataQuery = await sanityRequest(
      `*[_type=='customer' && email=='${email}']{
        _id,
        email,
        password
      }`
    )

    if (!dataQuery || dataQuery.length === 0) {
      return res.status(404).json({
        is: false,
        message: "Customer account not found",
      })
    }

    const currentDoc = dataQuery[0]
    if (currentDoc.password && currentDoc.password !== prvPassword) {
      return res.status(401).json({
        is: false,
        message: "Current password does not match",
      })
    }

    const cusMutation = await sanityUpdate(currentDoc._id, {
      password: newPassword,
    })

    if (cusMutation && (cusMutation._id || cusMutation._type || cusMutation.password || Array.isArray(cusMutation.results))) {
      return res.status(200).json({
        is: true,
        message: "success",
      })
    } else {
      return res.status(500).json({
        is: false,
        message: "Password update failed in Sanity",
      })
    }
  } catch (error: any) {
    const status = error.status || error.statusCode || error.response?.status || 500
    const message = error.response?.data?.message || error.message || "Password change error"

    return res.status(status).json({
      is: false,
      message,
    })
  }
}
