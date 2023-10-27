"use client"

import * as React from "react"
// import { FunctionComponent } from "react"

const VideoPlayer: any = ({ className, videoUrl, videoPoster }: any) => {
  return (
    <video
      className={`${className} h-auto rounded-sm drop-shadow-lg`}
      src={videoUrl}
      poster={videoPoster}
      controls
    ></video>
  )
}

export default VideoPlayer
