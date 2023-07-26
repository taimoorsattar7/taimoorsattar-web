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
    <div className="m-t-25 m-b-25">
      <h1 className="font-heading font-semibold text-gray-900 text-3xl sm:text-4xl mb-2">
        <b title={post.frontmatter.title}>{post.frontmatter.title}</b>
      </h1>

      <div className="flex flex--items-center m-b-20">
        <div className="flex-grow-1">
          <span className="headline headline__sml headline--dull">
            <b>Taimoor Sattar</b>
          </span>
          <span>・</span>
          <time
            className="headline headline__sml headline--dull"
            dateTime={post.frontmatter.date}
          >
            {format_date(post.frontmatter.date)}
          </time>
        </div>
      </div>

      {featureImg && (
        <div className="m-b-20">
          <GatsbyImage
            className="blogPost__img-main"
            image={featureImg}
            alt={"author"}
          />
        </div>
      )}

      <div
        className="prose prose-base max-w-fit"
        dangerouslySetInnerHTML={{ __html: post.html }}
      ></div>
    </div>
  )
}

export default BlogPage
