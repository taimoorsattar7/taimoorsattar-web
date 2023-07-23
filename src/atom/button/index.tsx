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
} from "lucide-react"

// import SendIcon from "../../images/icons/send-white-icon.png"

const Icons = ({ iconName, className }: any) => {
  switch (iconName) {
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
    const buttonClasses = [
      "flex flex-row rounded cursor-pointer justify-center items-center",
      `${
        btnSize == "sml"
          ? "py-1 px-2 gap-1 text-base shadow-[0px_2px_4px_rgba(111,_111,_111,_0.25)]"
          : ""
      }
      ${
        btnSize == "med"
          ? "py-2 px-3 gap-2 text-xl shadow-[0px_4px_8px_rgba(111,_111,_111,_0.25)]"
          : ""
      }
      ${
        btnSize == "large"
          ? "py-3 px-4 gap-3 text-2xl shadow-[0px_6px_12px_rgba(111,_111,_111,_0.25)]"
          : ""
      }
      `,
      `
        ${btnTheme == "filled" ? "bg-black text-white items-center" : ""}
        ${
          btnTheme == "outline"
            ? "bg-none text-white border-2 border-slate-900"
            : ""
        }
        ${btnTheme == "indigo" ? "bg-indigo-400 text-white items-center" : ""}
      `,
    ]

    return buttonClasses.join(" ")
  }

  return (
    <button
      type={type}
      onClick={event => onClickHandler(event)}
      disabled={disabled}
      className={`${className} ${" "} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }  ${getButtonClasses()}`}
    >
      {iconLeft && (
        <Icons
          iconName={iconLeft}
          className={`
            h-auto ${" "}
            ${btnTheme == "filled" ? "text-white" : ""}
            ${btnTheme == "outline" ? "text-neutral-900" : ""}
            ${btnTheme == "indigo" ? "text-neutral-900" : ""}
            ${btnSize == "sml" ? "w-4" : ""}
            ${btnSize == "med" ? "w-5" : ""}
            ${btnSize == "large" ? "w-6" : ""}
          `}
        />
      )}

      <div
        className={`
        ${btnTheme == "filled" ? "text-white" : ""}
        ${btnTheme == "outline" ? "text-neutral-900" : ""}
        ${btnTheme == "indigo" ? "text-neutral-900" : ""}
        ${btnSize == "sml" ? "text-sm" : ""}
        ${btnSize == "med" ? "text-base" : ""}
        ${btnSize == "large" ? "text-lg" : ""}
      `}
      >
        <b>{textValue}</b>
      </div>

      {/* {isRightIcon && ( */}

      {iconRight && (
        <Icons
          iconName={iconRight}
          className={`
            h-auto ${" "}
            ${btnTheme == "filled" ? "text-white" : ""}
            ${btnTheme == "outline" ? "text-neutral-900" : ""}
            ${btnTheme == "indigo" ? "text-neutral-900" : ""}
            ${btnSize == "sml" ? "w-4" : ""}
            ${btnSize == "med" ? "w-5" : ""}
            ${btnSize == "large" ? "w-6" : ""}
          `}
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
