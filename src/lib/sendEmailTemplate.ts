import sgMail from "@sendgrid/mail"

export const sendEmailTemplate = async ({
  email,
  from,
  subject,
  metadata,
  templateId,
}: any) => {
  try {
    sgMail.setApiKey(String(process.env.SENDGRID_API_KEY))
    const msg = {
      to: email,
      from: from,
      templateId: templateId,
      dynamicTemplateData: {
        subject: subject,
        ...metadata,
      },
    }
    sgMail.send(msg)
    return {
      is: true,
    }
  } catch (error) {
    return {
      is: true,
      message: error,
    }
  }
}
