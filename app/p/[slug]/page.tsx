'use client'

import React, { useEffect, useState } from 'react'
import Layout from '@/src/components/layout'
import ProductPage from '@/src/components/product/ProductPage'
import { fetchSanityProduct, fetchSanityModules } from '@/src/lib/sanity/fetchCourse'
import { COURSE_DATA } from '@/src/lib/courseData'
import { Loader2 } from 'lucide-react'

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [sanityProduct, setSanityProduct] = useState<any>(null)
  const [sanityModules, setSanityModules] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const [productRes, modulesRes] = await Promise.all([
        fetchSanityProduct(params.slug),
        fetchSanityModules('build-a-standout-website'),
      ])
      setSanityProduct(productRes)
      setSanityModules(modulesRes)
      setLoading(false)
    }
    loadData()
  }, [params.slug])

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="w-6 h-6 animate-spin text-teal-600 dark:text-teal-400" />
            <span className="text-sm font-semibold">Fetching course details from Sanity...</span>
          </div>
        </div>
      </Layout>
    )
  }

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

  return (
    <Layout>
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
