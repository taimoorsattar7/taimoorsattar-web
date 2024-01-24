import React from "react"
import { graphql } from "gatsby"

import BlogPage from "@components/blog/BlogPage"
import SEOHead from "@atom/seo-head/index"

import { Container } from "@components/Container"

import Layout from "@components/layout"
import ShareSocial from "@atom/share-social/index"
import Divider from "@atom/divider/index"

const BlogPostTemplate = ({ data, location }: any) => {
  return (
    <Layout location={location}>
      <Container className="mt-12 lg:mt-16">
        <BlogPage data={data} />

        <div className="mt-8 mb-8">
          <Divider />
        </div>
        <div className="prose prose-lg max-w-fit">
          <p>Thanks for reading the post.</p>
          <p>
            If you want to learn how to build a full-stack subscription website,
            please check out{" "}
            <a href="https://taimoorsattar.com/p/build-standout-website">
              my course
            </a>
            .
          </p>
          <p>
            If you find this post useful, please share it on your social
            platform to reach out to more people.
          </p>
        </div>

        <ShareSocial
          data={[
            {
              url: location?.href,
              name: "facebook",
              title: data?.markdownRemark?.frontmatter?.title,
            },
            {
              url: location?.href,
              name: "twitter",
              title: data?.markdownRemark?.frontmatter?.title,
            },
            {
              url: location?.href,
              name: "linkedin",
              title: data?.markdownRemark?.frontmatter?.title,
            },
          ]}
        />
      </Container>
    </Layout>
  )
}

export default BlogPostTemplate

export const Head = ({
  location,
  // params,
  data,
}: // pageContext
any) => (
  <SEOHead
    title={data?.markdownRemark?.frontmatter?.title}
    description={
      data?.markdownRemark?.frontmatter?.exerpt || data?.markdownRemark?.excerpt
    }
    location={location}
    image={
      data?.markdownRemark?.frontmatter?.featuredimage?.publicURL
        ? `https://taimoorsattar.com${data?.markdownRemark?.frontmatter?.featuredimage?.publicURL}`
        : ""
    }
    schemaType={"blog"}
    datePublished={data?.markdownRemark?.frontmatter?.date}
    dateModified={
      data?.markdownRemark?.frontmatter?.dateModified
        ? data?.markdownRemark?.frontmatter?.dateModified
        : data?.markdownRemark?.frontmatter?.date
    }
  />
)

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
        date(formatString: "YYYY-MM-DD")
        dateModified(formatString: "YYYY-MM-DD")
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
