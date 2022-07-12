import React from "react"

export const CodepenEmbed = (props: any) => {
  if (!props?.node?.url) {
    return <div>Missing CodePen URL</div>
  }

  return (
    <iframe
      height="300"
      style={{
        width: "100%",
      }}
      scrolling="no"
      title={props?.node?.title ? props?.node?.title : ""}
      src={props?.node?.url}
      frameBorder="no"
      loading="lazy"
      allowTransparency={true}
      allowFullScreen={true}
    ></iframe>
  )
}
