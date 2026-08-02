"use client"

import React, { useState, useEffect } from "react"
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useForm } from "react-hook-form"
import PortableText from "@components/portabletext/portableText"
import InputField from "@molecule/input-field/index"
import { CheckCircle2, Lock, ArrowRight, Sparkles, CreditCard, ShieldCheck } from "lucide-react"
// @ts-ignore
import { cVerifyToken } from "@utils/auth.ts"

const Form = ({ productPrice, location, onModalState }: any) => {
  const plans = productPrice?.plans || []

  // Helper to resolve Live vs Test Stripe Price ID according to active environment secret key
  const getPlanStripePriceId = (p: any) => {
    if (!p) return null
    const isLiveKey =
      (process.env.GATSBY_STRIPE_secret_ID || process.env.STRIPE_SECRET_KEY || "").startsWith("sk_live") &&
      !process.env.STRIPE_TEST_SECRET_KEY
    return isLiveKey
      ? p.priceID || p.priceID_test || null
      : p.priceID_test || p.priceID || null
  }

  // Find default plan with Stripe price ID
  const defaultPlan = plans.find((p: any) => getPlanStripePriceId(p)) || plans[0]
  const defaultPriceId = getPlanStripePriceId(defaultPlan) || "free"

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: defaultPriceId,
      name: "",
      email: "",
    },
  })

  const [disable, setDisable] = useState(false)
  const selectedPriceId = watch("price")
  const isStripePlanSelected = selectedPriceId && selectedPriceId !== "free" && selectedPriceId !== "0"

  const redirectCKout = async (data: {
    price_ID: string
    email: string
    name: string
    priceRef: string
  }) => {
    const origin = typeof window !== "undefined" ? window.location.origin : ""
    const hrefURL = `${origin}/p/build-standout-website`

    try {
      const {
        data: { url },
      } = await axios.post("/api/checkout", {
        email: data.email,
        name: data.name,
        mode: "subscription",
        priceId: data.price_ID,
        metadata: {
          priceId: data.price_ID,
          priceRef: data.priceRef,
        },
        allow_promotion_codes: true,
        cancelUrl: `${hrefURL}?state=fail`,
        successUrl: `${origin}/api/createSubscription?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&priceId=${data.price_ID}&priceRef=${data.priceRef}&redirectOrigin=${encodeURIComponent(hrefURL)}`,
      })

      if (url) {
        window.location.href = url
      } else {
        toast.error("Failed to generate Stripe checkout session.")
        setDisable(false)
      }
    } catch (error: any) {
      console.error("Stripe Checkout Error:", error?.response?.data || error?.message)
      toast.error(error?.response?.data?.message || "Stripe checkout session failed.")
      setDisable(false)
    }
  }

  async function onSubmit(data: any): Promise<void> {
    setDisable(true)

    try {
      const selectedPlan =
        plans.find(
          (p: any) =>
            getPlanStripePriceId(p) === data.price ||
            p.priceID === data.price ||
            p.priceID_test === data.price
        ) || plans.find((p: any) => getPlanStripePriceId(p)) || plans[0]

      const stripePriceId =
        getPlanStripePriceId(selectedPlan) || (data.price !== "free" && data.price !== "0" ? data.price : null)

      if (stripePriceId) {
        // Redirect to Stripe Payment Link / Checkout
        await redirectCKout({
          price_ID: stripePriceId,
          email: data.email,
          name: data.name,
          priceRef: productPrice?._id || "",
        })
      } else {
        // Free Access Flow: create subscription and auto-login user
        try {
          const res = await axios.post(`/api/createSubscription`, {
            email: data.email,
            name: data.name,
            priceId: "free",
            priceRef: productPrice?._id || "",
          })

          if (res.data?.token) {
            await cVerifyToken(res.data.token)
          }
        } catch (e) {
          try {
            await axios.post(`/api/newsletter`, {
              name: String(data.name),
              email: String(data.email),
            })
          } catch (err) {}
        }

        onModalState("success")
        toast.success("Successfully Subscribed & Logged In!")
      }
    } catch (e) {
      setDisable(false)
      toast.error("Something went wrong.")
    }
  }

  return (
    <div className="space-y-6 text-left">
      <Toaster position="top-center" />

      <div className="space-y-1 text-left">
        <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Enroll in the Course
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Enter your details and select your plan to unlock full access.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <InputField
          register={register}
          aria-invalid={errors.name ? "true" : "false"}
          id="name"
          labelText="Your Full Name"
          message={errors?.name ? "Please enter your name" : ""}
          status={errors?.name ? "error" : "normal"}
          type="text"
          placeholder="Taimoor Sattar"
          options={{ required: true, maxLength: 50 }}
          required={true}
        />

        <InputField
          register={register}
          aria-invalid={errors.email ? "true" : "false"}
          id="email"
          labelText="Your Email Address"
          message={errors?.email ? "Please enter a valid email" : ""}
          status={errors?.email ? "error" : "normal"}
          type="email"
          placeholder="yours@email.com"
          options={{ required: true }}
          required={true}
        />

        {/* Plan Selection Radios */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Select Course Tier
          </label>

          <div className="space-y-2.5">
            {plans.map((prc: any, index: number) => {
              const stripePriceId = getPlanStripePriceId(prc)
              const isFreePlan = !stripePriceId && Number(prc.price) === 0
              const planPriceId = stripePriceId || (isFreePlan ? "free" : `plan-${index}`)
              const isSelected = selectedPriceId === planPriceId

              return (
                <label
                  key={index}
                  htmlFor={`plan-${index}`}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? "border-teal-500 bg-teal-500/10 dark:bg-teal-950/30 ring-2 ring-teal-500/30"
                      : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                  }`}
                >
                  <input
                    id={`plan-${index}`}
                    {...register("price")}
                    value={planPriceId}
                    type="radio"
                    className="mt-1 text-teal-600 focus:ring-teal-500"
                  />

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-zinc-900 dark:text-zinc-100">
                        {prc.keyword || (isFreePlan ? "Basic (Free)" : "Premium")}
                      </span>
                      <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                        {isFreePlan ? "Free" : prc.price ? `$${prc.price}/mo` : "Premium"}
                      </span>
                    </div>

                    {prc.description || prc._rawDescription ? (
                      <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {Array.isArray(prc.description || prc._rawDescription) ? (
                          <PortableText blocks={prc.description || prc._rawDescription} />
                        ) : (
                          <p>{String(prc.description || prc._rawDescription)}</p>
                        )}
                      </div>
                    ) : null}
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={disable}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-extrabold text-sm shadow-xl hover:opacity-95 disabled:opacity-50 transition-all mt-4"
        >
          {disable ? (
            "Connecting..."
          ) : isStripePlanSelected ? (
            <>
              <CreditCard className="w-4 h-4" /> Proceed to Stripe Checkout <ArrowRight className="w-4 h-4" />
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" /> Enroll in Free Access <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-teal-500" /> 256-Bit SSL Encrypted & Secured by Stripe
        </div>
      </form>
    </div>
  )
}

export default Form
