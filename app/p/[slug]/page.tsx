import React from 'react'
import type { Metadata } from 'next'
import Layout from '@/src/components/layout'
import ProductPage from '@/src/components/product/ProductPage'
import { fetchSanityProduct, fetchSanityModules, parseSanityBlocks } from '@/src/lib/sanity/fetchCourse'
import { COURSE_DATA } from '@/src/lib/courseData'

export async function generateStaticParams() {
  return [
    { slug: 'build-standout-website' },
    { slug: 'build-a-standout-website' },
  ]
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const sanityProduct = await fetchSanityProduct(params.slug)

  const title = sanityProduct?.title || COURSE_DATA.title
  const rawShort = sanityProduct?.short || COURSE_DATA.shortDescription
  const description = typeof rawShort === 'string'
    ? rawShort
    : Array.isArray(rawShort)
    ? parseSanityBlocks(rawShort).replace(/<[^>]*>?/gm, '').slice(0, 160)
    : 'Build a Standout Website Course by Taimoor Sattar'

  const bgImageUrl = sanityProduct?.bgimage?.asset?.url || 'https://homegear.dev/_next/static/media/taimoor.0f87e767.jpg'
  const canonicalUrl = `https://taimoorsattar.dev/p/${params.slug}`

  return {
    title: `${title} - Full-Stack Web Development Course | Taimoor Sattar`,
    description,
    keywords: [
      title,
      'Build a Standout Website',
      'Web Development Course',
      'React Next.js Course',
      'Sanity CMS Tutorial',
      'Stripe Integration Next.js',
      'Full-Stack Web Development',
      'Taimoor Sattar',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title: `${title} | Taimoor Sattar`,
      description,
      siteName: 'Taimoor Sattar',
      images: [
        {
          url: bgImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Taimoor Sattar`,
      description,
      creator: '@taimoorsattar7',
      images: [bgImageUrl],
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

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const [sanityProduct, sanityModules] = await Promise.all([
    fetchSanityProduct(params.slug),
    fetchSanityModules('build-a-standout-website'),
  ])

  const title = sanityProduct?.title || COURSE_DATA.title
  const _rawShort = sanityProduct?.short || COURSE_DATA.shortDescription
  const _rawBody = sanityProduct?.body
  const bgimage = sanityProduct?.bgimage
  const mainvideo = sanityProduct?.mainvideo
  const author = sanityProduct?.author
  const techs = sanityProduct?.techs || COURSE_DATA.techs
  const productPrice = sanityProduct?.productPrice || COURSE_DATA.productPrice
  const curriculum = sanityModules?.curriculum || COURSE_DATA.curriculum
  const faqs = (sanityProduct?.faqs || []).filter(Boolean)
  const testimonials = (sanityProduct?.testimonials || []).filter(Boolean)

  const descriptionText = typeof _rawShort === 'string'
    ? _rawShort
    : 'Full-stack web development course with React, Next.js, and Sanity CMS by Taimoor Sattar.'

  // Schema.org JSON-LD Course Structured Data
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: title,
    description: descriptionText,
    provider: {
      '@type': 'Person',
      name: 'Taimoor Sattar',
      url: 'https://taimoorsattar.dev',
    },
    offers: {
      '@type': 'Offer',
      category: 'Subscription',
      price: '0.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://taimoorsattar.dev/p/${params.slug}`,
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT15H',
    },
  }

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <ProductPage
        location={{ search: '' }}
        title={title}
        _rawShort={_rawShort}
        _rawBody={_rawBody}
        bgimage={bgimage}
        mainvideo={mainvideo}
        author={author}
        techs={techs}
        productPrice={productPrice}
        curriculum={curriculum}
        faqs={faqs}
        testimonials={testimonials}
      />
    </Layout>
  )
}
