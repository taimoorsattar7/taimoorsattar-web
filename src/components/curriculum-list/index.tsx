"use client"

import React, { useState } from "react"
import { ChevronDown, PlayCircle, BookOpen } from "lucide-react"

const CurriculumList = ({ children, curriculum }: any) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (!Array.isArray(curriculum) || curriculum.length === 0) {
    return null
  }

  const toggleAccordion = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="my-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Course Curriculum
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {curriculum.length} Modules containing step-by-step full stack lessons
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {curriculum.map((chapter: any, index: number) => {
          const isOpen = openIndex === index
          const lessons = Array.isArray(chapter.doc) ? chapter.doc : []

          return (
            <div
              key={index}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 overflow-hidden transition-all shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-extrabold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {chapter.title || `Module ${index + 1}`}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {lessons.length > 0 ? `${lessons.length} Lessons` : 'Module Overview'}
                    </p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-zinc-900 dark:text-zinc-100" : ""
                  }`}
                />
              </button>

              {isOpen && lessons.length > 0 && (
                <div className="p-4 divide-y divide-zinc-100 dark:divide-zinc-800/60 border-t border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900">
                  {lessons.map((lesson: any, lIdx: number) => (
                    <div
                      key={lIdx}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-4 h-4 text-zinc-400 shrink-0" />
                        <span>{lesson.title}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                        {lesson.plan || 'Free'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default CurriculumList
