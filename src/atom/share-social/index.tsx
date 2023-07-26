import * as React from "react"
// import { FunctionComponent } from "react"
import { TwitterIcon, FacebookIcon, LinkedinIcon } from "lucide-react"

function generateFBLink({ url }: any) {
  if (!url) return null
  return `https://www.facebook.com/sharer.php?u=${url}`
}

function generateTwitterLink({ text = "", url }: any) {
  if (!url) return null
  return `http://twitter.com/share?text=${text}&url=${url}&hashtags=hashtag1,hashtag2,hashtag3`
}

function generateINLink({ url }: any) {
  if (!url) return null
  return `https://www.linkedin.com/cws/share?url=${url}`
}

const ShareSocial: any = ({ data }: any) => {
  return (
    <section className="w-full mx-auto py-3">
      <header>
        <p className="text-lg">
          <b>Share this Blog</b>
        </p>
      </header>
      <ul className="flex flex-wrap">
        {data.map((soc: any, index: any) => {
          return (
            <ol className="m-0" key={index}>
              <a
                href={`
                    ${
                      soc.name == "facebook"
                        ? generateFBLink({
                            url: soc.url,
                          })
                        : ""
                    }
                    ${
                      soc.name == "twitter"
                        ? generateTwitterLink({
                            text: soc?.title ? soc?.title : "",
                            url: soc.url,
                          })
                        : ""
                    }
                    ${
                      soc.name == "linkedin"
                        ? generateINLink({
                            url: soc.url,
                          })
                        : ""
                    }
                `}
                target="_blank"
                className="no-underline inline-flex items-center m-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm text-gray-600"
                title={soc.name}
              >
                <span>
                  {soc.name == "facebook" ? (
                    <FacebookIcon className="w-auto h-4 mr-2 fill-current text-gray-400" />
                  ) : (
                    ""
                  )}
                  {soc.name == "twitter" ? (
                    <TwitterIcon className="w-auto h-4 mr-2 fill-current text-gray-400" />
                  ) : (
                    ""
                  )}
                  {soc.name == "linkedin" ? (
                    <LinkedinIcon className="w-auto h-4 mr-2 fill-current text-gray-400" />
                  ) : (
                    ""
                  )}
                </span>
                <p title={soc.name} className="text-base no-underline m-0">
                  {soc.name}
                </p>
              </a>
            </ol>
          )
        })}
      </ul>
    </section>
  )
}

export default ShareSocial
