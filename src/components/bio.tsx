import React from "react"
import Image from "next/image"

const Bio = () => {
  return (
    <div className="flex items-center gap-4 py-4">
      <Image
        className="w-16 h-16 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
        alt="Taimoor Sattar"
        src="/static/img/profile-pic.jpg"
        width={64}
        height={64}
        unoptimized
      />
      <div>
        <p className="font-bold text-zinc-900 dark:text-zinc-100">Taimoor Sattar</p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Full-stack developer and course author.
        </p>
      </div>
    </div>
  )
}

export default Bio
