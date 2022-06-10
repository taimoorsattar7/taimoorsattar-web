import React from "react"
import { graphql } from "gatsby"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "@components/layout"
import PortableText from "@components/portabletext/portableText"
// import SEO from "@components/seo"

const Post = ({
  //   serverData,
  location,
  //   pageContext,
  data: { sanityPost },
}: // params,
any) => {
  const featureImg = sanityPost.mainImage?.asset?.gatsbyImageData
  return (
    <Layout
      location={location}
      // title={data.site.siteMetadata?.title || `Title`}
    >
      {/* <SEO
        title={sanityPost.title}
        location={location}
        image={
          featureImg?.publicURL
            ? `${location?.origin}/${featureImg?.publicURL}`
            : ""
        }
        schemaType={"blog"}
      /> */}

      <div className="p-b-30">
        <div className="wrapper wrapper--narrow">
          <div className="m-t-25 m-b-25">
            <h1 className="headline m-b-20">
              <b>{sanityPost.title}</b>
            </h1>

            {featureImg && (
              <GatsbyImage
                className="w-full h-auto mb-5"
                image={getImage(featureImg)}
                alt={"heading"}
              />
            )}

            <div className="prose prose-xl max-w-max">
              {sanityPost._rawBody && (
                <PortableText blocks={sanityPost._rawBody} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    sanityPost(id: { eq: $id }) {
      slug {
        current
      }
      title
      _rawBody
      mainImage {
        asset {
          gatsbyImageData
        }
      }
    }
  }
`

export default Post
