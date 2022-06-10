import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

import Header from "@components/header"
import SEO from "@components/seo"

import { MenuAlt1Icon } from "@heroicons/react/solid"

// @ts-ignore
import { querySanity } from "@lib/querySanity.ts"

import PortableText from "@components/portabletext/portableText"
import ConHierarchy from "@components/conhierarchy/conhierarchy"

const ModulesSpace = ({ data, location, params }: any) => {
  let [module, setModule] = useState<any>(null)

  const isBrowser = typeof window !== `undefined`
  let [togglenav, setTogglenav] = useState<any>(
    isBrowser ? window.matchMedia("(min-width: 1050px)").matches : false
  )

  useEffect(() => {
    fetchData()
  })

  async function fetchData() {
    try {
      let dataQuery = await querySanity(`
      *[_type == 'modules' && slug.current=='${params.main}']
        `)
      setModule(dataQuery[0])
    } catch (error) {
      setModule(null)
    }
  }

  return (
    <>
      <SEO location={location} title={"Modules"} />
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
                main={"build-a-standout-website"}
                // main={params.main}
              />
            </>
          ) : (
            <div>No Data</div>
          )}
        </div>

        <div className="m-l-30 mw800">
          {module && (
            <div className="mt-8 mb-16">
              <h1 className="headline m-b-30">
                <b>{module?.title ?? ""}</b>
              </h1>

              <div className="w-full prose prose-xl m-b-15">
                {module?.body && <PortableText blocks={module.body} />}

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
          )}
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query ModulesSpace {
    sanityModules {
      _id
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
