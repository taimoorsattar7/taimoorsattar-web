import React from "react"
import PropTypes from "prop-types"
import Input from "@atom/input/index"

const InputField: any = ({
  labelText,
  register,
  id,
  message,
  status = "normal",
  className = "",
  type,
  placeholder,
  boolautocomplete,
  required,
  options,
  ...props
}: any) => {
  const labelColor =
    status === "success"
      ? "text-emerald-500"
      : status === "error"
      ? "text-red-500"
      : "text-slate-700 dark:text-slate-300"

  return (
    <div className={`mb-4 ${className}`}>
      {labelText && (
        <label
          className={`block text-sm font-medium mb-1.5 ${labelColor}`}
          htmlFor={id}
        >
          {labelText} {required && <span className="text-red-500">*</span>}
        </label>
      )}

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
        aria-describedby={message ? `${id}-message` : undefined}
      />

      {message && (
        <p id={`${id}-message`} className={`text-xs mt-1 ${labelColor}`}>
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
  autoComplete: PropTypes.string,
  required: PropTypes.bool,
}

InputField.defaultProps = {
  id: "text",
  labelText: "Label Text",
  message: "",
  status: "normal",
  className: "",
  type: "text",
  placeholder: "",
  autoComplete: "on",
  required: false,
}
