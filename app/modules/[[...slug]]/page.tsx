import React from 'react'
import type { Metadata } from 'next'
import { fetchSanityModules } from '@/src/lib/sanity/fetchCourse'
import ModulesClient from './ModulesClient'

export async function generateStaticParams() {
  const modulesData = await fetchSanityModules('build-a-standout-website')
  const paramsList: { slug?: string[] }[] = [{ slug: [] }, { slug: ['build-a-standout-website'] }]

  if (Array.isArray(modulesData?.curriculum)) {
    modulesData.curriculum.forEach((mod: any) => {
      if (Array.isArray(mod.doc)) {
        mod.doc.forEach((lesson: any) => {
          if (lesson.slug?.current) {
            paramsList.push({
              slug: ['build-a-standout-website', lesson.slug.current],
            })
          }
        })
      }
    })
  }

  return paramsList
}

export async function generateMetadata({
  params,
}: {
  params: { slug?: string[] }
}): Promise<Metadata> {
  const slugPath = params.slug || []
  const courseSlug = slugPath[0] || 'build-a-standout-website'
  const lessonSlug = slugPath[1]

  const courseData = await fetchSanityModules(courseSlug)

  let lessonTitle = ''
  if (lessonSlug && Array.isArray(courseData?.curriculum)) {
    for (const mod of courseData.curriculum) {
      if (Array.isArray(mod.doc)) {
        const match = mod.doc.find((item: any) => item.slug?.current === lessonSlug)
        if (match) {
          lessonTitle = match.title
          break
        }
      }
    }
  }

  const pageTitle = lessonTitle
    ? `${lessonTitle} - Build a Standout Website | Taimoor Sattar`
    : `${courseData?.title || 'Course Curriculum'} - Build a Standout Website | Taimoor Sattar`

  const description = lessonTitle
    ? `Step-by-step tutorial: ${lessonTitle}. Learn full-stack web development with React, Next.js, and Sanity CMS.`
    : `Explore all ${courseData?.curriculum?.length || 13} modules and step-by-step lessons in the Build a Standout Website course by Taimoor Sattar.`

  const canonicalPath = slugPath.length > 0 ? slugPath.join('/') : ''
  const canonicalUrl = `https://taimoorsattar.dev/modules${canonicalPath ? `/${canonicalPath}` : ''}`
  const ogImageUrl = 'https://taimoorsattar.dev/profile-pic.jpg'

  return {
    title: pageTitle,
    description,
    keywords: [
      'Web Development Curriculum',
      lessonTitle,
      courseData?.title,
      'React Next.js Lessons',
      'Sanity CMS Tutorials',
      'Taimoor Sattar',
    ].filter(Boolean) as string[],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: pageTitle,
      description,
      siteName: 'Taimoor Sattar',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      creator: '@taimoorsattar7',
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function ModulesPage({
  params,
}: {
  params: { slug?: string[] }
}) {
  const slugPath = params.slug || []
  const courseSlug = slugPath[0] || 'build-a-standout-website'
  const lessonSlug = slugPath[1]

  const courseData = await fetchSanityModules(courseSlug)

  let lessonTitle = ''
  if (lessonSlug && Array.isArray(courseData?.curriculum)) {
    for (const mod of courseData.curriculum) {
      if (Array.isArray(mod.doc)) {
        const match = mod.doc.find((item: any) => item.slug?.current === lessonSlug)
        if (match) {
          lessonTitle = match.title
          break
        }
      }
    }
  }

  // Schema.org JSON-LD EducationalStructuredData
  const structuredJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name: lessonTitle || courseData?.title || 'Build a Standout Website Curriculum',
    description: `Full stack web development tutorial and curriculum by Taimoor Sattar.`,
    learningResourceType: 'Course Module',
    educationalLevel: 'Beginner to Advanced',
    author: {
      '@type': 'Person',
      name: 'Taimoor Sattar',
      url: 'https://taimoorsattar.dev',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredJsonLd) }}
      />
      <ModulesClient
        courseData={courseData}
        courseSlug={courseSlug}
        lessonSlug={lessonSlug}
      />
    </>
  )
}
