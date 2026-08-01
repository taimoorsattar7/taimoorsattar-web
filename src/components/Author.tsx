"use client"

import React from "react"

export function Author({ description }: any) {
  return (
    <section
      id="author"
      aria-labelledby="author-title"
      className="relative scroll-mt-14 py-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 sm:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            About the Instructor
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
            Taimoor Sattar
          </h2>
          <div className="text-base text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {description}
          </div>
        </div>
      </div>
    </section>
  )
}
