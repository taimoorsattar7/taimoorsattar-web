import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

import { sendEmailTemplate } from "../lib/sendEmailTemplate"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const email = req?.body?.email || req?.query?.email
  const subject = req?.body?.subject || req?.query?.subject
  const metadata = req?.body?.metadata || req?.query?.metadata
  const templateId = req?.body?.templateId || req?.query?.templateId

  try {
    let sgemail = await sendEmailTemplate({
      email: email,
      from: String(process.env.EMAIL_FROM),
      subject: subject,
      metadata: metadata,
      templateId: templateId,
    })

    res.status(200).json({
      emailSend: sgemail.is == true ? true : false,
    })
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
