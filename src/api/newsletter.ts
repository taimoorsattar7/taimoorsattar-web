import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import Airtable from "airtable"
import validator from "validator"
import normalizeEmail from "validator/lib/normalizeEmail"
// const nodemailer = require("nodemailer")
// const nodemailerSendgrid = require("nodemailer-sendgrid")

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  //pull the required information from your environment variables, which can be set in the Netlify UI

  const email = String(normalizeEmail(req.body.email || req.query.token))
  const name = String(normalizeEmail(req.body.name || req.query.name))

  try {
    Airtable.configure({ apiKey: process.env.API_KEY })
    var base = Airtable.base(String(process.env.API_CLIENT_ID))
    const table = base("table 1")

    if (!validator.isEmail(email)) {
      res.json({
        message: "fail",
      })
    } else {
      table.create(
        [
          {
            fields: {
              Name: name,
              Email: email,
              Date: new Date(),
            },
          },
        ],
        function (err: any, records: any[]) {
          if (err) {
            res.status(200).json({ message: "fail" })
          } else {
            records.forEach(function (_record: any) {
              res.status(200).json({ message: "success" })
            })
          }
        }
      )
    }
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
