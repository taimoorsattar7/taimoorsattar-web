import React from "react"

import Layout from "@components/layout"
import SEO from "@components/seo"

import ProductPage from "@components/product/ProductPage"

import { graphql } from "gatsby"
import "@styles/_img.scss"
import "@styles/_btn.scss"

const ProductPost = ({ data, location }: any) => {
  // const url = typeof window !== "undefined" ? window.location.href : ""
  const product = data.sanityProduct

  return (
    <Layout location={location}>
      <SEO
        location={location}
        title={product?.seo?.title ?? product.title}
        description={product?.seo?.excerpt}
        image={product?.seo?.image?.asset?.url}
        schemaType={"course"}
      />

      {product && (
        <ProductPage location={location} avatar={data.avatar} {...product} />
      )}
    </Layout>
  )
}

export default ProductPost

export const query = graphql`
  query SanityQery {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData(
          width: 40
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          sizes: "20"
          quality: 100
          height: 40
        )
      }
    }
    sanityProduct {
      id
      tags
      title
      _createdAt
      _rawBody(resolveReferences: { maxDepth: 5 })
      mainvideo {
        asset {
          url
        }
        description
        image {
          asset {
            url
          }
        }
      }
      seo {
        excerpt
        title
        image {
          asset {
            url
          }
        }
      }
      author {
        image {
          asset {
            gatsbyImageData
          }
        }
        _rawDescription
        id
        name
      }
      slug {
        current
      }
      productPrice {
        _id
        plans {
          _key
          source
          priceID
          priceID_test
          price
          keyword
          currency
          _rawDescription
        }
        content {
          _id
          slug {
            current
          }
        }
        id
      }
      _rawShort
      category
      bookImage {
        asset {
          gatsbyImageData(width: 350)
          url
        }
      }
      testimonials {
        name
        profession
        source
        _rawMessage
      }
      techs {
        _rawLogo
        name
        logo {
          asset {
            gatsbyImageData(width: 150)
            title
            url
          }
        }
      }
      bgimage {
        asset {
          gatsbyImageData
        }
      }
      faqs {
        _rawAnswer
        question
      }
      curriculum {
        _rawBody
        title
      }
    }
  }
`
