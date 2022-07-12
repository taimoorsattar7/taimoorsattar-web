import React, { useState } from "react"
import { PageProps } from "gatsby"
import toast, { Toaster } from "react-hot-toast"

// import { navigate } from "gatsby"
import validator from "validator"
import { useForm } from "react-hook-form"
import axios from "axios"

import Layout from "@components/layout"
import SEO from "@components/seo"

const ChangePasswordPage: React.FC<PageProps<any>> = ({ location }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm()

  const [disable, setDisable] = useState<Boolean>(false)

  async function onSubmit(data: {
    email: string
    prvPassword: string
    newPassword: string
  }) {
    setDisable(true)
    try {
      if (validator.isEmail(data.email)) {
        let changePasswordRequest: any = await axios.post(
          `/api/changePassword`,
          {
            email: data.email,
            prvPassword: data.prvPassword,
            newPassword: data.newPassword,
          }
        )

        if (changePasswordRequest.data.is == true) {
          await axios.post(`/api/sendEmailTemplate`, {
            templateId: "d-e7116f065c074f1fa8f082ba66980a56",
            subject: "Password Changed - Taimoor Sattar",
            email: data.email,
          })

          reset({
            prvPassword: "",
            newPassword: "",
          })
          toast.success("Your Password has been changed.")
        }
      } else {
        toast.error("Email is not valid.")
      }

      setDisable(false)
    } catch (e) {
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
            <b>Change Password</b>
          </h1>
          <p className="text-lg text-center">
            Please fill the below form to change your password.
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

          <div className="field--gap">
            <label
              className="headline headline__sml headline--white field__label"
              htmlFor="email"
            >
              Previous Password
            </label>

            <input
              {...register("prvPassword", { required: true })}
              className="headline headline__text field__input"
              type="password"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
              autoComplete="on"
              required
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
                <i>Change Password</i>
              </b>
            </span>
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ChangePasswordPage
