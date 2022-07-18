import React from "react"
import { Link, graphql } from "gatsby"
import SEO from "@components/seo"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "@components/layout"

const Blogs = ({ data, location }: any) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <SEO
        location={location}
        title={"Blogs - Taimoor Sattar"}
        description={"Blogs - Taimoor Sattar"}
      />

      <section className="m-t-25 m-b-35">
        <div className="wrapper wrapper--narrow">
          <h2 className="mb-4 font-heading font-semibold text-gray-900 text-6xl sm:text-7xl">
            <b>From our blog</b>
          </h2>

          <div className="flex flex-wrap">
            {posts.map((post: any) => {
              const title = post.frontmatter.title || post.fields.slug
              const featureImg =
                post.frontmatter?.featuredimage?.childImageSharp
                  ?.gatsbyImageData
              return (
                <div
                  key={post.fields.slug}
                  className="w-full md:w-1/2 pt-11 pb-11"
                >
                  <Link to={post.fields.slug} itemProp="url" className="group">
                    <div className="flex flex-wrap items-center -m-4">
                      {/* <div className="w-auto p-4">
                            <div className="overflow-hidden rounded-xl">
                              {featureImg && (
                                <div className="overflow-hidden rounded-xl">
                                  <GatsbyImage
                                    className="transform hover:scale-110 transition ease-out duration-500"
                                    image={featureImg}
                                    alt={"author"}
                                  />
                                </div>
                              )}
                            </div>
                          </div> */}

                      <div className="flex-1 p-4">
                        <p className="mb-2 font-heading font-medium text-xl text-gray-900 group-hover:underline">
                          {title}
                        </p>
                        <h2 className="font-heading font-medium text-xs uppercase text-gray-500 tracking-px">
                          {post.frontmatter.date}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Blogs

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { regex: "/blogs/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
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
