import React from "react"
import { useStaticQuery } from "gatsby"
// import { GatsbyImage } from "gatsby-plugin-image"
import { graphql, Link } from "gatsby"

import Newsletter from "@components/newsletter"

import "./_wrapper.scss"
import "./_headline.scss"
import "./_site-banner.scss"
import "@styles/_grid.scss"
import "@styles/_img.scss"
import "@styles/_btn.scss"

const SiteBanner = () => {
  const data = useStaticQuery(graphql`
    query PicQuery {
      avatar: file(absolutePath: { regex: "/full-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
    }
  `)

  return (
    <div className="wrapper margin-b-large">
      <section className="grid info">
        <div className="column-xs-12 column-md-1">
          <div className="about">
            <h1 className="text-5xl section-heading">
              <b>About Me</b>
            </h1>
          </div>
        </div>
        {/* <div className="column-xs-12 column-md-4 img__not_med_size">
          <GatsbyImage
            alt="image"
            image={data.avatar?.childImageSharp.gatsbyImageData}
          />
        </div> */}

        <div className="column-xs-12 column-md-7">
          <div>
            <p className="headline headline__text m-b-10">
              I'm Taimoor Sattar, a full-stack developer, and educator. I've
              been building websites for about half a decade. I have experience
              building modern websites using Gatsby/Next.js, Node.js, and
              MongoDB/Sanity/HarperDB.
            </p>
            <p className="headline headline__text m-b-10">
              Also, I've published a developer course, Build A Standout Website
              With Gatsby, Sanity, and Stripe. In this course, we use the Gatsby
              (React) framework to build dynamic websites integrated with Stripe
              payment and Sanity.
            </p>
          </div>

          <Newsletter />
        </div>
      </section>
    </div>
  )
}

export default SiteBanner
