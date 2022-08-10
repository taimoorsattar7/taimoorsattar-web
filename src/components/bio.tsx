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

  // const avatar = data.avatar?.childImageSharp?.fixed

  return (
    <div className="flex flex-wrap items-center justify-between">
      {data?.avatar?.childImageSharp?.gatsbyImageData && (
        <GatsbyImage
          className="w-36 h-36 flex-shrink-0 mr-4 object-cover border-2 rounded-full"
          alt="image"
          image={data.avatar?.childImageSharp.gatsbyImageData}
        />
      )}
      {author?.name && (
        <p className="headline headline__text w-10/12">
          <div>
            <b>{author.name}</b>
          </div>
          <div>{author?.summary || null}</div>
        </p>
      )}
    </div>
  )
}

export default Bio
