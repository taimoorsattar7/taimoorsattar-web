import React from "react"
// import { GatsbyImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

// import StarFill from "@images/icons/star-fill.svg"
import StarIcon from "../../images/icons/star-icon.png"
import AnimateOnScroll from "@atom/animate-on-scroll/index"
import Avatar from "@atom/avatar/index"

const BlogSingleton = ({
  title,
  slug,
  smDescription,
  date,
  isFeature,
}: any) => {
  return (
    <AnimateOnScroll
      className="h-full"
      BoxVariants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hidden: { opacity: 0, y: 100 },
      }}
    >
      <Link
        to={slug}
        itemProp="url"
        className="no-underline h-full hover:shadow-[0px_1px_1px_rgba(0,_0,_0,_0.5)_inset] rounded bg-white box-border max-w-full w-72 flex flex-1 flex-col p-3 items-start justify-start gap-4 border-1 border-solid border-gray text-stone-900"
      >
        <Avatar />
        <div className="self-stretch flex flex-row items-start justify-start gap-[0.75rem] text-[1.5rem]">
          <div className="flex-1 flex flex-col items-start justify-start gap-[0.25rem]">
            <h3 className="text-xl mb-1">{title}</h3>
            <div className="self-stretch text-sm text-gray-700">{date}</div>
          </div>

          {isFeature == true && (
            <img className=" w-[1.25rem] h-[1.25rem]" alt="" src={StarIcon} />
          )}
        </div>
        <p className="text-base text-neutral-600">{smDescription}</p>
      </Link>
    </AnimateOnScroll>
  )
}

export default BlogSingleton
