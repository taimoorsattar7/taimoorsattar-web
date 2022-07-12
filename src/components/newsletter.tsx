import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

import { useForm } from "react-hook-form"
import axios from "axios"

const Newsletter = () => {
  const [disable, setDisable] = useState(false)

  const {
    register,
    handleSubmit,
    // watch,
    reset,
    // formState: { errors },
  } = useForm()

  async function onSubmit(data: { email: any }) {
    try {
      setDisable(true)

      let subscribe: any = await axios.post(`/api/newsletter`, {
        name: String(data.email),
        email: String(data.email),
      })

      if (subscribe?.data?.message === "success") {
        // Send newsletter email

        try {
          await axios.post(`/api/sendEmailTemplate`, {
            templateId: "d-54b17ee89da14c539f8a535c77ce4256",
            subject: "Newsletter subscription - Taimoor Sattar",
            email: data.email,
          })
        } catch (error) {}

        toast.success("Congrats! you're in the list.")
        reset({ email: "" })
      } else {
        toast.error("Something went wrong!.")
      }

      setDisable(false)
    } catch (e) {
      toast.error("Failed!.")
      setDisable(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" />

      <form className="field" onSubmit={handleSubmit(onSubmit)}>
        <div className="field--gap">
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
          onClick={() => {
            handleSubmit(onSubmit)
          }}
          disabled={disable === true ? true : false}
        >
          <span className="headline headline__text headline--white headline--uppercase">
            <b>
              <i>Subscribe to Newsletter →</i>
            </b>
          </span>
        </button>
      </form>
    </>
  )
}

export default Newsletter
