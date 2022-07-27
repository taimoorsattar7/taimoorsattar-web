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
        title={"Blogs about web programming - Taimoor Sattar"}
        description={
          "You can find blogs related to web programming such as HTML, CSS, Javascript, React Gatsbyjs, etc"
        }
      />

      <section className="m-t-25 m-b-35">
        <div className="wrapper wrapper--narrow">
          <header>
            <h2 className="mb-4 font-heading font-semibold text-gray-900 text-6xl sm:text-7xl">
              <b>From our blogs</b>
            </h2>

            <p className="text-lg text-gray-500">
              You can find blogs related to web programming such as HTML, CSS,
              Javascript, React Gatsbyjs, etc
            </p>
          </header>

          <div className="flex flex-wrap">
            {posts.map((post: any) => {
              const title = post.frontmatter.title || post.fields.slug
              // const featureImg =
              //   post.frontmatter?.featuredimage?.childImageSharp
              //     ?.gatsbyImageData
              return (
                <div
                  key={post.fields.slug}
                  className="w-full md:w-1/2 pt-11 pb-11 md:gap-4"
                >
                  <Link to={post.fields.slug} itemProp="url" className="group">
                    <div className="flex flex-wrap items-center">
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
