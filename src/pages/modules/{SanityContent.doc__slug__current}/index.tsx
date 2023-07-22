import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "@components/seo"
import PortableText from "@components/portabletext/portableText"

import ConHierarchy from "@components/conhierarchy/conhierarchy"

// @ts-ignore
import { querySanity } from "@lib/querySanity.ts"

import SidebarLayout1 from "@components/sidebarLayout1/index"
import Button from "@atom/button/index"

const ModulesSpace = ({ data, location, params }: any) => {
  return (
    <>
      <SEO
        location={location}
        title={data?.sanityModules?.title}
        description={data?.sanityModules?.title}
      />

      <SidebarLayout1
        location={location}
        SideBar={
          <ConHierarchy
            nav={data.sanityModules.docs}
            slug={""}
            main={params.doc__slug__current}
          />
        }
      >
        <div className="w-full">
          <div className="mt-4 mb-8">
            <header>
              <h1 className="max-w-2xl text-2xl sm:text-3xl lg:text-4xl mb-4 mt-1">
                <b>{data?.sanityModules?.title}</b>
              </h1>
            </header>

            <section className="w-full prose-base mb-4">
              {data?.sanityModules?._rawBody && (
                <PortableText blocks={data?.sanityModules?._rawBody} />
              )}

              {data?.sanityModules?.docs[0]?.doc[0]?.slug?.current && (
                <Link
                  className="no-underline"
                  to={`${data?.sanityModules?.docs[0]?.doc[0]?.slug?.current}`}
                >
                  <Button
                    textValue="Start the first Chapter"
                    iconRight="power"
                    btnSize="large"
                    btnTheme="filled"
                  />
                </Link>
              )}
            </section>
          </div>
        </div>
      </SidebarLayout1>

      {/* <SideBarLayout
        location={location}
        navData={data.sanityModules.docs}
        mainSlug={params.doc__slug__current}
        error={false}
      >
        <div className="m-l-30 mw800">
          <div className="mt-8 mb-16">
            <h1 className="headline m-b-30">
              <b>{data?.sanityModules?.title}</b>
            </h1>

            <div className="w-full prose prose-xl m-b-15">
              {data?.sanityModules?._rawBody && (
                <PortableText blocks={data?.sanityModules?._rawBody} />
              )}

              {data?.sanityModules?.docs[0]?.doc[0]?.slug?.current && (
                <button className="px-4 py-3 text-lg font-semibold leading-tight text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 ">
                  <Link
                    className="text-white no-underline"
                    to={`${data?.sanityModules?.docs[0]?.doc[0]?.slug?.current}`}
                  >
                    Start the first lesson
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </SideBarLayout> */}
    </>
  )
}

// (_id: { eq: "e4cb62dd-3681-4869-8679-8bd480e68f27" })

export const query = graphql`
  query ModulesSpace($doc__slug__current: String) {
    sanityModules(slug: { current: { eq: $doc__slug__current } }) {
      _id
      title
      slug {
        current
      }
      _rawBody
      docs {
        doc {
          title
          slug {
            current
          }
          _rawBody
        }
        title
      }
    }
  }
`

export default ModulesSpace
