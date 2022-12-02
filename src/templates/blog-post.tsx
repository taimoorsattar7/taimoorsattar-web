import React from "react"
import { graphql } from "gatsby"

import BlogPage from "@components/blog/BlogPage"

import Layout from "@components/layout"
import SEO from "@components/seo"

// data
// location
// navigate
// pageContext
// pageResources
// params
// path
// serverData
// uri

const BlogPostTemplate = ({ data, location }: any) => {
  const post = data.markdownRemark
  let featureImg = post.frontmatter?.featuredimage

  return (
    <Layout location={location}>
      <SEO
        title={post?.frontmatter?.title}
        description={post?.frontmatter?.exerpt || post?.excerpt}
        location={location}
        image={
          featureImg?.publicURL
            ? `https://taimoorsattar.com${featureImg?.publicURL}`
            : ""
        }
        schemaType={"blog"}
      />

      <BlogPage data={data} />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allSanityProduct(filter: { slug: { current: { ne: null } } }) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          seo {
            image {
              asset {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        featuredimage {
          publicURL
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
