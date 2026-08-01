'use client'

import React from "react"
import Link from "next/link"
import Image from "next/image"
import Newsletter from "@components/newsletter"

const SiteBanner = () => {
  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            Hi, I'm Taimoor Sattar
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Full-stack engineer & educator building modern web applications.
          </p>
          <Newsletter />
        </div>
        <div className="w-48 h-48 relative rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-800">
          <Image
            src="/profile-pic.jpg"
            alt="Taimoor Sattar"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
    </section>
  )
}

export default SiteBanner
