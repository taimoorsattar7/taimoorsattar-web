import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import normalizeEmail from "validator/lib/normalizeEmail"
// @ts-ignore
import { getSanityRef } from "../lib/getSanityRef.ts"
import jwt from "jsonwebtoken"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const email = normalizeEmail(req.body?.email || req.query?.email)
    const password = req.body?.password || req.query?.password

    if (!email && !password) {
      return res.status(403).send("A token is required for authentication")
    } else {
      let cusRef = await getSanityRef("customer", "email", email)

      if (cusRef?.length !== 0 && cusRef[0]?.password == password) {
        var token = jwt.sign(
          {
            email: cusRef[0].email,
          },
          String(process.env.jwt),
          { expiresIn: "7d" }
        )

        res.status(200).json({
          message: "success",
          token: token,
          email: cusRef[0]?.email,
          name: cusRef[0]?.name,
        })
      } else {
        throw {
          status: 500,
          message: "wrong Password",
        }
      }
    }
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
