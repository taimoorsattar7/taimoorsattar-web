import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

// @ts-ignore
import { getSanityRef } from "../lib/getSanityRef.ts"
import normalizeEmail from "validator/lib/normalizeEmail"
import jwt from "jsonwebtoken"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    let email = normalizeEmail(req.body.email)
    let cusRef = await getSanityRef("customer", "email", email)

    if (cusRef.length !== 0 && cusRef[0].password == req.body.password) {
      var token = jwt.sign(
        {
          email: req.body.email,
        },
        String(process.env.jwt),
        { expiresIn: "7d" }
      )

      res.status(200).json({
        message: "success",
        token: token,
        email: email,
      })
    } else {
      throw {
        status: 500,
        message: "wrong Password",
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
