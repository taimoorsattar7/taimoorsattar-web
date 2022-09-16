import React, { useState } from "react"
import { graphql, Link } from "gatsby"

import Header from "@components/header"
import SEO from "@components/seo"

import { MenuAlt1Icon } from "@heroicons/react/solid"

// @ts-ignore
import { querySanity } from "@lib/querySanity.ts"

import PortableText from "@components/portabletext/portableText"
import ConHierarchy from "@components/conhierarchy/conhierarchy"

const ModulesSpace = ({ data, location, params }: any) => {
  const isBrowser = typeof window !== `undefined`
  let [togglenav, setTogglenav] = useState<any>(
    isBrowser ? window.matchMedia("(min-width: 1050px)").matches : false
  )

  return (
    <>
      <SEO location={location} title={data?.sanityModules?.title} />
      <Header location={location} />
      <div className="flex flex--items-start flex--justify-start">
        <div
          className={`${
            togglenav == false && "w-0 -translate-x-full"
          } mw300 pos-sticky t-0`}
        >
          <button
            className={`${
              togglenav == false && "border-2 border-blue-200 -right-24"
            } absolute p-2 -right-11 z-50 mt-2 origin-top-left bg-white rounded-md shadow-lg transition-all`}
            onClick={() => {
              setTogglenav((prev: any) => !prev)
            }}
          >
            <MenuAlt1Icon className="w-6 h-6" />
          </button>

          {data?.sanityModules?.docs ? (
            <>
              <ConHierarchy
                nav={data.sanityModules.docs}
                main={params.doc__slug__current}
              />
            </>
          ) : (
            <div>No Data</div>
          )}
        </div>

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
      </div>
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
