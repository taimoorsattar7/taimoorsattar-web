import * as React from "react"
import { FunctionComponent } from "react"

const VideoPlayer: FunctionComponent = ({
  className,
  videoUrl,
  videoPoster,
}: any) => {
  return (
    <section className={`${className}`}>
      <video
        className={`rounded-sm drop-shadow-lg `}
        src={videoUrl}
        poster={videoPoster}
        controls
      ></video>

      {/* <GatsbyImage image={imagePlaceholder} alt={"heading"} /> */}
    </section>
  )
}

export default VideoPlayer
