import nodemailer from "nodemailer"
import nodemailerSendgrid from "nodemailer-sendgrid"

export const sendEmailTemplate = async ({ email, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: String(process.env.SENDGRID_API_KEY),
      })
    )

    try {
      loadTemplate("updates-april-2017", users)
        .then(async results => {
          return Promise.all(
            results.map(result => {
              const msg = {
                from: process.env.EMAIL_FROM, // Use the email address or domain you verified above,
                to: result.context.email,
                subject: result.email.subject,
                html: result.email.html,
                text: result.email.text,
              }
            })
          )
        })
        .then(() => {
          console.log("Yay!")
        })

      return { emailSend: true }
    } catch (err) {
      return { emailSend: false }
    }
  } catch (err) {
    return []
  }
}
