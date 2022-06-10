import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getGatsbyImageData } from "gatsby-source-sanity"
import clientConfig from "../../../client-config"

export const Figure = ({ node }: any) => {
  if (!node || !node.asset || !node.asset._id) {
    return null
  }
  const gatsbyImageData = getGatsbyImageData(
    node,
    { maxWidth: "100%" },
    clientConfig.sanity
  )
  return (
    <figure>
      <a href={gatsbyImageData?.images?.fallback?.src} target="_blank">
        <GatsbyImage
          className="fullwidth"
          image={gatsbyImageData}
          alt={node.alt}
        />
      </a>
      <figcaption style={{ color: "gray", fontSize: "1rem" }}>
        {node.caption}
      </figcaption>
    </figure>
  )
}
