'use client'

import React, { useState, useEffect } from "react"
import Link from "next/link"

export default function Concent({ timer }: any) {
  const [display, setDisplay] = useState(false)

  const closeOnEscapeKeyDown = (e: { charCode: any; keyCode: any }) => {
    if ((e.charCode || e.keyCode) === 27) {
      setDisplay(false)
    }
  }

  useEffect(() => {
    const clrtime = setTimeout(() => {
      setDisplay(true)
    }, timer || 0)

    document.body.addEventListener("keydown", closeOnEscapeKeyDown)

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown)
      clearTimeout(clrtime)
    }
  }, [timer])

  if (!display) {
    return <></>
  }

  return (
    <div className="fixed left-0 bottom-0 z-40">
      <div className="fixed sm:left-4 bottom-20 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl w-full sm:w-1/2 xl:w-1/4 max-w-[450px] overflow-hidden">
        <div>
          <button
            onClick={() => setDisplay(false)}
            type="button"
            className="bg-transparent rounded-md p-2 inline-flex items-center justify-center text-zinc-400 hover:text-zinc-500 focus:outline-none"
          >
            <span className="sr-only">Close menu</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative overflow-hidden px-8 pt-4 pb-6">
            <div className="text-xl font-bold text-zinc-900 dark:text-zinc-100 pb-2">
              Learn Modern Full-Stack Development
            </div>
            <div className="pb-4 text-sm text-zinc-600 dark:text-zinc-400">
              Build modern static and dynamic web applications using React, Next.js, Sanity, and Stripe.
            </div>

            <div>
              <Link href="/p/build-standout-website" className="text-teal-600 dark:text-teal-400 font-semibold text-sm">
                Go to the course &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
