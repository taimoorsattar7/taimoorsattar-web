import React from "react"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const SEO = ({
  description,
  title,
  image,
}: any) => {
  let buildMeta = useSiteMetadata()
  const defaultTitle = title || buildMeta?.title
  const metaDescription = description || buildMeta?.description
  const metaImage = image || `${buildMeta?.siteUrl}/banner.jpg`

  return (
    <>
      <title>{defaultTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
    </>
  )
}

export default SEO
