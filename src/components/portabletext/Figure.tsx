import React from "react"
import Image from "next/image"

export const Figure = ({ value }: any) => {
  if (!value || !value.asset) {
    return null
  }
  const imgUrl = value.asset.url || value.asset._ref || ""
  return (
    <figure className="my-6">
      {imgUrl && (
        <a href={imgUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="w-full h-auto rounded-lg"
            src={imgUrl}
            alt={value.alt || "Figure"}
          />
        </a>
      )}
      {value.caption && (
        <figcaption className="text-center text-xs text-zinc-500 mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}
