"use client"

import * as React from "react"
import PropTypes from "prop-types"
import {
  SendIcon,
  DotIcon,
  ArrowUp,
  GraduationCap,
  LucideSparkles,
  ArrowUpRightSquareIcon,
  KeySquareIcon,
  PowerIcon,
  FeatherIcon,
  WalletIcon,
  PinIcon,
  CopyXIcon,
  WalletCards,
  BackpackIcon,
  LockIcon,
} from "lucide-react"

// import SendIcon from "../../images/icons/send-white-icon.png"

const Icons = ({ iconName, className }: any) => {
  switch (iconName) {
    case "lock":
      return <LockIcon className={className} />
    case "backpack":
      return <BackpackIcon className={className} />
    case "walletcards":
      return <WalletCards className={className} />
    case "copyx":
      return <CopyXIcon className={className} />
    case "pin":
      return <PinIcon className={className} />
    case "wallet":
      return <WalletIcon className={className} />
    case "keysquare":
      return <KeySquareIcon className={className} />
    case "feather":
      return <FeatherIcon className={className} />
    case "send":
      return <SendIcon className={className} />
    case "power":
      return <PowerIcon className={className} />
    case "sparkle":
      return <LucideSparkles className={className} />
    case "arrowup":
      return <ArrowUp className={className} />
    case "graduationcap":
      return <GraduationCap className={className} />
    case "arrowuprightsquare":
      return <ArrowUpRightSquareIcon className={className} />
    default:
      return <DotIcon className={className} />
  }
}

const Button: any = (props: any) => {
  const {
    id,
    type,
    btnSize,
    btnTheme,
    textValue,
    onClickHandler,
    disabled,
    className,
    iconLeft,
    iconRight,
  } = props

  function getButtonClasses() {
    const baseClasses = "inline-flex items-center justify-center font-bold transition-all duration-200 rounded-2xl cursor-pointer"
    
    let sizeClasses = "py-2.5 px-4 gap-2 text-xs"
    if (btnSize === "med") {
      sizeClasses = "py-3 px-5 gap-2.5 text-sm"
    } else if (btnSize === "large") {
      sizeClasses = "py-3.5 px-6 gap-3 text-base shadow-lg"
    }

    let themeClasses = "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
    if (btnTheme === "outline") {
      themeClasses = "border border-zinc-200 dark:border-zinc-700/80 bg-transparent text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
    } else if (btnTheme === "indigo" || btnTheme === "teal") {
      themeClasses = "bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-teal-500/20 hover:opacity-95 shadow-md"
    }

    return `${baseClasses} ${sizeClasses} ${themeClasses}`
  }

  const isLightTextTheme = btnTheme === "indigo" || btnTheme === "teal" || (btnTheme === "filled")

  return (
    <button
      id={id ? id : ""}
      type={type || "button"}
      onClick={event => onClickHandler?.(event)}
      disabled={disabled}
      className={`${className || ""} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      } ${getButtonClasses()}`}
    >
      {iconLeft && (
        <Icons
          iconName={iconLeft}
          className={`shrink-0 ${btnSize === "large" ? "w-5 h-5" : "w-4 h-4"} ${
            btnTheme === "outline" ? "text-zinc-900 dark:text-zinc-100" : "text-current"
          }`}
        />
      )}

      <span>{textValue}</span>

      {iconRight && (
        <Icons
          iconName={iconRight}
          className={`shrink-0 ${btnSize === "large" ? "w-5 h-5" : "w-4 h-4"} ${
            btnTheme === "outline" ? "text-zinc-900 dark:text-zinc-100" : "text-current"
          }`}
        />
      )}
    </button>
  )
}

export default Button

Button.propTypes = {
  type: PropTypes.string,
  textValue: PropTypes.string,
  btnSize: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  onClickHandler: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  type: "button",
  textValue: "Text here",
  btnSize: "sml",
  iconLeft: "",
  iconRight: "",
  onClickHandler: () => {
    console.log("No Click")
  },
  disabled: false,
  className: "",
}
