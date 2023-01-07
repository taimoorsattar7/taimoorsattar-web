import React from "react"
import { graphql, Link } from "gatsby"

import SEO from "@components/seo"
import PortableText from "@components/portabletext/portableText"

// @ts-ignore
import { querySanity } from "@lib/querySanity.ts"

import SideBarLayout from "@components/sidebarLayout"

const ModulesSpace = ({ data, location, params }: any) => {
  return (
    <>
      <SEO
        location={location}
        title={data?.sanityModules?.title}
        description={data?.sanityModules?.title}
      />

      <SideBarLayout
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
      </SideBarLayout>
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
