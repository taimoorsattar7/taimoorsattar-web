import React from "react"
import { graphql, Link } from "gatsby"

import PortableTextReact from "@components/portabletext/portableText"

import ConHierarchy from "@components/conhierarchy/conhierarchy"

// @ts-ignore
import { querySanity } from "@lib/querySanity.ts"

import SidebarLayout1 from "@components/sidebarLayout1/index"
import Button from "@atom/button/index"

import SEOHead from "@atom/seo-head/index"

const ModulesSpace = ({ data, location, params }: any) => {
  return (
    <>
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
                <PortableTextReact blocks={data?.sanityModules?._rawBody} />
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
    </>
  )
}

export const Head = ({
  location,
  // params,
  data,
}: // pageContext
any) => (
  <SEOHead
    title={data?.sanityModules?.title}
    description={data?.sanityModules?.title}
    location={location}
  />
)

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
