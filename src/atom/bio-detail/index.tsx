import React from "react"
import Image from "next/image"

const BioDetail = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <Image
        src="/static/img/profile-pic.jpg"
        className="w-24 h-24 flex-shrink-0 object-cover border-2 rounded-full border-zinc-200 dark:border-zinc-800"
        alt="Taimoor Sattar"
        width={96}
        height={96}
        unoptimized
      />
      <div className="flex-1">
        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Taimoor Sattar</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Full-stack developer and course author building clean, reliable web applications.
        </p>
      </div>
    </div>
  )
}

export default BioDetail
