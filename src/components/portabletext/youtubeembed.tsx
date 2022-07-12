import React from "react"
var getYouTubeID = require("get-youtube-id")

export const YoutubeEmbed = (props: any) => {
  const id = getYouTubeID(props?.node?.url)
  const url = `https://www.youtube.com/embed/${id}`

  if (!id) {
    return <div>Missing Youtube URL</div>
  }

  return (
    <iframe
      width="100%"
      height="315"
      src={url}
      title={props?.node?.title ? props?.node?.title : ""}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}
