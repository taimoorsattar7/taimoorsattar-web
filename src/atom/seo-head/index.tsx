import React from "react"
import PropTypes from "prop-types"
import removeParams from "@lib/removeParams"
import removeTrailing from "@lib/removeTrailing"

import { useSiteMetadata } from "@hooks/use-site-metadata"

const SEOHead = ({
  location,
  description,
  title,
  image,
  schemaType,
  lang,
  datePublished,
  dateModified,
}: any) => {
  let buildMeta = useSiteMetadata()

  const metaOrigin = buildMeta?.siteUrl

  const metaCanonical = removeTrailing(
    removeParams(
      location?.pathname
        ? `${metaOrigin}${location?.pathname}`
        : buildMeta?.siteUrl
    )
  )

  const defaultTitle = title || buildMeta?.title
  const metaDescription = description || buildMeta?.description
  const metaImage = image ? image : `${metaOrigin}/banner.jpg`

  const main_schema = {
    "@context": "http://schema.org",
    "@type": "Person",
    gender: "http://schema.org/Male",
    name: "Taimoor Sattar",
    image: image ? image : "",
    url: metaCanonical,
    sameAs: [
      "https://www.linkedin.com/in/taimoorsattar",
      "https://twitter.com/taimoorsattar7",
    ],
  }

  let blog_schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": metaCanonical,
    },
    headline: defaultTitle,
    description: metaDescription,
    thumbnailUrl: metaImage,
    image: metaImage,
    author: {
      "@type": "Person",
      name: "Taimoor Sattar",
      url: "https://taimoorsattar.com",
    },
    datePublished: datePublished,
    dateModified: dateModified,
  }

  const course_schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: defaultTitle,
    description: metaDescription,
    author: {
      "@type": "Person",
      name: "Taimoor Sattar",
      url: "https://taimoorsattar.com",
    },
  }

  const book_schema = {
    "@context": "http://schema.org/",
    "@id": metaCanonical,
    "@type": "Book",
    name: defaultTitle,
    bookFormat: { "@id": "http://schema.org/EBook" },
  }

  return (
    <>
      <html lang={lang} />
      <meta name="yandex-verification" content="42cde140c0068db5" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Titles */}
      <title>{defaultTitle}</title>
      <meta name="title" content={`${defaultTitle} | Taimoor Sattar`}></meta>
      <meta property="og:title" content={`${defaultTitle}  | Taimoor Sattar`} />
      <meta
        name="twitter:title"
        content={`${defaultTitle}  | Taimoor Sattar`}
      />

      <meta httpEquiv="Cache-control" content="public" />

      {/* Description */}
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta name="twitter:description" content={metaDescription} />

      {/* Images */}
      <meta name="twitter:image" content={metaImage} />
      <meta property="og:image" content={metaImage} />

      {/* URLs */}
      <link rel="canonical" href={metaCanonical} />
      <meta name="twitter:url" content={metaCanonical} />

      {/* Author */}
      <meta name="twitter:creator" content="@taimoorsattar7" />
      <meta name="author" content="Taimoor Sattar" />

      {/* Open Graph */}
      <meta property="og:url" content={metaCanonical} />
      <meta
        property="og:type"
        content={schemaType === "blog" ? "article" : "website"}
      />

      <script type="application/ld+json">{JSON.stringify(main_schema)}</script>

      {schemaType === "blog" ? (
        <script type="application/ld+json">
          {JSON.stringify(blog_schema)}
        </script>
      ) : (
        <></>
      )}

      {Boolean(schemaType === "course") ? (
        <script type="application/ld+json">
          {JSON.stringify(course_schema)}
        </script>
      ) : (
        <></>
      )}

      {Boolean(schemaType === "book") ? (
        <script type="application/ld+json">
          {JSON.stringify(book_schema)}
        </script>
      ) : (
        <></>
      )}
    </>
  )
}

SEOHead.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEOHead.propTypes = {
  location: PropTypes.any,
  description: PropTypes.string,
  datePublished: PropTypes.string,
  dateModified: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  pathname: PropTypes.string,
  image: PropTypes.string,
  schemaType: PropTypes.string,
}

export default SEOHead
