import type { NextApiRequest, NextApiResponse } from "next"
import normalizeEmail from "validator/lib/normalizeEmail"
import { sanityRequest } from "../lib/sanity/sanityActions"
import jwt from "jsonwebtoken"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rawEmail = req.body?.email || req.query?.email
    const password = req.body?.password || req.query?.password

    if (!rawEmail || !password) {
      return res.status(400).json({
        message: "Email and password are required for authentication",
      })
    }

    const email = normalizeEmail(rawEmail)
    if (!email) {
      return res.status(400).json({
        message: "Invalid email format",
      })
    }

    let cusRef = await sanityRequest(
      `*[_type =='customer' && email=='${email}']`
    )

    if (cusRef && cusRef.length > 0 && cusRef[0]?.password === password) {
      const jwtSecret = process.env.jwt || "secret"
      const token = jwt.sign(
        {
          email: cusRef[0].email,
        },
        String(jwtSecret),
        { expiresIn: "7d" }
      )

      return res.status(200).json({
        message: "success",
        token: token,
        email: cusRef[0]?.email,
        name: cusRef[0]?.name,
      })
    } else {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }
  } catch (error: any) {
    const status = error.status || error.statusCode || error.response?.status || 500
    const message = error.response?.data?.message || error.message || "Login failed"

    return res.status(status).json({
      message: `Faulty login: ${message}`,
    })
  }
}
