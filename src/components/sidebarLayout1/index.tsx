'use client'

import React, { ComponentType, ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import HeaderLogin from "@molecule/header-login/index"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"

type SidebarLayout1Props = {
  nav: any[]
  slug: string
  SideBar: ReactNode
  children: ReactNode
  location?: any
  params?: any
}

const SidebarLayout1 = ({
  nav,
  slug,
  SideBar,
  children,
  location,
  params,
}: SidebarLayout1Props) => {
  const [next, setNext] = useState<any>(null)
  const [previous, setPrevious] = useState<any>(null)
  const [toggleSideMenu, setToggleSideMenu] = useState(false)

  const currentCourseSlug = params?.doc__slug__current || "build-a-standout-website"

  useEffect(() => {
    if (Array.isArray(nav) && slug) {
      handleNavigation(nav, slug)
    }
  }, [nav, slug])

  function handleNavigation(moduleDoc: any[], currentSlug: string) {
    const flatLessons: any[] = []
    moduleDoc.forEach((mod: any) => {
      if (Array.isArray(mod.doc)) {
        mod.doc.forEach((lesson: any) => {
          flatLessons.push(lesson)
        })
      }
    })

    const currentIndex = flatLessons.findIndex(
      l => l?.slug?.current === currentSlug
    )

    if (currentIndex !== -1) {
      setPrevious(currentIndex > 0 ? flatLessons[currentIndex - 1] : null)
      setNext(
        currentIndex < flatLessons.length - 1
          ? flatLessons[currentIndex + 1]
          : null
      )
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0b0f19] text-zinc-900 dark:text-zinc-100 transition-colors">
      <HeaderLogin
        location={location}
        onClickSideMenuHandler={() => setToggleSideMenu(prev => !prev)}
      />

      {/* Sidebar Drawer */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-72 sm:w-80 h-screen pt-20 transition-transform bg-zinc-50/90 dark:bg-zinc-900/90 backdrop-blur-md border-r border-zinc-200 dark:border-zinc-800 ${
          toggleSideMenu ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-4 pb-8 overflow-y-auto custom-scrollbar">
          {SideBar}
        </div>
      </aside>

      {/* Overlay for mobile drawer */}
      {toggleSideMenu && (
        <div
          onClick={() => setToggleSideMenu(false)}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Main Content Area */}
      <main className="pt-20 sm:ml-72 lg:ml-80 min-h-screen flex flex-col justify-between">
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-8 py-8">
          <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 p-6 sm:p-10 shadow-xl backdrop-blur-sm">
            {children}

            {/* Previous / Next Lesson Navigation Footer */}
            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {previous && previous.slug?.current && (
                  <Link
                    href={`/modules/${currentCourseSlug}/${previous.slug.current}`}
                    className="group flex flex-col p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 no-underline transition-all"
                  >
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous Lesson
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {previous.title}
                    </span>
                  </Link>
                )}
              </div>

              <div>
                {next && next.slug?.current && (
                  <Link
                    href={`/modules/${currentCourseSlug}/${next.slug.current}`}
                    className="group flex flex-col items-end p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-teal-500/50 bg-zinc-50 dark:bg-zinc-900/60 hover:bg-teal-50/50 dark:hover:bg-teal-950/20 no-underline transition-all text-right"
                  >
                    <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400">
                      Next Lesson <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {next.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SidebarLayout1
