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
      title={props?.value?.title ? props?.value?.title : ""}
      src={props?.value?.url}
      frameBorder="no"
      loading="lazy"
      allowTransparency={true}
      allowFullScreen={true}
    ></iframe>
  )
}
