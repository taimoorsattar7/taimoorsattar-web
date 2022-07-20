import React from "react"

import Layout from "@components/layout"
import SEO from "@components/seo"

import { PageProps, Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Books: React.FC<PageProps<any>> = ({ data, location }) => {
  const result = (data.allSanityProduct || {}).edges || []
  // const posts = data.allMarkdownRemark.nodes

  return (
    <>
      <Layout location={location}>
        <SEO
          location={location}
          title={"web development Course - Taimoor Sattar"}
          description={
            "You can find courses related to web programming such as HTML, CSS, Javascript, React Gatsbyjs, etc"
          }
        />

        <section className="m-t-25 m-b-35">
          <div className="wrapper wrapper--narrow">
            <div className="m-b-20">
              <header>
                <h2 className="mb-4 font-heading font-semibold text-gray-900 text-6xl sm:text-7xl">
                  <b>From our Courses</b>
                </h2>

                <p className="text-lg text-gray-500">
                  You can find blogs related to website development such as
                  HTML, CSS, Javascript, React Gatsbyjs, etc
                </p>
              </header>
            </div>

            {result.map((p: any, index: React.Key | null | undefined) => {
              const featureImg = p?.node?.seo.image?.asset?.gatsbyImageData
              return (
                <div
                  key={index}
                  className="max-w-sm px-6 pt-6 pb-2 transition duration-500 transform bg-white shadow-lg rounded-xl hover:scale-105"
                >
                  <h3 className="mb-3 text-xl font-bold text-indigo-600">
                    Intermediate
                  </h3>
                  <div className="relative">
                    {featureImg && (
                      <GatsbyImage
                        className="w-full rounded-xl"
                        image={getImage(featureImg)}
                        alt={"image"}
                      />
                    )}
                  </div>
                  <h1 className="mt-4 text-2xl font-bold text-gray-800 cursor-pointer">
                    {p.node.title}
                  </h1>
                  <div className="my-4">
                    <p className="text-base">{p?.node?.seo?.excerpt}</p>

                    <button className="w-full py-2 mt-4 text-xl text-white bg-indigo-600 shadow-lg rounded-xl">
                      <a
                        className="text-white no-underline pointer"
                        href={`/p/${p?.node?.slug?.current}`}
                      >
                        Go to the course
                      </a>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Books

export const query = graphql`
  query MyQuery {
    allSanityProduct(filter: { slug: { current: { ne: null } } }) {
      edges {
        node {
          id
          slug {
            current
          }
          title
          seo {
            excerpt
            image {
              asset {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`
