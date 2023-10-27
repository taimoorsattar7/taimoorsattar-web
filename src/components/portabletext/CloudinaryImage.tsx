"use client"

import React from "react"

export const CloudinaryImage = (props: any) => {
  return (
    <figure>
      <a href={props?.value?.secure_url} target="_blank">
        <img src={props?.value?.secure_url} alt="image" loading="lazy" />
      </a>
    </figure>
  )
}
