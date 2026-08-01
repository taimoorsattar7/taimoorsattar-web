"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ChevronDown, PlayCircle, BookOpen } from "lucide-react"

const ConHierarchy = ({ nav, slug, main }: any) => {
  const [openModules, setOpenModules] = useState<{ [key: number]: boolean }>(() => {
    const initialState: { [key: number]: boolean } = {}
    nav?.forEach((mod: any, idx: number) => {
      const hasActive = mod.doc?.some((d: any) => d?.slug?.current === slug)
      if (hasActive || idx === 0) {
        initialState[idx] = true
      }
    })
    return initialState
  })

  const toggleModule = (idx: number) => {
    setOpenModules(prev => ({
      ...prev,
      [idx]: !prev[idx],
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 mb-2 border-b border-zinc-200 dark:border-zinc-800">
        <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" aria-hidden="true" />
        <h2 className="font-extrabold text-sm uppercase tracking-wider text-zinc-900 dark:text-zinc-100 m-0">
          Course Modules
        </h2>
      </div>

      <div className="space-y-3">
        {nav?.map((moduleItem: { doc: any[]; title: string }, modIdx: number) => {
          const isOpen = Boolean(openModules[modIdx])
          const hasActiveLesson = moduleItem.doc?.some((d: any) => d?.slug?.current === slug)
          const contentId = `module-lessons-${modIdx}`

          return (
            <div
              key={modIdx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                hasActiveLesson
                  ? "border-teal-500/50 bg-teal-500/5 dark:bg-teal-950/20 shadow-sm"
                  : "border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleModule(modIdx)}
                className="w-full flex items-center justify-between p-3.5 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-md bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold flex items-center justify-center shrink-0">
                    {modIdx + 1}
                  </span>
                  <span className="truncate">{moduleItem.title}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-teal-500" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div 
                  id={contentId}
                  className="p-2 space-y-1 bg-white dark:bg-zinc-900/80 border-t border-zinc-100 dark:border-zinc-800/60 animate-dropdown-in"
                >
                  {moduleItem.doc?.map((lesson: any, lessonIdx: number) => {
                    const isActive = lesson?.slug?.current === slug
                    return (
                      <Link
                        key={lessonIdx}
                        href={`/modules/${main}/${lesson?.slug?.current}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium no-underline transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                          isActive
                            ? "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-md font-semibold translate-x-0.5 motion-reduce:translate-x-0"
                            : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 hover:text-teal-600 dark:hover:text-teal-400 hover:translate-x-0.5 motion-reduce:hover:translate-x-0"
                        }`}
                      >
                        <PlayCircle
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isActive ? "text-white" : "text-zinc-400"
                          }`}
                          aria-hidden="true"
                        />
                        <span className="truncate flex-1">{lesson.title}</span>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ConHierarchy
