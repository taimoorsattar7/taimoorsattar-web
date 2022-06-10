// import nodemailer from "nodemailer"
// import nodemailerSendgrid from "nodemailer-sendgrid"

// const bcrypt = require("bcryptjs")
// const validator = require("validator")
const fs = require("fs").promises
// var juice = require("juice")

// const Handlebars = require("handlebars")

// const hbstemplates = require("../hbstemplates/main.js")

export const sendEmailSGtemplate = async (data: {
  email: any
  subject: any
  template: any
}) => {
  try {
    // const datafs = await fs.readFile(result.path, "binary")
  } catch (err) {
    return []
  }
}
