'use client'

import React, { useState, useEffect } from "react"
import useMediaQuery from "@hooks/useMediaQuery"
import Header from "@components/header"
import ConHierarchy from "@components/conhierarchy/conhierarchy"
import Link from "next/link"
import { MenuAlt1Icon } from "@heroicons/react/solid"

const SideBarLayout = ({
  navData,
  currentSlug,
  mainSlug,
  location,
  error,
  children,
  params,
}: any) => {
  const [next, setNext] = useState<any>(null)
  const [previous, setPrevious] = useState<any>(null)

  const isDesktop = useMediaQuery("(min-width: 960px)")
  const [togglenav, setTogglenav] = useState<boolean>(isDesktop)

  function handleNavigation(moduleDoc: any[], slug: any) {
    if (!moduleDoc || !Array.isArray(moduleDoc)) return
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

          if (j === moduleDoc[i].doc?.length - 1) {
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

            if (i !== moduleDoc.length - 1) {
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
  }, [isDesktop, navData, currentSlug])

  useEffect(() => {
    setTogglenav(isDesktop)
  }, [isDesktop])

  if (error) {
    return (
      <div className="flex items-center min-h-screen bg-white dark:bg-zinc-950">
        <div className="container flex flex-col items-center justify-center px-5 text-zinc-700 dark:text-zinc-300 md:flex-row mx-auto">
          <div className="max-w-md text-center md:text-left">
            <div className="text-5xl font-extrabold text-teal-600 dark:text-teal-400 mb-4">404</div>
            <p className="text-2xl font-semibold leading-normal md:text-3xl mb-2">
              Lesson page not found.
            </p>
            <p className="mb-6 text-zinc-500 dark:text-zinc-400">
              Return to the main course page to explore available modules.
            </p>
            <Link 
              href="/course"
              className="inline-block px-5 py-2.5 text-sm font-bold text-white transition-all bg-teal-600 rounded-xl shadow hover:bg-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const moduleSlug = params?.doc__slug__current || mainSlug

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0f19] text-zinc-900 dark:text-zinc-100 selection:bg-teal-500 selection:text-white">
      {/* Section 508 Skip Link */}
      <a 
        href="#lesson-content" 
        className="skip-nav-link sr-only focus:not-sr-only"
      >
        Skip to lesson content
      </a>

      <Header />

      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8 relative">
        
        {/* Sidebar Navigation Landmark */}
        <aside 
          aria-label="Course Sidebar Navigation"
          className={`transition-all duration-300 ease-in-out shrink-0 ${
            togglenav 
              ? "w-72 opacity-100 translate-x-0" 
              : "w-0 opacity-0 -translate-x-full overflow-hidden pointer-events-none"
          }`}
        >
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 scrollbar-thin">
            {navData ? (
              <ConHierarchy nav={navData} slug={currentSlug} main={mainSlug} />
            ) : (
              <div className="text-sm text-zinc-500">Loading module navigation...</div>
            )}
          </div>
        </aside>

        {/* Sidebar Toggle Button */}
        <button
          type="button"
          aria-expanded={togglenav}
          aria-label={togglenav ? "Collapse course sidebar" : "Expand course sidebar"}
          onClick={() => setTogglenav(prev => !prev)}
          className="sticky top-20 h-10 w-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md text-zinc-700 dark:text-zinc-300 hover:text-teal-600 dark:hover:text-teal-400 hover:scale-105 motion-reduce:hover:scale-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 z-30 shrink-0"
        >
          <MenuAlt1Icon className={`w-5 h-5 transition-transform duration-200 ${togglenav ? "rotate-180" : ""}`} />
        </button>

        {/* Main Content Area */}
        <main 
          id="lesson-content" 
          tabIndex={-1} 
          className="flex-1 min-w-0 animate-page-enter focus:outline-none"
        >
          <div className="max-w-3xl">
            {children}

            <hr className="my-10 border-t border-zinc-200 dark:border-zinc-800" />

            {/* Pagination Navigation */}
            <nav aria-label="Lesson Pagination" className="flex items-center justify-between pb-12 gap-4">
              <div className="text-left">
                {previous && previous.slug && (
                  <Link
                    href={`/modules/${moduleSlug}/${previous.slug}`}
                    className="group inline-flex flex-col text-left no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl p-2 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      &laquo; Previous Lesson
                    </span>
                    <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                      {previous.title}
                    </span>
                  </Link>
                )}
              </div>

              <div className="text-right">
                {next && next.slug && (
                  <Link
                    href={`/modules/${moduleSlug}/${next.slug}`}
                    className="group inline-flex flex-col text-right no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl p-2 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-900"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      Next Lesson &raquo;
                    </span>
                    <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-1">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </main>

      </div>
    </div>
  )
}

export default SideBarLayout
