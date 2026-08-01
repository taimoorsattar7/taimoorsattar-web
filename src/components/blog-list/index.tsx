import React from "react"
import GridLayout from "@atom/grid-layout/index"
import BlogSingleton from "@molecule/blog-singleton/index"

const BlogList = ({ posts, children }: any) => {
  return (
    <section className="my-8">
      {children}

      <GridLayout>
        {posts.map((post: any, index: number) => {
          const title = post.frontmatter.title
          const slug = post.fields.slug
          const date = post.frontmatter.date
          const excerpt = post.frontmatter.description || post.excerpt
          const category = post.frontmatter.category || "Article"
          const featuredpost = post.frontmatter.featuredpost ? true : false

          return (
            <div key={post.id || slug || index} className="h-full">
              <BlogSingleton
                index={index}
                title={title}
                slug={slug}
                smDescription={excerpt}
                date={date}
                category={category}
                isFeature={featuredpost}
              />
            </div>
          )
        })}
      </GridLayout>
    </section>
  )
}

export default BlogList
