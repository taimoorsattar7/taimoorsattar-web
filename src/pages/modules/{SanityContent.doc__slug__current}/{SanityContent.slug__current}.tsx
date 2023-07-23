import React from "react"
import { graphql } from "gatsby"
import { LockIcon } from "lucide-react"
import { useQuery } from "react-query"

// import Axios, { AxiosResponse } from "axios"

import SidebarLayout1 from "@components/sidebarLayout1/index"
import { getCurrentUser } from "@utils/auth"

import SEO from "@components/seo"

import PortableText from "@components/portabletext/portableText"
import ConHierarchy from "@components/conhierarchy/conhierarchy"

import LoadingAnima from "@atom/loading-anima/index"

// data
// location
// navigate
// pageContext
// pageResources
// params
// path
// serverData
// uri
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
      <SEO
        title={
          sanityContent?.seo?.title
            ? sanityContent?.seo?.title
            : sanityContent?.title
        }
        description={
          sanityContent?.seo?.excerpt ? sanityContent?.seo?.excerpt : ""
        }
        image={
          sanityContent?.seo?.image?.asset?.url
            ? sanityContent?.seo?.image?.asset?.url
            : sanityContent?.bgimage?.asset?.url
        }
        location={location}
      />

      {/* <SideBarLayout
        location={location}
        navData={sanityModules.docs}
        currentSlug={params.slug__current}
        mainSlug={params.doc__slug__current}
        params={params}
        error={error}
      ></SideBarLayout> */}

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
                  <PortableText blocks={sanityContent._rawBody} />
                )}
              </div>
            ) : isLoading ? (
              <div className="m-t-25">
                <LoadingAnima />

                <div className="w-full m-5 prose prose-xl blur-sm hidden">
                  {sanityContent._rawBody && (
                    <PortableText blocks={sanityContent._rawBody} />
                  )}
                </div>
              </div>
            ) : (
              <div className="m-t-25">
                <div className="relative overflow-y-hidden h-[32rem]">
                  <button className="absolute z-20 right-2/4 top-2/4">
                    <a
                      href={"/p/build-standout-website/"}
                      id="button"
                      className="inline-flex items-center justify-between overflow-hidden text-white no-underline transition-all bg-blue-500 rounded-md shadow cursor-pointer group hover:glow"
                    >
                      <div className="w-12 px-3 mt-2 mb-2">
                        <LockIcon />
                        {/* <LockClosedIcon /> */}
                      </div>

                      <p className="px-4 mt-2 mb-2">Enroll in the course</p>
                    </a>
                  </button>

                  <div className="w-full m-5 prose prose-xl blur-sm">
                    {sanityContent._rawBody && (
                      <PortableText blocks={sanityContent._rawBody} />
                    )}
                  </div>
                </div>
                <div className="w-full mt-10 text-base text-center text-gray-500">
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
