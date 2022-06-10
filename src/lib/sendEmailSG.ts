import nodemailer from "nodemailer"
import nodemailerSendgrid from "nodemailer-sendgrid"

export const sendEmailSG = async (data: {
  email: any
  subject: any
  html: any
}) => {
  try {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: String(process.env.SENDGRID_API_KEY),
      })
    )

    const msg = {
      from: process.env.EMAIL_FROM, // Use the email address or domain you verified above,
      to: data.email,
      subject: data.subject,
      html: data.html,
    }

    try {
      await transporter.sendMail(msg)
      return { emailSend: true }
    } catch (err) {
      return { emailSend: false }
    }
  } catch (err) {
    return []
  }
}
