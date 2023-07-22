import React from "react"
import IMG_6457 from "../../images/photos/IMG_6457.jpg"

const Avatar = (props: any) => {
  let size = props?.size || "small" // large, medium, small
  let className = props?.className || ""
  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      <img
        className={`
        relative rounded-[50%]  object-cover
        ${size == "large" ? "w-[3.5rem] h-[3.5rem]" : ""}
        ${size == "medium" ? "w-[2.5rem] h-[2.5rem]" : ""}
        ${size == "small" ? "w-[1.5rem] h-[1.5rem]" : ""}
        `}
        alt=""
        src={IMG_6457}
      />

      <div
        className={`
      relative
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
