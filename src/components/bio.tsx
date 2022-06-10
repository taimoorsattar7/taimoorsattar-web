/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"
import { GatsbyImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  // const avatar = data.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {data?.avatar?.childImageSharp?.gatsbyImageData && (
        <GatsbyImage
          className="bio-avatar"
          alt="image"
          image={data.avatar?.childImageSharp.gatsbyImageData}
        />
        // <Image
        //   fixed={avatar}
        //   alt={author?.name || ``}
        //   className="bio-avatar"
        //   imgStyle={{
        //     borderRadius: `50%`,
        //   }}
        // />
      )}
      {author?.name && (
        <p className="headline headline__text">
          Written by <strong>{author.name}</strong> {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            You should follow them on Twitter
          </a>
          .{` `}
          <span>
            You can contact me on <Link to="contact-me">this page</Link>.
          </span>
        </p>
      )}
    </div>
  )
}

export default Bio
