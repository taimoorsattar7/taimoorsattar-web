import React, { useState, useEffect } from "react"
import useMediaQuery from "@hooks/useMediaQuery"
import Header from "@components/header"
import ConHierarchy from "@components/conhierarchy/conhierarchy"
import { Link } from "gatsby"

import { MenuAlt1Icon, LockClosedIcon } from "@heroicons/react/solid"

const SideBarLayout = ({
  //   serverData,
  navData,
  currentSlug,
  mainSlug,
  location,
  error,
  children,
  params,
}: any) => {
  // const isBrowser = typeof window !== `undefined`
  let [next, setNext] = useState<any>(null)
  let [previous, setPrevious] = useState<any>(null)

  const isDesktop = useMediaQuery("(min-width: 960px)")

  let [togglenav, setTogglenav] = useState<any>(isDesktop)

  function handleNavigation(moduleDoc: any[], slug: any) {
    for (let i = 0; i < moduleDoc.length; i++) {
      for (let j = 0; j < moduleDoc[i].doc?.length; j++) {
        if (moduleDoc[i].doc[j]?.slug?.current === slug) {
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
    handleNavigation(navData, currentSlug)
  }, [isDesktop])

  useEffect(() => {
    if (isDesktop) {
      setTogglenav(true)
    } else {
      setTogglenav(false)
    }
  }, [isDesktop])

  if (error) {
    return (
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
    )
  }

  return (
    <>
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

          {navData ? (
            <ConHierarchy nav={navData} slug={currentSlug} main={mainSlug} />
          ) : (
            <div>No Data</div>
          )}
        </div>
        <div className={`block ${togglenav == false && "m-auto max-w-full"} `}>
          <div
            className={`m-auto  mw800 ${togglenav == true ? "ml-14" : "ml-0"}`}
          >
            <>{children}</>
            <hr className="mb-8 border-b-2 border-grey-light" />

            <div className="flex content-center justify-between pb-12 font-sans">
              <div className="text-left">
                {previous && (
                  <>
                    <span className="text-xs font-normal md:text-sm text-grey-dark">
                      {previous.slug && (
                        <Link
                          to={`/modules/${params.doc__slug__current}/${previous.slug}`}
                          rel="prev"
                        >
                          &laquo; Previous Post
                        </Link>
                      )}
                    </span>
                    <br />
                    <p>
                      <Link
                        to={`/modules/${params.doc__slug__current}/${previous.slug}`}
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
                            to={`/modules/${params.doc__slug__current}/${next.slug}`}
                            rel="next"
                          >
                            Next Post &raquo;
                          </Link>
                        </span>

                        <br />

                        <p>
                          <Link
                            to={`/modules/${params.doc__slug__current}/${next.slug}`}
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
        </div>
      </div>
    </>
  )
}

export default SideBarLayout
