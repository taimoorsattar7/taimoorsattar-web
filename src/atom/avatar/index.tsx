"use client"

import React from "react"
import { StaticImage } from "gatsby-plugin-image"

const Avatar = (props: any) => {
  let size = props?.size || "small" // large, medium, small
  let className = props?.className || ""
  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <StaticImage
        src="../../images/photos/IMG_6457.jpg"
        className={`
        relative rounded-[50%]  object-cover
        ${size == "large" ? "w-[3.5rem] h-[3.5rem]" : ""}
        ${size == "medium" ? "w-[2.5rem] h-[2.5rem]" : ""}
        ${size == "small" ? "w-[1.5rem] h-[1.5rem]" : ""}
        `}
        alt="Avatar"
        placeholder="blurred"
        layout="fixed"
      />

      <div
        className={`
      relative text-neutral-800
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
