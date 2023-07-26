import React from "react"
import PropTypes from "prop-types"

const Container = ({ children, spacing }: any) => {
  return (
    <div
      className={` max-w-[960px] mx-auto px-2 sm:px-4 lg:px-6 
      ${spacing == "small" ? "mt-2 mb-2" : ""}
      ${spacing == "medium" ? "mt-4 mb-4" : ""}
      ${spacing == "large" ? "mt-6 mb-6" : ""}
    `}
    >
      {children}
    </div>
  )
}

export default Container

Container.propTypes = {
  spacing: PropTypes.string,
}

Container.defaultProps = {
  spacing: "small",
}
