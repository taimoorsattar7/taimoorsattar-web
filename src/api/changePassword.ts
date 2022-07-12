import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
import normalizeEmail from "validator/lib/normalizeEmail"
import validator from "validator"

import { querySanity } from "../lib/querySanity.ts"
import { mutateSanity } from "../lib/sanity/mutateSanity.ts"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  try {
    const email: string = String(
      normalizeEmail(req.body?.email || req.query?.email)
    )
    const prvPassword = req.body?.prvPassword || req.query?.prvPassword
    const newPassword = req.body?.newPassword || req.query?.newPassword

    if (!validator.isEmail(email)) {
      throw {
        is: false,
        status: 400,
        message: "Email not valid",
      }
    }

    if (!newPassword) {
      throw {
        is: false,
        status: 400,
        message: "New Password is empty",
      }
    }

    let dataQuery = await querySanity(
      `*[_type=='customer' && email=='${email}']{
        _id,
        email,
        password
      }`
    )

    if (dataQuery[0]?.password == prvPassword) {
    } else {
      throw {
        is: false,
        status: 500,
        message: "Password value does not match",
      }
    }

    let cusMutation = await mutateSanity([
      {
        patch: {
          id: dataQuery[0]?._id,
          set: {
            password: newPassword,
          },
        },
      },
    ])

    if (cusMutation?.results[0]?.operation == "update") {
      res.status(200).json({
        is: true,
        message: "success",
      })
    } else {
      throw {
        is: false,
        status: 500,
        message: "Operation Fail",
      }
    }
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
