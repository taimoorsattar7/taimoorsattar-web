'use client'

import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useForm } from "react-hook-form"
import InputField from "@molecule/input-field/index"

export default function Contact() {
  const {
    register,
    handleSubmit,
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
        toast.success("Message sent successfully!")
        reset()
      } else {
        toast.error("Failed to send message. Please try again.")
      }
      setDisable(false)
    } catch (error) {
      toast.error("An error occurred. Please email taimoor@taimoorsattar.dev directly.")
      setDisable(false)
    }
  }

  return (
    <section className="max-w-2xl mx-auto py-6">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="mb-8 text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
          Get in Touch
        </h1>

        <p className="text-slate-600 dark:text-slate-300 text-base font-normal leading-relaxed">
          Have a project proposal, question, or idea? Send me a message below or email me directly at{" "}
          <a 
            href="mailto:taimoor@taimoorsattar.dev" 
            className="font-medium text-slate-900 dark:text-slate-100 underline underline-offset-4 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            taimoor@taimoorsattar.dev
          </a>.
        </p>
      </header>

      {/* Form Container */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <form
          className="space-y-4"
          name="contact"
          onSubmit={handleSubmit((e: any) => onSubmit(e))}
        >
          <InputField
            labelText="Subject"
            register={register}
            id="subject"
            required={true}
            status={errors?.subject ? "error" : "normal"}
            type="text"
            placeholder="e.g. Project Inquiry"
          />

          <InputField
            labelText="Email Address"
            register={register}
            id="email"
            required={true}
            status={errors?.email ? "error" : "normal"}
            type="email"
            placeholder="yourname@example.com"
          />

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("message", { required: true })}
              rows={5}
              name="message"
              id="message"
              placeholder="Your message here..."
              className="block w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/80 px-4 py-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm font-medium transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={disable}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg text-sm font-medium text-white dark:text-slate-900 bg-slate-900 dark:bg-slate-100 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {disable ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
