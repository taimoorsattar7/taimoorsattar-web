import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

// @ts-ignore
import { sendEmailSGtemplate } from "../lib/sendEmailSGtemplate"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    let ee = await sendEmailSGtemplate({
      email: "example@taimoorsattar.dev",
      subject: "test",
      template: "forgetPassword",
    })

    res.status(200).json({
      message: ee,
    })
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
