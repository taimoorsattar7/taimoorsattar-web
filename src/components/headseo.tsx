import React from "react"
import PropTypes from "prop-types"

// @ts-ignore
import { useSiteMetadata } from "../hooks/use-site-metadata.tsx"

const HeadSEO = ({
  location,
  description,
  title,
  image,

  date,
  schemaType,
}: any) => {
  let buildMeta = useSiteMetadata()

  const metaCanonical = location?.href || buildMeta?.siteUrl

  const metaOrigin = location?.origin || buildMeta?.siteUrl
  const defaultTitle = title || buildMeta?.title
  const metaDescription = description || buildMeta?.description
  const metaImage = image ? image : `${metaOrigin}/banner.jpg`

  const main_schema = {
    "@context": "http://schema.org",
    "@type": "Person",
    gender: "http://schema.org/Male",
    name: "Taimoor Sattar",
    image: image ? image : "",
    url: metaOrigin,
    sameAs: [
      "https://www.linkedin.com/in/taimoorsattar",
      "https://twitter.com/taimoorsattar7",
    ],
  }

  const blog_schema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": metaCanonical
  },
  "headline": defaultTitle,
  "description": metaDescription,
  "image": metaImage,  
  thumbnailUrl: metaImage,
  "author": {
    "@type": "Person",
    "name": "Taimoor Sattar",
    "url": "https://taimoorsattar.com"
  },
  "datePublished": "2023-07-18",
  "dateModified": "2023-07-28"
}


  // const blog_schema = {
  //   "@context": "http://schema.org",
  //   "@type": "BlogPosting",
  //   headline: defaultTitle,
  //   description: metaDescription,
  //   thumbnailUrl: metaImage,
  //   datePublished: date,
  //   dateModified: date,
  //   image: metaImage,
  //   publisher: [
  //     {
  //       "@type": "Person",
  //       name: "Taimoor Sattar",
  //     },
  //   ],
  //   mainEntityOfPage: metaCanonical,
  // }

  const book_schema = {
    "@context": "http://schema.org/",
    "@id": metaCanonical,
    "@type": "Book",
    name: defaultTitle,
    bookFormat: { "@id": "http://schema.org/EBook" },
  }

  return (
    <>
      <meta name="yandex-verification" content="42cde140c0068db5" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Titles */}
      <title>{defaultTitle}</title>
      <meta name="title" content={`${defaultTitle} | Taimoor Sattar`}></meta>
      <meta property="og:title" content={defaultTitle} />
      <meta name="twitter:title" content={defaultTitle} />

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
        content={
          schemaType === "blog"
            ? "article"
            : schemaType === "book"
            ? "book"
            : "website"
        }
      />

      <script type="application/ld+json">{JSON.stringify(main_schema)}</script>

      {schemaType === "blog" ? (
        <script type="application/ld+json">
          {JSON.stringify(blog_schema)}
        </script>
      ) : (
        ""
      )}

      {schemaType === "book" ? (
        <script type="application/ld+json">
          {JSON.stringify(book_schema)}
        </script>
      ) : (
        ""
      )}
    </>
  )
}

HeadSEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

HeadSEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  location: PropTypes.any,
  image: PropTypes.string,
  schemaType: PropTypes.string,
}

export default HeadSEO
