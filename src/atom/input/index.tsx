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
  const borderClass =
    status === "error"
      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
      : status === "success"
      ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/20"
      : "border-slate-300 dark:border-slate-700/80 focus:border-indigo-500 focus:ring-indigo-500/20"

  return (
    <input
      id={id}
      {...(register ? register(id, options ? options : {}) : {})}
      {...props}
      className={`block w-full rounded-xl bg-slate-50 dark:bg-slate-900 border ${borderClass} px-4 py-2.5 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 text-sm font-medium transition-all`}
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
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
}

Input.defaultProps = {
  id: "text",
  type: "text",
  placeholder: "Place text here",
  autoComplete: "on",
  required: false,
}
