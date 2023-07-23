import React from "react"
import PropTypes from "prop-types"

const Input = ({
  id,
  register,
  status, // error, success, normal
  type,
  placeholder,
  boolautocomplete,
  required,
  options,
  ...props
}: any) => {
  return (
    <input
      id={id}
      {...register(id, options ? options : {})}
      {...props}
      className={`${status == "error" ? "border-red-400" : "border-neutral-600"} text-base mb-1`}
      type={type}
      placeholder={placeholder}
      autoComplete={boolautocomplete}
    />
  )
}

export default Input

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.bool,
  required: PropTypes.bool,
}

Input.defaultProps = {
  id: "text",
  type: "text",
  placeholder: "Place text here",
  autoComplete: "on",
  required: false,
}
