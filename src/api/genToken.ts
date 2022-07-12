import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import jwt from "jsonwebtoken"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const metadata = req.body?.metadata
    const expiresIn = req.body?.expiresIn

    var token = jwt.sign(
      {
        ...metadata,
      },
      String(process.env.jwt),
      { expiresIn: expiresIn ? expiresIn : "7d" }
    )

    res.status(200).json({
      message: "success",
      token: token,
    })
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
