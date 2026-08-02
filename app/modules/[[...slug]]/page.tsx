'use client'

import React, { useEffect, useState } from 'react'
import Layout from '@/src/components/layout'
import SidebarLayout1 from '@/src/components/sidebarLayout1/index'
import ConHierarchy from '@/src/components/conhierarchy/conhierarchy'
import { fetchSanityModules } from '@/src/lib/sanity/fetchCourse'
import { getUser, isLoggedIn } from '@/src/utils/auth'
import PortableTextReact from '@/src/components/portabletext/portableText'
import Link from 'next/link'
import { BookOpen, PlayCircle, ArrowRight, Loader2, Sparkles, CheckCircle2, Clock, Lock, ShieldAlert, ArrowUpRight } from 'lucide-react'

export default function ModulesPage({ params }: { params: { slug?: string[] } }) {
  const slugPath = params.slug || []
  const courseSlug = slugPath[0] || 'build-a-standout-website'
  const lessonSlug = slugPath[1]

  const [courseData, setCourseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userState, setUserState] = useState<any>(null)
  const [isSubscribedUser, setIsSubscribedUser] = useState(false)

  useEffect(() => {
    const usr = getUser()
    setUserState(usr)

    if (usr?.token) {
      fetch(`/api/isSubscribe?token=${usr.token}&moduleRef=build-a-standout-website`)
        .then(res => res.json())
        .then(data => {
          if (data?.is || data?.message === 'success') {
            setIsSubscribedUser(true)
          }
        })
        .catch(() => {})
    }

    async function loadData() {
      setLoading(true)
      const data = await fetchSanityModules(courseSlug)
      setCourseData(data)
      setLoading(false)
    }
    loadData()
  }, [courseSlug])

  if (loading) {
    if (lessonSlug) {
      return (
        <SidebarLayout1
          nav={[]}
          slug={lessonSlug}
          params={{ doc__slug__current: courseSlug }}
          SideBar={<div className="p-4 text-xs font-semibold text-zinc-400">Loading curriculum...</div>}
        >
          <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            <span className="text-sm font-semibold tracking-wide">Loading lesson content...</span>
          </div>
        </SidebarLayout1>
      )
    }

    return (
      <Layout>
        <div className="min-h-[65vh] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
            <span className="text-sm font-semibold tracking-wide">Fetching curriculum modules from Sanity...</span>
          </div>
        </div>
      </Layout>
    )
  }

  const curriculum = courseData?.curriculum || []

  let totalLessons = 0
  curriculum.forEach((m: any) => {
    if (Array.isArray(m.doc)) totalLessons += m.doc.length
  })

  // Lesson Reader View (/modules/[courseSlug]/[lessonSlug])
  if (lessonSlug) {
    let currentLesson: any = null
    for (const mod of curriculum) {
      if (Array.isArray(mod.doc)) {
        const match = mod.doc.find((item: any) => item.slug?.current === lessonSlug)
        if (match) {
          currentLesson = match
          break
        }
      }
    }

    if (!currentLesson && curriculum.length > 0 && curriculum[0]?.doc?.length > 0) {
      currentLesson = curriculum[0].doc[0]
    }

    const isPremium = currentLesson?.plan?.toLowerCase() === 'premium'
    const isLocked = isPremium && !isSubscribedUser

    return (
      <SidebarLayout1
        nav={curriculum}
        slug={lessonSlug}
        params={{ doc__slug__current: courseSlug }}
        SideBar={
          <ConHierarchy
            nav={curriculum}
            slug={lessonSlug}
            main={courseSlug}
          />
        }
      >
        <article className="space-y-6">
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 ${
                isPremium
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30'
              }`}>
                {isPremium ? <Lock className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                {currentLesson?.plan || 'Course Content'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              <Clock className="w-3.5 h-3.5" /> ~10 min lesson
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
            {currentLesson?.title || 'Lesson Details'}
          </h1>

          {/* Access Control Prompt / Subscription Gate */}
          {isLocked ? (
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-zinc-900 to-zinc-950 p-8 sm:p-10 text-white space-y-6 shadow-2xl relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-extrabold text-white">
                  Premium Lesson Access Required
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">
                  This lesson is part of the <strong>Premium Subscription Tier</strong> in Sanity CMS. Please sign in with your active student account or enroll in the course to unlock full access.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Full access to all 13 modules & code repositories
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-400" /> Sanity CMS dataset & Stripe integration tutorials
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/p/build-standout-website"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-400 text-zinc-950 font-extrabold text-sm shadow-xl hover:opacity-95 no-underline transition-opacity"
                >
                  Enroll in Course ($39) <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/auth"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-zinc-800 text-white border border-zinc-700 font-bold text-sm hover:bg-zinc-700 no-underline transition-colors"
                >
                  Sign In with Account
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Optional Video Player */}
              {currentLesson?.videoUrl && (
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-black">
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              {/* Lesson Body Content */}
              {currentLesson?._rawBody && Array.isArray(currentLesson._rawBody) && currentLesson._rawBody.length > 0 ? (
                <PortableTextReact
                  blocks={currentLesson._rawBody}
                  className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4"
                />
              ) : (
                <div
                  className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: currentLesson?.contentHtml || '<p>Lesson content loading...</p>' }}
                />
              )}
            </>
          )}
        </article>
      </SidebarLayout1>
    )
  }

  // Course Dashboard View (/modules or /modules/[courseSlug])
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* Course Hero Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-zinc-900 via-zinc-900 to-slate-950 text-white shadow-2xl border border-zinc-800 relative overflow-hidden mb-12">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Full Course Curriculum
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {courseData?.title || 'Build a Standout Website'}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Master full-stack web development step by step. Complete all {curriculum.length} modules and {totalLessons} lessons to build production-grade web applications.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-teal-400" /> {curriculum.length} Modules
              </div>
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-teal-400" /> {totalLessons} Total Lessons
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" /> Self-Paced Learning
              </div>
            </div>
          </div>
        </div>

        {/* Modules List Grid */}
        <div className="space-y-8">
          {curriculum.map((mod: any, modIdx: number) => (
            <div
              key={modIdx}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 shadow-lg overflow-hidden transition-all hover:shadow-xl"
            >
              <div className="p-6 sm:p-8 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white font-extrabold text-base flex items-center justify-center shadow-md">
                    {modIdx + 1}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {mod.title}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      {Array.isArray(mod.doc) ? mod.doc.length : 0} Lessons in this module
                    </p>
                  </div>
                </div>

                {Array.isArray(mod.doc) && mod.doc[0]?.slug?.current && (
                  <Link
                    href={`/modules/${courseSlug}/${mod.doc[0].slug.current}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold text-xs border border-teal-200 dark:border-teal-500/30 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors no-underline"
                  >
                    Start Module <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Lesson Items */}
              <div className="p-6 sm:p-8 divide-y divide-zinc-100 dark:divide-zinc-800/60">
                {Array.isArray(mod.doc) &&
                  mod.doc.map((lesson: any, lessonIdx: number) => {
                    const isLessonPremium = lesson.plan?.toLowerCase() === 'premium'
                    return (
                      <div
                        key={lessonIdx}
                        className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 px-3 rounded-xl transition-colors"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                            <PlayCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                              {lesson.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isLessonPremium
                                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                  : 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20'
                              }`}>
                                {lesson.plan || 'Free'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/modules/${courseSlug}/${lesson.slug?.current}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs group-hover:bg-teal-600 group-hover:text-white transition-all shrink-0 no-underline"
                        >
                          Read Lesson <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
