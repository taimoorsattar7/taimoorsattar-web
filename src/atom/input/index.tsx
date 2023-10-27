"use client"
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
      className={`${
        status == "error" ? "border-red-400" : "border-neutral-600"
      } className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"`}
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
