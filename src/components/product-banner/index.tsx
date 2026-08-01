"use client"

import * as React from "react"
import Button from "@atom/button/index"
import Link from "next/link"

const ProductBanner: any = (props: any) => {
  let title = props.title,
    text = props.text,
    logSlug = props.logSlug || "/modules/build-a-standout-website",
    isLog = props.isLog,
    onEventLog = props.onEventLog

  return (
    <section typeof="Course" className="w-full py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 p-8 sm:p-12 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold uppercase tracking-wider">
            Course Overview
          </div>

          <h1
            title={title}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight max-w-3xl"
          >
            {title}
          </h1>

          <div className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl">
            {text}
          </div>

          <div className="pt-2 flex justify-start">
            {isLog ? (
              <Link className="no-underline" href={logSlug}>
                <Button
                  textValue="Go to the course"
                  iconRight="arrowuprightsquare"
                  btnSize="large"
                  btnTheme="filled"
                />
              </Link>
            ) : (
              <Button
                id="form-modal-select-2"
                textValue="Enroll in the course"
                iconRight="sparkle"
                btnSize="large"
                btnTheme="indigo"
                onClickHandler={(event: any) => onEventLog?.(event)}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductBanner
