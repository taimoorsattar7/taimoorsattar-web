import React, { useEffect } from "react"
import { useAnimation, motion } from "framer-motion"

const AnimateProp = ({ children, className, BoxVariants }: any) => {
  const controls = useAnimation()
  useEffect(() => {
    controls.start("visible")
  }, [controls])


  return (
    <motion.div
      className={className}
      animate={controls}
      initial="hidden"
      variants={BoxVariants}
      exit="exit"
    >
      {children}
    </motion.div>
  )
}

export default AnimateProp
