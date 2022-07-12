import React, { useState } from "react"
import { PageProps } from "gatsby"
import toast, { Toaster } from "react-hot-toast"

// import { navigate } from "gatsby"
import validator from "validator"
import { useForm } from "react-hook-form"
import axios from "axios"

import { querySanity } from "@lib/querySanity"
import Layout from "@components/layout"
import SEO from "@components/seo"

const ForgotPasswordPage: React.FC<PageProps<any>> = ({ location }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const [disable, setDisable] = useState<Boolean>(false)

  async function onSubmit(data: { email: string; password: string }) {
    setDisable(true)
    try {
      if (validator.isEmail(data.email)) {
        let cusData = await querySanity(`
          *[_type=='customer' && email=='${data.email}']
        `)

        if (cusData.length > 0) {
          let token: any = await axios.post(`/api/genToken`, {
            email: data.email,
          })
          if (token?.data?.message == "success") {
            await axios.post(`/api/sendEmailTemplate`, {
              templateId: "d-d8c74b4e84da4a1fb8eb83343e422257",
              subject: "Password Reset - Taimoor Sattar",
              email: data.email,
              metadata: {
                resetPasswordlink: `${location.origin}/forgot-password-action/?emailtoken=${token?.data?.token}`,
              },
            })
            toast.success("Please check your email inbox.")
          }
        } else {
          toast.error("Email not avaliable in the database.")
        }
      } else {
        toast.error("Email is not valid.")
      }

      setDisable(false)
    } catch (e) {
      console.log(e)
      setDisable(false)
      toast.error("Something went wrong.")
    }
  }

  return (
    <Layout location={location}>
      <SEO title="Reset Password Page" location={location} />

      <Toaster position="top-center" />

      <div className="wrapper wrapper--small m-b-25">
        <div className="m-t-10 m-b-10">
          <h1 className="mb-8 text-5xl text-center">
            <b>Forget Password</b>
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
            />
          </div>

          <button className={"btn btn__curv"} disabled={disable ? true : false}>
            <span className="headline headline__text headline--white headline--uppercase">
              <b>
                <i>Send Reset link to inbox</i>
              </b>
            </span>
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPasswordPage
