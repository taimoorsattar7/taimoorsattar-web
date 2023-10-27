import React from "react"
import { Link, graphql } from "gatsby"
import { useQuery } from "react-query"

import SEOHead from "@atom/seo-head/index"

import Button from "@atom/button/index"

// import Axios, { AxiosResponse } from "axios"

import SidebarLayout1 from "@components/sidebarLayout1/index"
import { getCurrentUser } from "@utils/auth"

import PortableTextReact from "@components/portabletext/portableText"
import ConHierarchy from "@components/conhierarchy/conhierarchy"

import LoadingAnima from "@atom/loading-anima/index"

const Content = ({
  //   serverData,
  location,
  // pageContext,
  data: { sanityContent, sanityModules },
  params,
}: any) => {
  // const featureImg = sanityContent.bgimage?.asset?.gatsbyImageData

  const { isLoading, error, data } = useQuery(
    ["issub", sanityContent?.doc?._id],
    () => {
      if (sanityContent.plan == "Basic") {
        return {
          is: true,
        }
      } else {
        let productRef = sanityContent?.doc?._id
        let { token } = getCurrentUser()
        return fetch(
          `/api/isSubscribe?token=${token}&moduleRef=${productRef}`
        ).then(res => res.json())
      }
    }
  )

  return (
    <>
      <SidebarLayout1
        location={location}
        nav={sanityModules.docs}
        slug={params.slug__current}
        params={params}
        SideBar={
          <ConHierarchy
            nav={sanityModules.docs}
            slug={params.slug__current}
            main={params.doc__slug__current}
          />
        }
      >
        <div className="w-full">
          <div className="mt-4 mb-8">
            <header>
              <h1 className="max-w-2xl text-2xl sm:text-3xl lg:text-4xl mb-4 mt-1">
                <b>{sanityContent?.title}</b>
              </h1>
            </header>
            {/* {featureImg && (
            <GatsbyImage
              className="w-full h-auto mb-5"
              image={getImage(featureImg)}
              alt={"heading"}
            />
          )} */}
            {sanityContent.plan == "Basic" || data?.is == true ? (
              <div className="w-full prose-base">
                {sanityContent._rawBody && (
                  <PortableTextReact blocks={sanityContent._rawBody} />
                )}
              </div>
            ) : isLoading ? (
              <div className="m-t-25">
                <LoadingAnima />

                <div className="w-full m-5 prose prose-xl blur-sm hidden">
                  {sanityContent._rawBody && (
                    <PortableTextReact blocks={sanityContent._rawBody} />
                  )}
                </div>
              </div>
            ) : (
              <div className="m-t-25">
                <div className="relative overflow-y-hidden h-[32rem]">
                  <Link
                    className="no-underline"
                    to="/p/build-standout-website/"
                  >
                    <Button
                      // className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"

                      btnSize="med"
                      btnTheme="indigo"
                      iconRight={"lock"}
                      textValue="Enroll to access the course"
                    />
                  </Link>

                  <div className="w-full m-5 prose prose-xl blur-sm">
                    {sanityContent._rawBody && (
                      <PortableTextReact blocks={sanityContent._rawBody} />
                    )}
                  </div>
                </div>
                <div className="w-full mt-10 text-base text-gray-500">
                  <b>To view the full content, enroll in the course.</b>
                </div>
              </div>
            )}
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
  <>
    <SEOHead
      title={
        data.sanityContent?.seo?.title
          ? data.sanityContent?.seo?.title
          : data.sanityContent?.title
      }
      description={
        data.sanityContent?.seo?.excerpt ? data.sanityContent?.seo?.excerpt : ""
      }
      image={
        data.sanityContent?.seo?.image?.asset?.url
          ? data.sanityContent?.seo?.image?.asset?.url
          : data.sanityContent?.bgimage?.asset?.url
      }
      schemaType={"blog"}
      location={location}
      datePublished={data?.sanityContent?._createdAt}
      dateModified={
        data?.sanityContent?._updatedAt
          ? data?.sanityContent?._updatedAt
          : data?.sanityContent?._createdAt
      }
    />
  </>
)

export const query = graphql`
  query ($id: String, $doc__slug__current: String) {
    sanityContent(id: { eq: $id }) {
      _id
      title
      bgimage {
        asset {
          gatsbyImageData
        }
      }
      doc {
        _id
      }
      slug {
        current
      }
      plan
      _updatedAt(formatString: "YYYY-MM-DD")
      _createdAt(formatString: "YYYY-MM-DD")
      seo {
        title
        excerpt
        _rawImage
        image {
          asset {
            url
          }
        }
      }
      _rawBody(resolveReferences: { maxDepth: 5 })
    }

    sanityModules(slug: { current: { eq: $doc__slug__current } }) {
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

// export async function config() {
//   // Optionally use GraphQL here
//   return ({ params }) => {
//     return {
//       defer: true,
//     }
//   }
// }

export default Content
