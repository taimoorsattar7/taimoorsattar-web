import React, { useState, useEffect } from "react"
import { PageProps } from "gatsby"
import toast, { Toaster } from "react-hot-toast"

// import { navigate } from "gatsby"
import validator from "validator"
import { useForm } from "react-hook-form"
import axios from "axios"
import queryString from "query-string"

import { sanityRequest } from "../lib/sanity/sanityActions"
import Layout from "@components/layout"
import SEO from "@components/seo"

const ForgotPasswordActionPage: React.FC<PageProps<any>> = ({ location }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm()

  const [disable, setDisable] = useState<Boolean>(false)
  const [resultToken, setResultToken] = useState<any>(null)

  async function run() {
    const queriedTheme = queryString.parse(location.search)

    try {
      let resultToken: any = await axios.post(`/api/deToken`, {
        token: queriedTheme.emailtoken,
      })

      if (validator.isEmail(resultToken?.data?.data?.email)) {
        setResultToken(resultToken?.data?.data)
        reset({
          email: String(resultToken?.data?.data?.email),
        })
      } else {
        setResultToken(false)
      }
      return
    } catch (error) {
      setResultToken(false)
    }
  }

  useEffect(() => {
    run()
  }, [])

  async function onSubmit(data: { email: string; newPassword: string }) {
    setDisable(true)
    try {
      let cusData = await sanityRequest(
        `*[_type=='customer' && email=='${data.email}']`
      )

      let changePasswordRequest: any = await axios.post(`/api/changePassword`, {
        email: cusData[0]?.email,
        prvPassword: cusData[0]?.password,
        newPassword: data.newPassword,
      })

      if (changePasswordRequest.data.is == true) {
        await axios.post(`/api/sendEmailTemplate`, {
          templateId: "d-e7116f065c074f1fa8f082ba66980a56",
          subject: "Password Changed - Taimoor Sattar",
          email: data.email,
        })

        reset({
          newPassword: "",
        })
        toast.success("Your Password has been changed.")
      } else {
        toast.error("Email is not valid.")
      }

      setDisable(false)
    } catch (e) {
      setDisable(false)
      toast.error("Something went wrong.")
    }
  }

  if (resultToken == false) {
    return (
      <Layout location={location}>
        <SEO title="Reset Password Action" location={location} />

        <Toaster position="top-center" />
        <div className="wrapper wrapper--small m-b-25">
          <div className="m-t-10 m-b-10">
            <h1 className="mb-8 text-5xl text-center">
              <b>Token is not valid or expired</b>
            </h1>
            <p className="text-lg text-center">
              If you forget your password, you can reset on{" "}
              <a href="/forgot-password">this page</a>.
            </p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout location={location}>
      <SEO title="Reset Password Action" location={location} />

      <Toaster position="top-center" />

      <div className="wrapper wrapper--small m-b-25">
        <div className="m-t-10 m-b-10">
          <h1 className="mb-8 text-5xl text-center">
            <b>Reset Password Action</b>
          </h1>
          <p className="text-lg text-center">
            Please enter your email below, we'll send you reset password link to
            your inbox.
          </p>
        </div>

        <form className="field" onSubmit={handleSubmit(onSubmit)}>
          <div className="field--gap">
            <label
              className="headline headline__sml headline--white field__label"
              htmlFor="email"
            >
              Email
            </label>

            <input
              {...register("email", { required: true })}
              className="headline headline__text field__input"
              type="email"
              placeholder="example@email.com"
              autoComplete="on"
              required
              readOnly
            />
          </div>

          <div className="field--gap">
            <label
              className="headline headline__sml headline--white field__label"
              htmlFor="email"
            >
              New Password
            </label>

            <input
              {...register("newPassword", { required: true })}
              className="headline headline__text field__input"
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              autoComplete="on"
              required
            />
          </div>

          <button className={"btn btn__curv"} disabled={disable ? true : false}>
            <span className="headline headline__text headline--white headline--uppercase">
              <b>
                <i>Reset Password</i>
              </b>
            </span>
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPasswordActionPage
