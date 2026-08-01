"use client"

import React from "react"
import { CheckIcon } from "@heroicons/react/20/solid"
import PortableText from "@components/portabletext/portableText"

export default function Pricing({ productPrice, setShowModal, setModalState }: any) {
  const plans = productPrice?.plans || []

  return (
    <section className="my-20">
      <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
          Course Access & Pricing
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Select a plan to start learning full-stack web development with Gatsby, Sanity & Stripe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan: any, idx: number) => {
          const isFree = Number(plan.price) === 0
          const descriptionBlocks = plan.description || plan._rawDescription

          return (
            <div
              key={idx}
              className={`rounded-3xl p-8 sm:p-10 border transition-all flex flex-col justify-between ${
                !isFree
                  ? "bg-zinc-900 text-white border-zinc-800 shadow-2xl relative"
                  : "bg-white dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className={`text-xl font-bold ${!isFree ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
                    {plan.keyword || (isFree ? "Free Tier" : "Premium Tier")}
                  </h3>
                  {!isFree && (
                    <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${!isFree ? "text-white" : "text-zinc-900 dark:text-zinc-100"}`}>
                    {isFree ? "$0" : `$${plan.price}`}
                  </span>
                  <span className={`text-sm ${!isFree ? "text-zinc-400" : "text-zinc-500 dark:text-zinc-400"}`}>
                    {isFree ? "/ free preview" : plan.currency || "/ first month"}
                  </span>
                </div>

                {descriptionBlocks && (
                  <div className={`text-sm leading-relaxed ${!isFree ? "text-zinc-300" : "text-zinc-600 dark:text-zinc-400"}`}>
                    {Array.isArray(descriptionBlocks) ? (
                      <PortableText blocks={descriptionBlocks} />
                    ) : (
                      <p>{String(descriptionBlocks)}</p>
                    )}
                  </div>
                )}

                <ul className={`space-y-3 text-sm pt-4 border-t ${!isFree ? "border-zinc-800 text-zinc-300" : "border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"}`}>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-teal-500 shrink-0" />
                    {isFree ? "Access to introductory lessons" : "Full access to all 13 course chapters"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-teal-500 shrink-0" />
                    {isFree ? "Gatsby & Jamstack setup guides" : "Sanity CMS dataset & Stripe Checkout"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-teal-500 shrink-0" />
                    {isFree ? "Self-paced reading material" : "Customer subscription management"}
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(true)
                    setModalState("form")
                  }}
                  className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all shadow-md ${
                    !isFree
                      ? "bg-gradient-to-r from-teal-500 to-emerald-400 text-zinc-950 hover:opacity-95"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {isFree ? "Preview Course" : "Enroll Now"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
