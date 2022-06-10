import sgMail from "@sendgrid/mail"
import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const email = req?.body?.email || req?.query?.email
  const subject = req?.body?.subject || req?.query?.subject
  const metadata = req?.body?.metadata || req?.query?.metadata
  const templateId = req?.body?.templateId || req?.query?.templateId

  try {
    sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))
    const msg = {
      to: email,
      from: String(process.env.EMAIL_FROM),
      templateId: templateId,
      dynamicTemplateData: {
        subject: subject,
        // name: "Some One",
        // city: "Denver",
      },
    }
    sgMail.send(msg)

    res.status(200).json({
      emailSend: msg ? true : false,
    })
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
