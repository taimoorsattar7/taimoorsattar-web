"use client"

import React from "react"
import PropTypes from "prop-types"

import Input from "@atom/input/index"

const InputField: any = ({
  labelText,
  register,
  id,
  message,
  status, // error, success, normal
  className,
  type,
  placeholder,
  boolautocomplete,
  required,
  options,
  ...props
}: any) => {
  return (
    <div className="mb-4">
      <label
        className={`text-base mb-1
      ${status == "normal" ? "text-neutral-600" : ""}
      ${status == "success" ? "text-green-400" : ""}
      ${status == "error" ? "text-red-400" : ""}
      `}
        htmlFor={id}
      >
        <b>{labelText}</b>
      </label>

      <Input
        {...props}
        register={register}
        options={options}
        id={id}
        type={type}
        status={status}
        placeholder={placeholder}
        autoComplete={boolautocomplete}
        required={required}
      />

      {message && (
        <p
          className={`text-base mb-1 mt-1
          ${status == "normal" ? "text-neutral-600" : ""}
          ${status == "success" ? "text-green-400" : ""}
          ${status == "error" ? "text-red-400" : ""}
      `}
        >
          {message}
        </p>
      )}
    </div>
  )
}

export default InputField

InputField.propTypes = {
  id: PropTypes.string,
  labelText: PropTypes.string,
  message: PropTypes.string,
  status: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.bool,
  required: PropTypes.bool,
}

InputField.defaultProps = {
  id: "text",
  labelText: "Label Text",
  message: "Your's message here...",
  status: "normal",
  className: "",
  type: "text",
  placeholder: "Place text here",
  autoComplete: "on",
  required: false,
}
