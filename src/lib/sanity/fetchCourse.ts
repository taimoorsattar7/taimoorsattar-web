import axios from 'axios'
import { COURSE_DATA } from '../courseData'

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.GATSBY_SANITY_PROJECT_ID || '7p4bxs1b'
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.GATSBY_SANITY_DATASET || 'production'
const SANITY_ENDPOINT = `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/${SANITY_DATASET}`

export async function fetchSanityProduct(slug: string = 'build-standout-website') {
  try {
    const query = `*[_type == "product" && (slug.current == "${slug}" || slug.current == "build-standout-website")][0]{
      _id,
      title,
      slug,
      bgimage { asset-> { url } },
      mainvideo { asset-> { url }, image { asset-> { url } } },
      author-> { name, image { asset-> { url } }, description },
      techs[] { name, logo { asset-> { url } } },
      body,
      short,
      productPrice-> {
        _id,
        title,
        plans[] {
          _key,
          keyword,
          price,
          currency,
          source,
          priceID,
          priceID_test,
          description
        },
        content-> { _id, slug }
      },
      faqs[] {
        _key,
        question,
        answer
      },
      testimonials[]-> { name, profession, message }
    }`

    const response = await axios.get(SANITY_ENDPOINT, {
      params: { query },
    })

    const result = response.data?.result
    if (result) {
      return result
    }
  } catch (error) {
    console.warn('Sanity product fetch error:', error)
  }

  return null
}

export async function fetchSanityModules(slug: string = 'build-a-standout-website') {
  try {
    const query = `*[_type == "modules" && (slug.current == "${slug}" || slug.current == "build-a-standout-website")][0]{
      _id,
      title,
      slug,
      body,
      docs[] {
        title,
        doc[]->{
          _id,
          title,
          slug,
          plan,
          body
        }
      }
    }`

    const response = await axios.get(SANITY_ENDPOINT, {
      params: { query },
    })

    const result = response.data?.result

    if (result && Array.isArray(result.docs) && result.docs.length > 0) {
      const curriculum = result.docs.map((chapter: any) => ({
        title: chapter.title || 'Untitled Module',
        doc: Array.isArray(chapter.doc)
          ? chapter.doc.map((lesson: any) => ({
              _id: lesson._id,
              title: lesson.title || 'Untitled Lesson',
              slug: { current: lesson.slug?.current || 'lesson' },
              plan: lesson.plan || 'Free',
              _rawBody: lesson.body,
              contentHtml: lesson.body ? parseSanityBlocks(lesson.body) : '<p>Lesson content coming soon.</p>',
            }))
          : [],
      }))

      return {
        title: result.title || COURSE_DATA.title,
        slug: result.slug?.current || slug,
        curriculum,
      }
    }
  } catch (error) {
    console.warn('Sanity modules fetch error:', error)
  }

  return {
    title: COURSE_DATA.title,
    slug: 'build-a-standout-website',
    curriculum: COURSE_DATA.curriculum,
  }
}

export function parseSanityBlocks(blocks: any[]): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block: any) => {
      if (block._type === 'block' && Array.isArray(block.children)) {
        const text = block.children.map((c: any) => c.text || '').join('')
        if (block.style === 'h2') return `<h2 class="text-2xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100">${text}</h2>`
        if (block.style === 'h3') return `<h3 class="text-xl font-semibold mt-4 mb-2 text-zinc-900 dark:text-zinc-100">${text}</h3>`
        if (block.style === 'blockquote') return `<blockquote class="border-l-4 border-teal-500 pl-4 italic text-zinc-600 dark:text-zinc-400 my-4">${text}</blockquote>`
        return `<p class="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed my-3">${text}</p>`
      }
      if (block._type === 'mainImage' && block.asset?.url) {
        return `<div class="my-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800"><img src="${block.asset.url}" alt="${block.alt || 'Sanity image'}" class="w-full h-auto" /></div>`
      }
      if (block._type === 'code' && block.code) {
        return `<pre class="bg-zinc-900 text-zinc-100 p-4 rounded-xl overflow-x-auto text-sm my-4 font-mono"><code>${block.code}</code></pre>`
      }
      return ''
    })
    .join('')
}
