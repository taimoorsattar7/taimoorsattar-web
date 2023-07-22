import React from "react"
import AnimateOnScroll from "@atom/animate-on-scroll/index"
import "./style.scss"

const CurriculumSingleton = ({ title, moduleIndex, rawBody }: any) => {
  return (
    <AnimateOnScroll
      className="h-full border-4 border-neutral-700 drop-shadow-sm radius3"
      BoxVariants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hidden: { opacity: 0, y: 100 },
      }}
    >
      <article className="information [ card ]">
        <span className="tag">{moduleIndex}</span>
        <h2 className="text-xl mb-1">{title}</h2>

        <p className="text-base text-neutral-600">{rawBody}</p>
      </article>
    </AnimateOnScroll>
  )
}

export default CurriculumSingleton
