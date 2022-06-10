import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useForm } from "react-hook-form"

import validateEmail from "@lib/validate"

import axios, { AxiosResponse } from "axios"

import "@styles/_field.scss"

const SubscribeForm = (props: any) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [disable, setDisable] = useState(false)

  async function onSubmit(data: { email: any; name: any }) {
    setDisable(true)

    try {
      let response: AxiosResponse<unknown, any> | undefined

      if (validateEmail(data.email)) {
        response = await axios.post(`/.netlify/functions/addUser`, {
          name: data.name,
          email: data.email,
        })
      }

      if (response?.data) {
        localStorage.setItem("subscribe", "true")
        toast.success("You are subscribe to the list")
        // setShowModal(false)
      } else {
        toast.error("Something went wrong")
      }
    } catch (e) {
      console.log(e)
      toast.error("Refresh the page and try Again...")
    }
    setDisable(false)
  }

  return (
    <>
      <Toaster position="top-center" />
      <form className="field" onSubmit={handleSubmit(onSubmit)}>
        <p className="headline headline__text m-b-10">
          Select the plan and fill your name and email in order to proceed for
          payment.
        </p>
        <div className="field--gap">
          <label
            className="headline headline__sml headline--white field__label"
            htmlFor="name"
          >
            Name
          </label>

          <input
            {...register("name")}
            defaultValue={""}
            className="headline headline__text field__input"
            type="text"
            placeholder="Enter your name here..."
            autoComplete="on"
            required
          />
        </div>

        <div className="field--gap">
          <label
            className="headline headline__sml headline--white field__label"
            htmlFor="email"
          >
            Email
          </label>

          <input
            {...register("email")}
            className="headline headline__text field__input"
            type="email"
            placeholder="example@email.com"
            autoComplete="on"
            required
          />
        </div>

        <button
          className={"btn btn__curv"}
          onSubmit={handleSubmit(onSubmit)}
          disabled={disable ? true : false}
        >
          <span className="headline headline__text headline--white headline--uppercase">
            <b>
              <i>Let me in →</i>
            </b>
          </span>
        </button>
      </form>
    </>
  )
}

export default SubscribeForm
