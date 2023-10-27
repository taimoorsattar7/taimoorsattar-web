import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"

import { useForm } from "react-hook-form"
import InputField from "@molecule/input-field/index"

export default function Contact() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm()
  const [disable, setDisable] = useState(false)

  const onSubmit = async (fdata: any) => {
    setDisable(true)

    try {
      const { data } = await axios.post("/api/sendEmail", {
        subject: fdata?.subject,
        message: `
          <p>From Email: ${fdata?.email}</p>
          <p>${fdata?.message}</p>
        `,
      })

      if (data?.emailSend) {
        toast.success("Email sent 🎉")
        reset()
      }
      setDisable(false)
    } catch (error) {
      setDisable(false)
    }
  }

  return (
    <section>
      <header>
        <h1 className="mb-4 font-heading font-semibold text-gray-900 text-6xl sm:text-7xl">
          <b>Contact Form</b>
        </h1>
        <div className="text-lg text-gray-500">
          <p>Fill in this form to send me a message or send email at</p>
          <a href="mailto:taimoor@taimoorsattar.dev">
            taimoor@taimoorsattar.dev
          </a>
          .
        </div>
      </header>
      <Toaster position="top-center" />
      <form
        className="pt-8 mb-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
        name="contact"
        onSubmit={handleSubmit((e: any) => onSubmit(e))}
      >
        <InputField
          labelText={"Subject"}
          register={register}
          id="subject"
          message={""}
          status={"normal"}
          type={"text"}
          placeholder={"Your Subject"}
        />

        <InputField
          labelText={"Email Address"}
          register={register}
          id="email"
          message={""}
          status={"normal"}
          type={"email"}
          placeholder={"you@email.com"}
        />

        <div className="mb-6">
          <label htmlFor="message" className="block mb-2 text-sm text-gray-600">
            Your Message
          </label>
          <textarea
            type="text"
            {...register("message")}
            rows="5"
            name="message"
            id="message"
            placeholder="Your Message"
            className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
          ></textarea>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            className="relative flex justify-center px-6 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md cursor-pointer group max-w-fit hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:shadow-none disabled:pointer-events-none"
            disabled={disable ? true : false}
          >
            Send Message
          </button>
        </div>
      </form>
    </section>
  )
}
