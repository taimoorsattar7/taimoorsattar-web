import React, { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"

// import { navigate } from "@reach/router"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import useMediaQuery from "@hooks/useMediaQuery"

import { useQuery } from "react-query"

// import Axios, { AxiosResponse } from "axios"

import Header from "@components/header"
import { getCurrentUser } from "@utils/auth.ts"

import SEO from "@components/seo"

import PortableText from "@components/portabletext/portableText"

import ConHierarchy from "@components/conhierarchy/conhierarchy"

import { MenuAlt1Icon, LockClosedIcon } from "@heroicons/react/solid"

const Content = ({
  //   serverData,
  location,
  //   pageContext,
  data: { sanityContent, sanityModules },
  params,
}: any) => {
  const isBrowser = typeof window !== `undefined`
  let [next, setNext] = useState<any>(null)
  let [previous, setPrevious] = useState<any>(null)

  const isDesktop = useMediaQuery("(min-width: 960px)")

  let [togglenav, setTogglenav] = useState<any>(isDesktop)

  const featureImg = sanityContent.bgimage?.asset?.gatsbyImageData

  function handleNavigation(moduleDoc: any[], slug: any) {
    for (let i = 0; i < moduleDoc.length; i++) {
      for (let j = 0; j < moduleDoc[i].doc?.length; j++) {
        if (moduleDoc[i].doc[j]?.slug?.current === slug) {
          console.log(moduleDoc.length)
          if (j < moduleDoc[i].doc?.length - 1) {
            if (i !== moduleDoc.length) {
              setNext({
                title: moduleDoc[i].doc[j + 1]?.title,
                slug: moduleDoc[i].doc[j + 1]?.slug?.current,
              })
            }
            if (j !== 0) {
              setPrevious({
                title: moduleDoc[i].doc[j - 1]?.title,
                slug: moduleDoc[i].doc[j - 1]?.slug?.current,
              })
            }
            break
          }

          if (j == moduleDoc[i].doc?.length - 1) {
            if (j !== 0) {
              setPrevious({
                title: moduleDoc[i].doc[j - 1]
                  ? moduleDoc[i].doc[j - 1]?.title
                  : null,
                slug: moduleDoc[i].doc[j - 1]
                  ? moduleDoc[i].doc[j - 1]?.slug?.current
                  : null,
              })
            }

            if (i !== moduleDoc.length) {
              setNext({
                title: moduleDoc[i + 1]?.doc[0]
                  ? moduleDoc[i + 1]?.doc[0]?.title
                  : null,
                slug: moduleDoc[i + 1]?.doc[0]
                  ? moduleDoc[i + 1]?.doc[0]?.slug?.current
                  : null,
              })
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    handleNavigation(sanityModules.docs, params.slug__current)
  }, [isDesktop])

  useEffect(() => {
    if (isDesktop) {
      setTogglenav(true)
    } else {
      setTogglenav(false)
    }
  }, [isDesktop])

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
      <Header location={location} />

      <div className="flex flex--items-start flex--justify-start">
        <div
          className={`${
            togglenav == false && "z-20 left-7-4 w-0 -translate-x-full"
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

          {location && sanityModules?.docs ? (
            <ConHierarchy
              nav={sanityModules.docs}
              slug={params.slug__current}
              main={"build-a-standout-website"}
            />
          ) : (
            <div>No Data</div>
          )}
        </div>

        <div className={`block ${togglenav == false && "m-auto max-w-full"} `}>
          <div
            className={`m-auto  mw800 ${togglenav == true ? "ml-14" : "ml-0"}`}
          >
            {isLoading && (
              <div className="m-t-25">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="flex justify-center space-x-1 text-sm text-gray-700 flex--items-center">
                    <svg
                      fill="none"
                      className="w-6 h-6 animate-spin"
                      viewBox="0 0 32 32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                        fill="currentColor"
                        fill-rule="evenodd"
                      />
                    </svg>

                    <div>Loading ...</div>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center">
                <div className="container flex flex-col items-center justify-center px-5 text-gray-700 md:flex-row">
                  <div className="max-w-md">
                    <div className="text-5xl font-bold font-dark">404</div>
                    <p className="text-2xl font-light leading-normal md:text-3xl">
                      Sorry we couldn't find this page.{" "}
                    </p>
                    <p className="mb-8">
                      But dont worry, you can find plenty of other things on our
                      homepage.
                    </p>

                    <button className="inline px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue active:bg-blue-600 hover:bg-blue-700">
                      back to homepage
                    </button>
                  </div>
                </div>
              </div>
            )}

            {!isLoading && !data?.is && (
              <div className="m-t-25">
                <h1 className="headline m-b-30">
                  <b>{sanityContent?.title}</b>
                </h1>

                <div className="relative overflow-y-hidden h-[32rem]">
                  <button className="absolute z-20 right-2/4 top-2/4">
                    <a
                      href={"/p/build-standout-website/"}
                      id="button"
                      className="inline-flex items-center justify-between overflow-hidden text-white no-underline transition-all bg-blue-500 rounded-md shadow cursor-pointer group hover:glow"
                    >
                      <div className="w-12 px-3 mt-2 mb-2">
                        <LockClosedIcon />
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

            {data?.is == true && (
              <div className="m-t-25">
                <h1 className="headline m-b-30">
                  <b>{sanityContent?.title}</b>
                </h1>

                {featureImg && (
                  <GatsbyImage
                    className="w-full h-auto mb-5"
                    image={getImage(featureImg)}
                    alt={"heading"}
                  />
                )}

                {/* {JSON.stringify(sanityContent._rawBody)} */}

                <div className="w-full prose prose-xl">
                  {sanityContent._rawBody && (
                    <PortableText blocks={sanityContent._rawBody} />
                  )}
                </div>

                <hr className="mb-8 border-b-2 border-grey-light" />

                <div className="flex content-center justify-between pb-12 font-sans">
                  <div className="text-left">
                    {previous && (
                      <>
                        <span className="text-xs font-normal md:text-sm text-grey-dark">
                          {previous.slug && (
                            <Link
                              to={`/modules/${params.main}/${previous.slug}`}
                              rel="prev"
                            >
                              &laquo; Previous Post
                            </Link>
                          )}
                        </span>
                        <br />
                        <p>
                          <Link
                            to={`/modules/${params.main}/${previous.slug}`}
                            className="text-base font-bold no-underline break-normal md:text-sm text-teal hover:underline"
                          >
                            {previous.title}
                          </Link>
                        </p>
                      </>
                    )}
                  </div>

                  <div className="text-right">
                    {next && (
                      <>
                        {next.slug && (
                          <>
                            <span className="text-xs font-normal md:text-sm text-grey-dark">
                              <Link
                                to={`/modules/${params.main}/${next.slug}`}
                                rel="next"
                              >
                                Next Post &raquo;
                              </Link>
                            </span>

                            <br />

                            <p>
                              <Link
                                to={`/modules/${params.main}/${next.slug}`}
                                className="text-base font-bold no-underline break-normal md:text-sm text-teal hover:underline"
                              >
                                {next.title}
                              </Link>
                            </p>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const query = graphql`
  query ($id: String) {
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

// export async function config() {
//   // Optionally use GraphQL here

//   return ({ params }) => {
//     return {
//       defer: true,
//     }
//   }
// }

export default Content
