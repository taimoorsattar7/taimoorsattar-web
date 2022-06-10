import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { navigate } from "gatsby"
import { useForm } from "react-hook-form"

import { handleLogin, isLoggedIn } from "@utils/auth.ts"
import Layout from "@components/layout"
import SEO from "@components/seo"

const Auth = ({ location }: any) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm()

  const [disable, setDisable] = useState<Boolean>(false)

  async function onSubmit(data: { email: string; password: string }) {
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
          <h1 className="mb-8 text-5xl text-center">
            <b>Login</b>
          </h1>
          <p className="text-lg text-center">
            Enter your email and password to continue to dashboad.
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
              Password
            </label>

            <input
              {...register("password", { required: true })}
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
                <i>Login →</i>
              </b>
            </span>
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default Auth
