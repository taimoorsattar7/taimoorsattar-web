import React from "react"
import { graphql } from "gatsby"

import BlogPage from "@components/blog/BlogPage"

import Layout from "@components/layout"
import SEO from "@components/seo"

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
            ? `https://taimoorsattar.dev${featureImg?.publicURL}`
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
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        gatsbyImageData
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
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
