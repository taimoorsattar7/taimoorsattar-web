"use client"

import React from "react"
import Image from "next/image"

const Avatar = (props: any) => {
  let size = props?.size || "small" // large, medium, small
  let className = props?.className || ""
  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <Image
        src="/profile-pic.jpg"
        className={`
        relative rounded-[50%] object-cover
        ${size == "large" ? "w-[3.5rem] h-[3.5rem]" : ""}
        ${size == "medium" ? "w-[2.5rem] h-[2.5rem]" : ""}
        ${size == "small" ? "w-[1.5rem] h-[1.5rem]" : ""}
        `}
        alt="Taimoor Sattar avatar"
        width={50}
        height={50}
        priority
        unoptimized
      />

      <div
        className={`
      relative text-neutral-800 dark:text-neutral-200
      ${size == "large" ? "text-xl" : ""}
      ${size == "medium" ? "text-lg" : ""}
      ${size == "small" ? "text-base" : ""}
      `}
      >
        Taimoor Sattar
      </div>
    </div>
  )
}

export default Avatar
