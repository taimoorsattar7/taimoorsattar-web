import React, { useState, useEffect } from "react"
import Bio from "@components/bio"
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
  const url = typeof window !== "undefined" ? window.location.href : ""
  const post = data.markdownRemark
  const { previous, next }: any = data

  const [showModal, setShowModal] = useState(false)

  let featureImg =
    post.frontmatter?.featuredimage?.childImageSharp?.gatsbyImageData

  let avatar = data.avatar.childImageSharp.gatsbyImageData

  useEffect(() => {
    const subscribe = localStorage.getItem("subscribe")

    setShowModal(subscribe == "true" ? false : true)
  }, [])

  return (
    <div className="p-b-30">
      <div className="wrapper wrapper--narrow">
        <div className="m-t-25 m-b-25">
          <h1 className="headline m-b-20">
            <b>{post.frontmatter.title}</b>
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
            className="prose prose-xl max-w-fit"
            dangerouslySetInnerHTML={{ __html: post.html }}
          ></div>
        </div>

        <section>
          <h2 className="mt-10 mb-10 text-2xl">About the Author</h2>
          <Bio />
        </section>

        <div className="blogscontent__socialite">
          <div className="btn btn--inblk btn--sm btn__r-margin">
            <a
              href={`https://www.facebook.com/sharer.php?u=${url}`}
              rel="nofollow"
            >
              <span className="count">Share on Facebook</span>
            </a>
          </div>

          <div className="btn btn--inblk btn--sm btn__r-margin">
            <a
              href={`https://twitter.com/intent/tweet?original_referer=${url}`}
              className="socialite twitter"
              rel="nofollow"
              title="Share on Twitter"
            >
              <span className="count">Share on Twitter</span>
            </a>
          </div>

          <div className="btn btn--inblk btn--sm">
            <a
              href={`https://www.linkedin.com/cws/share?url=${url}`}
              rel="nofollow"
            >
              <span className="count">Share on Linkedin</span>
            </a>
          </div>

          {/* <div>
            <Modal
              title="Subscribe to my Newsletter"
              body={`<p>I wrote article about web stuff.</p>`}
              onClose={() => {
                setShowModal(false)
              }}
              timer={7000}
              show={showModal}
            >
              <SubscribeForm show={true} />
            </Modal>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default BlogPage
