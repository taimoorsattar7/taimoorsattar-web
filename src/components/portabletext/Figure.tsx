import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
// @ts-ignore
import clientConfig from "../../../client-config"

export const Figure = ({ value }: any) => {
  if (!value || !value.asset || !value.asset._id) {
    return null
  }
  const gatsbyImageData = getGatsbyImageData(
    value,
    { maxWidth: "100%" },
    clientConfig.sanity
  )
  return (
    <figure>
      <a href={gatsbyImageData?.images?.fallback?.src} target="_blank">
        <GatsbyImage
          className="fullwidth"
          image={gatsbyImageData}
          alt={value.alt}
        />
      </a>
      <figcaption style={{ color: "gray", fontSize: "1rem" }}>
        {value.caption}
      </figcaption>
    </figure>
  )
}
