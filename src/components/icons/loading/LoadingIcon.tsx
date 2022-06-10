import React from "react"
import "./LoadingIcon.scss"

const LoadingIcon = () => {
  return (
    <>
      <svg
        className="spinner -ml-1 mr-2 h-5 w-5"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="path"
          fill="none"
          stroke="white"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
    </>
  )
}

export default LoadingIcon
