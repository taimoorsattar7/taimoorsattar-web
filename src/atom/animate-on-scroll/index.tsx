import React, { useEffect } from "react"

import { useAnimation, motion } from "framer-motion"

import { useInView } from "react-intersection-observer"

const AnimateOnScroll = ({ children, className, BoxVariants }: any) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      className={className}
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={BoxVariants}
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default AnimateOnScroll
