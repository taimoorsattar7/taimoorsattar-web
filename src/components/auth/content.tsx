import React from "react"

const AuthContent = ({ content, location }: any) => {
  return (
    <div className="wrapper wrapper--narrow">
      {content !== null ? (
        content.length > 0 ? (
          <div>
            <h1>{content[0].title}</h1>
            {content[0].files?.map(
              (
                doc: {
                  extension: string
                  url: string | undefined
                  originalFilename:
                    | boolean
                    | React.ReactChild
                    | React.ReactFragment
                    | React.ReactPortal
                    | null
                    | undefined
                },
                index: React.Key | null | undefined
              ) => {
                return (
                  <li key={index}>
                    <span className="headline headline__text">
                      {doc?.extension == "pdf" && <span>📁</span>}
                    </span>
                    <span className="headline headline__text">
                      {doc?.extension == "jpg" && <span>🖼️</span>}
                    </span>{" "}
                    <a href={doc.url} download>
                      {doc.originalFilename}
                    </a>
                  </li>
                )
              }
            )}
          </div>
        ) : (
          <div className="headline headline__text">Nothing Found!!</div>
        )
      ) : (
        <div>
          <p className="headline headline__text">
            Please wait. We're requesting for the requested data.
          </p>
        </div>
      )}
    </div>
  )
}

export default AuthContent
