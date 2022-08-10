import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

const SponsorBlock = ({ data }: any) => {
  return (
    <div className="flex flex-col space-y-96 mt-16 mb-16">
      {data.map(({ node }: any) => (
        <div className="flex border-solid">

          <a
            href={`/p/${node?.slug?.current}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-0.5 hover:underline"
          >
            <GatsbyImage
              className="w-20 h-20 flex-shrink-0 mr-4 object-cover border-2"
              image={node?.seo.image.asset.gatsbyImageData}
              alt={"img"}
            />
          </a>

          <div className="flex-grow flex flex-col">
            <div>
              <h3 className="flex items-center font-sans font-bold text-xs text-gray-900 text-opacity-40 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-700 flex-shrink-0 mr-2.5"></span>
                SPONSOR
              </h3>
              <a
                href={`/p/${node?.slug?.current}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-0.5 hover:underline"
              >
                <b>{node.title}</b>
              </a>
            </div>
            <p className="text-gray-600 text-opacity-40 text-xs mt-auto font-sans">
              <span className="text-blue-400 lg:inline block hover:underline">
                Programming
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SponsorBlock
