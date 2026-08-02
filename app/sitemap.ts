import { MetadataRoute } from 'next'
import { fetchSanityModules } from '@/src/lib/sanity/fetchCourse'
import { getAllPosts } from '@/src/lib/blogs'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://taimoorsattar.dev'

  const staticRoutes = [
    '',
    '/p/build-standout-website',
    '/course',
    '/blogs',
    '/about',
    '/contact',
    '/newsletter',
    '/settings',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Blog posts
  const posts = getAllPosts()
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Sanity course modules & lessons
  const modulesData = await fetchSanityModules('build-a-standout-website')
  const lessonRoutes: MetadataRoute.Sitemap = []

  if (Array.isArray(modulesData?.curriculum)) {
    modulesData.curriculum.forEach(mod => {
      if (Array.isArray(mod.doc)) {
        mod.doc.forEach(lesson => {
          if (lesson.slug?.current) {
            lessonRoutes.push({
              url: `${baseUrl}/modules/build-a-standout-website/${lesson.slug.current}`,
              lastModified: new Date(),
              changeFrequency: 'weekly' as const,
              priority: 0.7,
            })
          }
        })
      }
    })
  }

  return [...staticRoutes, ...blogRoutes, ...lessonRoutes]
}
