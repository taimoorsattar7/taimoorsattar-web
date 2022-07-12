import generator from "generate-password"
import normalizeEmail from "validator/lib/normalizeEmail"
import jwt from "jsonwebtoken"

import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
// @ts-ignore
import { isSubscribed } from "../lib/isSubscribed.ts"
// @ts-ignore
import { getSanityRef } from "../lib/getSanityRef.ts"
// @ts-ignore
import { querySanity } from "../lib/querySanity.ts"
// @ts-ignore
import { sendEmailSG } from "../lib/sendEmailSG.ts"
// @ts-ignore
import { formatDate } from "../lib/formatDate.ts"
// @ts-ignore
import { mutateSanity } from "../lib/sanity/mutateSanity.ts"
// @ts-ignore
import { unix_timestamp_data } from "../lib/unix_timestamp_data.ts"

// @ts-ignore
import { sendEmailTemplate } from "../lib/sendEmailTemplate.ts"

export default async function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  const email = normalizeEmail(req.body?.email || req.query?.email)
  const priceId = req.body?.priceId || req.query?.priceId
  const name = req.body?.name || req.query?.name
  const priceRef = req.body?.priceRef || req.query?.priceRef
  const redirectOrigin = req.body?.redirectOrigin || req.query?.redirectOrigin

  let isSubscribe = await isSubscribed(email, priceId)

  try {
    if (
      typeof isSubscribe.cusid == "string" &&
      typeof isSubscribe.subid == "string"
    ) {
      let cusRef = await getSanityRef("customer", "email", email)

      let priceKeywords = await querySanity(`
          *[_id=='${priceRef}']{title, plans[]}
        `)

      if (priceKeywords[0]?.plans?.length == 0) {
        throw {
          status: 500,
          message: "wrong information",
        }
      } else {
        let reqPrc = priceKeywords[0]?.plans?.filter(
          (data: { priceID: any; priceID_test: any }) => {
            if (String(data.priceID_test) == String(priceId)) {
              return true
            }

            if (String(data.priceID) == String(priceId)) {
              return true
            }
          }
        )

        let cusID = cusRef[0]?._id ?? ""
        let keyword = reqPrc[0]?.keyword

        let password = generator.generate({
          length: 10,
          numbers: true,
        })

        let mutation = [
          {
            createIfNotExists: {
              _id: cusID ? cusID : isSubscribe.cusid,
              _type: "customer",
              email: email,
              password: cusRef[0]?.password ? cusRef[0]?.password : password,
              name: name,
              cusid: cusID ? cusID : isSubscribe.cusid,
            },
          },
          {
            createIfNotExists: {
              _type: "subscriptions",
              _id: isSubscribe.subid,
              customer: {
                _ref: cusID ? cusID : isSubscribe.cusid,
                _type: "reference",
              },
              price: {
                _ref: priceRef,
                _type: "reference",
              },

              status: isSubscribe?.status,
              cancel_at_period_end: isSubscribe.cancel_at_period_end,
              canceled_at: isSubscribe?.canceled_at
                ? formatDate(unix_timestamp_data(isSubscribe?.canceled_at))
                : "",
              cancel_at: isSubscribe?.cancel_at
                ? formatDate(unix_timestamp_data(isSubscribe?.cancel_at))
                : "",
              start_date: isSubscribe.start_date
                ? formatDate(unix_timestamp_data(isSubscribe.start_date))
                : "",
              livemode: isSubscribe?.livemode,

              plankey: keyword,
              subID: isSubscribe.subid,
              title: `${email} ${
                isSubscribe.start_date
                  ? formatDate(unix_timestamp_data(isSubscribe.start_date))
                  : ""
              }`,
            },
          },
        ]

        let results = await mutateSanity(mutation)

        if (typeof results.transactionId == "string") {
          var token = jwt.sign(
            {
              name: name,
              email: email,
            },
            String(process.env.jwt),
            { expiresIn: "7d" }
          )

          try {
            sendEmailTemplate({
              email: email,
              from: String(process.env.EMAIL_FROM),
              subject: "Successfully subscribe to the course - Taimoor Sattar",
              metadata: {
                courseName: priceKeywords[0]?.title,
                email: email,
                startDate: String(
                  formatDate(unix_timestamp_data(isSubscribe.start_date))
                ),
                subscription: "Monthly",
              },
              templateId: "d-ea42915a02c9448eb2676be919f127a9",
            })
          } catch (error) {}

          try {
            sendEmailTemplate({
              email: email,
              from: String(process.env.EMAIL_FROM),
              subject: "Registered - Taimoor Sattar",
              metadata: {
                email: email,
                password: cusRef[0]?.password
                  ? String(cusRef[0]?.password)
                  : String(password),
              },
              templateId: "d-e0c79d4f1e924172a352d5b0421e2ffd",
            })
          } catch (error) {}

          if (redirectOrigin) {
            res.redirect(`${redirectOrigin}?state=success&token=${token}`)
          } else {
            res.status(200).json({
              token: token,
              message: "success",
            })
          }
        } else {
          if (redirectOrigin) {
            res.redirect(`${redirectOrigin}?state=fail`)
            return
          } else {
            res.status(400).json({
              message: null,
            })
          }
        }
        return
      }
    } else {
      throw {
        status: 400,
        message: "You're not subscribed actually!!!",
      }
    }
  } catch (error: any) {
    const status = error.response?.status || error.statusCode || 500
    const message = error.response?.data?.message || error.message

    res.status(status).json({
      // @ts-ignore
      message: error.expose ? message : `Faulty ${req.baseUrl}: ${message}`,
    })
  }
}
