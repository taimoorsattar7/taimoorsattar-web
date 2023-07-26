import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { StaticImage } from "gatsby-plugin-image"

const BioDetail = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
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
  const author = data?.site?.siteMetadata?.author

  // const avatar = data.avatar?.childImageSharp?.fixed

  return (
    <div className="flex flex-wrap items-center justify-between">
      <StaticImage
        src="../../images/photos/IMG_6457.jpg"
        className="w-36 h-36 flex-shrink-0 mr-4 object-cover border-2 rounded-full"
        alt="Avatar"
        placeholder="blurred"
        layout="fixed"
      />
      {author?.name && (
        <div>
          <h3 className="text-lg">{author?.name}</h3>

          <p className="text-base">{author?.summary ? author?.summary : ""}</p>
        </div>
      )}
    </div>
  )
}

export default BioDetail
