"use client"

import React from "react"
// import SubscribeForm from "@components/blog/SubscribeForm"
// import Modal from "@components/modal/Modal"
// import { Link } from "gatsby"
import FlexLayout from "@atom/flex-layout/index"

import BlogSingleton from "@molecule/blog-singleton/index"

const BlogList = ({ posts, children }: any) => {
  return (
    
    <main className="mt-6 mb-6">
      {children}

      <FlexLayout>
        {posts.map((post: any, index: React.Key | null | undefined) => {
          const title = post.frontmatter.title
          const slug = post.fields.slug
          const date = post.frontmatter.date
          const excerpt = post.frontmatter.description || post.excerpt
          const featuredpost = post.frontmatter.featuredpost ? true : false

          return (
            <section
              key={index}
              className="flex flex-row gap-2 justify-between sm:justify-between items-center"
            >
              <BlogSingleton
                title={title}
                slug={slug}
                smDescription={excerpt}
                date={date}
                isFeature={featuredpost}
              />
            </section>
          )
        })}
      </FlexLayout>
    </main>
  )
}

export default BlogList
