import React, { useState } from "react"

import toast, { Toaster } from "react-hot-toast"
import { useForm } from "react-hook-form"
import axios from "axios"

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    // formState: { errors },
  } = useForm()

  const [disable, setDisable] = useState(false)

  async function onSubmit(data: { email: any }): Promise<any> {
    try {
      setDisable(true)

      let newsletter: any = await axios.post(`/api/newsletter`, {
        name: "",
        email: data.email,
      })

      let sgemail: any = await axios.post(`/api/sendEmailTemplate`, {
        templateId: "d-54b17ee89da14c539f8a535c77ce4256",
        subject: "Newsletter subscriptions - Taimoor Sattar",
        email: data.email,
      })

      console.log(sgemail, newsletter)

      if (newsletter?.data?.message === "success") {
        toast.success("Congrats! you're in the list.")
        reset({ email: "" })
      } else {
        toast.error("Something went wrong! Please try again.")
      }

      setDisable(false)
    } catch (e) {
      setDisable(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" />
      <form
        action=""
        className="flex flex-col w-full gap-3 sm:flex-row sm:gap-0"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          type="email"
          id="email"
          className="px-3 py-3 border-2 border-gray-300 rounded grow focus:border-emerald-500 focus:outline-none sm:rounded-l-md sm:rounded-r-none sm:border-r-0"
          placeholder="Email Address"
        />
        <button
          type="submit"
          className="px-5 py-4 font-bold text-white rounded bg-emerald-500 sm:rounded-l-none sm:rounded-r-md"
          onClick={() => {
            handleSubmit(onSubmit)
          }}
        >
          Get First Email
        </button>
      </form>
    </>
  )
}

export default Newsletter
