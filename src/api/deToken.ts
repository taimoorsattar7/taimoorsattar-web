import type { NextApiRequest, NextApiResponse } from "next"
import jwt from "jsonwebtoken"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.body?.token || req.query?.token

    var decoded: any = jwt.verify(token, String(process.env.jwt))

    res.status(200).json({
      message: "success",
      data: decoded,
    })
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${(req as any).baseUrl || req.url}: ${message}`,
    })
  }
}
