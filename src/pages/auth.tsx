import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { navigate, Link } from "gatsby"
import { useForm } from "react-hook-form"

import { handleLogin, isLoggedIn } from "@utils/auth"
import Layout from "@components/layout"
import SEO from "@components/seo"
import Button from "@atom/button/index"

import InputField from "@molecule/input-field/index"

const AuthPage = ({ location }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [disable, setDisable] = useState<Boolean>(false)

  // : { email: string; password: string }
  async function onSubmit(data: any) {
    setDisable(true)
    try {
      let auth = await handleLogin({
        email: data.email,
        password: data.password,
      })

      if (auth) {
        toast.success("Welcome 🎉")
        navigate("/modules/")
      } else {
        toast.success("Wrong entry.", {
          icon: "⚠️",
        })
      }

      setDisable(false)
    } catch (e) {
      console.log(e)
      setDisable(false)
      toast.error("Something went wrong.")
    }
  }

  useEffect(() => {
    if (isLoggedIn()) {
      // logout()
      navigate("/modules")
    }
  }, [])

  return (
    <Layout location={location}>
      <SEO title="Login" location={location} />

      <Toaster position="top-center" />

      <div className="wrapper wrapper--small m-b-25">
        <div className="m-t-10 m-b-10">
          {/* <img
            loading="lazy"
            className="block m-auto text-center m-t-10 m-b-10"
            width={60}
            src={"/img/locked_secure_icon.png"}
            alt="Logo"
          /> */}
          <h1 className="text-3xl mb-4">
            <b>LOGIN</b>
          </h1>
          <p className="text-base">
            Enter your email and password to continue to dashboad.
          </p>
        </div>

        <form className="field" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            register={register}
            aria-invalid={errors.email ? "true" : "false"}
            id="email"
            labelText="Type your Email"
            message={
              errors?.email?.message ? String(errors?.email?.message) : ""
            }
            status="normal"
            // className=""
            type="email"
            placeholder="yours@email.com"
            autoComplete="on"
            required={true}
          />

          <InputField
            register={register}
            aria-invalid={errors.password ? "true" : "false"}
            id="password"
            labelText="Password"
            message={
              errors?.password?.message ? String(errors?.password?.message) : ""
            }
            status="normal"
            // className=""
            type="password"
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
            autoComplete="on"
            required={true}
          />

          <div className="flex gap-6 flex-wrap mb-4">
            <Link className="text-base cursor-pointer" to="/change-password/">
              Change Password
            </Link>

            <Link className="text-base cursor-pointer" to="/forgot-password/">
              Forgot Password
            </Link>
          </div>

          <Button
            disabled={disable ? true : false}
            type={"submit"}
            textValue="Login to the dashboard"
            iconRight="sparkle"
            // className="mx-auto"
            btnSize="med"
            btnTheme="indigo"
          />
        </form>
      </div>
    </Layout>
  )
}

export default AuthPage
