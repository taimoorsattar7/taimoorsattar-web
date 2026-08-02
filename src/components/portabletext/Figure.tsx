import React from "react"
import { imageUrlFor } from "../../lib/image-url"

export const Figure = ({ value }: any) => {
  if (!value || !value.asset) {
    return null
  }
  let imgUrl = value.asset.url || ""
  if (!imgUrl) {
    try {
      imgUrl = imageUrlFor(value).url()
    } catch (e) {
      imgUrl = ""
    }
  }
  return (
    <figure className="my-6">
      {imgUrl && (
        <a href={imgUrl} target="_blank" rel="noopener noreferrer">
          <img
            className="w-full h-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-md"
            src={imgUrl}
            alt={value.alt || "Figure"}
          />
        </a>
      )}
      {value.caption && (
        <figcaption className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}
