"use client"

import React from "react"
import Link from "next/link"

const CTA = ({ keyword, pitch, goto }: any) => {
  return (
    <div
      id="dropdown-cta"
      className="p-4 mt-6 rounded-lg bg-blue-50 dark:bg-blue-900"
      role="alert"
    >
      <div className="flex items-center mb-3">
        <span className="bg-orange-100 text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">
          {keyword}
        </span>
      </div>
      <p className="mb-3 text-sm text-blue-800 dark:text-blue-400">{pitch}</p>

      <Link
        className="text-sm text-blue-800 underline font-medium hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
        href={goto || "/"}
      >
        Click to Learn More →
      </Link>
    </div>
  )
}

export default CTA
