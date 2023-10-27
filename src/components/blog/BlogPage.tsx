"use client"

import React from "react"

// import SubscribeForm from "@components/blog/SubscribeForm"
// import Modal from "@components/modal/Modal"
import { GatsbyImage } from "gatsby-plugin-image"

const month_name = (num: number) => {
  const monthName: any = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec",
  }
  return monthName[num]
}

const format_date = (date: string | number | Date) => {
  let date_var = new Date(date)
  var format_date = `${month_name(
    date_var.getUTCMonth()
  )} ${date_var.getDate()}, ${date_var.getFullYear()}`
  return format_date
}

const BlogPage = ({ data }: any) => {
  const post = data.markdownRemark

  let featureImg =
    post.frontmatter?.featuredimage?.childImageSharp?.gatsbyImageData

  return (
    <article>
      <header className="flex flex-col">
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {post.frontmatter.title}
        </h1>
        <time
          dateTime={post.frontmatter.date}
          className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
          <span className="ml-3">{format_date(post.frontmatter.date)}</span>
        </time>
      </header>

      {featureImg && (
        <div className="mt-4">
          <GatsbyImage
            className="max-w-full"
            image={featureImg}
            alt={"main Image"}
          />
        </div>
      )}

      <div
        className="prose prose-lg max-w-fit mt-8"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>
    </article>
  )
}

export default BlogPage
