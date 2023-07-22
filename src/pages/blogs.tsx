import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "@components/seo"
// import { GatsbyImage } from "gatsby-plugin-image"
import BlogList from "@components/blog-list/index"
import Container from "@atom/container/index"

// Container

import Layout from "@components/layout"

const Blogs = ({ data, location }: any) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <SEO
        location={location}
        title={"Blogs about web programming - Taimoor Sattar"}
        description={
          "You can find blogs related to web programming such as HTML, CSS, Javascript, React Gatsbyjs, etc"
        }
      />
      <Container>
        <BlogList posts={posts}>
          <header className="mb-6">
            <h2 className="text-5xl mb-1 text-center sm:text-left">
              <b>Feature Blogs</b>
            </h2>

            <p className="text-neutral-600 block text-base mb-1 text-center sm:text-left">
              You can find blogs related to web programming such as HTML, CSS,
              Javascript, React Gatsbyjs, etc
            </p>
          </header>
        </BlogList>
      </Container>
    </Layout>
  )
}

export default Blogs

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/blogs/" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          featuredpost
          featuredimage {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        excerpt
        internal {
          content
        }
        fields {
          slug
        }
        id
      }
    }
  }
`
