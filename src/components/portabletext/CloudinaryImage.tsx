import React from "react"

export const CloudinaryImage = (props: any) => {
  return (
    <figure>
      <a href={props?.node?.secure_url} target="_blank">
        <img src={props?.node?.secure_url} alt="image" loading="lazy" />
      </a>
    </figure>
  )
}
