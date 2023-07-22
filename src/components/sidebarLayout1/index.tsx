import React, { ComponentType, ReactNode, useState, useEffect } from "react"
import { Link } from "gatsby"

import HeaderLogin from "@molecule/header-login/index"

type IconProps = {
  size: "small" | "medium" | "large"
  color: string
}

type SidebarLayout1Props = {
  children: ReactNode
  SideBar: ComponentType
  aside: ComponentType<IconProps>
  location: any
}

const SidebarLayout1 = ({
  nav,
  slug,
  SideBar,
  children,
  location,
  params,
}: any) => {
  let [next, setNext] = useState<any>(null)
  let [previous, setPrevious] = useState<any>(null)
  const [toggleSideMenu, setToggleSideMenu] = useState(true)

  useEffect(() => {
    nav ? handleNavigation(nav, slug) : ""
  }, [])

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

  return (
    <>
      <HeaderLogin
        location={location}
        onClickSideMenuHandler={() => {
          setToggleSideMenu((prevState: any) => !prevState)
        }}
      />

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          toggleSideMenu ? "-translate-x-full" : "transform-none"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">{SideBar}</ul>
        </div>
      </aside>

      <div className="mt-6 mb-6 pl-8 lg:pl-24 pr-8 lg:pr-24 pt-4 pb-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}

          <hr />

          <div className="flex content-center justify-between pb-12 font-sans">
            <div className="text-left">
              {previous && (
                <>
                  <span className="text-sm font-normal md:text-base text-grey-dark">
                    {previous.slug && (
                      <Link
                        to={`/modules/${params.doc__slug__current}/${previous.slug}`}
                        rel="prev"
                      >
                        <p className="mb-1 mt-1">&laquo; Previous Post</p>
                        <p className="text-base font-bold no-underline break-normal md:text-sm text-teal hover:underline mb-1 mt-1">
                          {previous.title}
                        </p>
                      </Link>
                    )}
                  </span>
                </>
              )}
            </div>

            <div className="text-right">
              {next && (
                <>
                  {next.slug && (
                    <>
                      <span className="text-sm font-normal md:text-base text-grey-dark">
                        <Link
                          to={`/modules/${params.doc__slug__current}/${next.slug}`}
                          rel="next"
                        >
                          <p className="mb-1 mt-1">Next Post &raquo;</p>
                          <p className="text-base font-bold no-underline break-normal md:text-sm text-teal hover:underline mb-1 mt-1">
                            {next.title}
                          </p>
                        </Link>
                      </span>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SidebarLayout1
