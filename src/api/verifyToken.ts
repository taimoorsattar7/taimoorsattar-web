import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import validator from "validator"
// @ts-ignore
import { getSanityRef } from "../lib/getSanityRef.ts"
import jwt from "jsonwebtoken"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"]

    if (!token) {
      return res.status(403).send("A token is required for authentication")
    }

    const decoded: any = jwt.verify(token, String(process.env.jwt))

    if (!validator.isEmail(decoded.email)) {
      throw {
        status: 400,
        message: "Bad Token",
      }
    }

    let cusRef = await getSanityRef("customer", "email", decoded.email)

    if (cusRef.length !== 0) {
      let token = jwt.sign(
        {
          name: cusRef[0].name,
          email: cusRef[0].email,
        },
        String(process.env.jwt),
        { expiresIn: "7d" }
      )

      res.status(200).json({
        message: "success",
        token: token,
        email: cusRef[0].email,
        name: cusRef[0].name,
      })
    } else {
      throw {
        status: 500,
        message: "bad Token",
      }
    }
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      // @ts-ignore
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
