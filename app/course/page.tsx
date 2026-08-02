import React from 'react'
import Layout from '@/src/components/layout'
import Link from 'next/link'
import { BookOpen, Clock, Users, Star, ArrowRight, Layers, Zap, Globe } from 'lucide-react'

export const metadata = {
  title: 'Web Development Courses - Taimoor Sattar',
  description: 'Step-by-step courses covering HTML, CSS, JavaScript, React, Next.js, Sanity, and Stripe — everything you need to build and ship a modern full-stack website.',
}

const courses = [
  {
    id: 'build-standout-website',
    slug: 'build-standout-website',
    title: 'Build a Standout Website',
    subtitle: 'React · Next.js · Sanity · Stripe',
    excerpt:
      'Learn to design, build, and deploy a production-ready full-stack website — from component architecture and CMS integration to payment collection and live deployment.',
    image: '/static/banner.jpg',
    badge: 'Featured',
    stats: [
      { icon: Layers, label: '13 Chapters' },
      { icon: Clock, label: 'Self-paced' },
      { icon: Globe, label: 'Full-stack' },
    ],
    highlights: [
      'React + Next.js App Router',
      'Sanity Studio v3 (Headless CMS)',
      'Stripe Checkout & Subscriptions',
      'Deploy to Netlify / Vercel',
    ],
  },
]

export default function CoursePage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Page Header */}
        <header className="py-8 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-800/60 text-teal-700 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Courses
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight mb-3">
            Learn to build<br className="hidden sm:block" /> modern web apps
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Step-by-step courses with real projects — from frontend fundamentals to full-stack deployment.
          </p>
        </header>

        {/* Course Cards */}
        <div className="space-y-6 mb-16">
          {courses.map((course) => (
            <article
              key={course.id}
              className="group relative flex flex-col md:flex-row gap-0 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 overflow-hidden shadow-sm hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
            >
              {/* Course Info */}
              <div className="flex flex-col justify-between p-6 sm:p-8 flex-1">
                <div className="space-y-4">
                  {/* Title + Subtitle + Badge */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 border border-teal-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                        {course.badge}
                      </span>
                      <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                        {course.subtitle}
                      </p>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                      {course.title}
                    </h2>
                  </div>

                  <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {course.excerpt}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap gap-4">
                    {course.stats.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                        <Icon className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Highlights */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-4">
                    {course.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href={`/p/${course.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm hover:opacity-90 transition-opacity no-underline"
                  >
                    View Course
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    Free preview available
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Course Support CTA */}
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 px-8 py-10 text-center mb-12">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            Have a question before enrolling?
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-5 max-w-md mx-auto">
            Get in touch if you have any questions about course modules, technical requirements, or access.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-500 transition-colors no-underline shadow-sm"
          >
            Contact Instructor
          </Link>
        </div>

      </div>
    </Layout>
  )
}
