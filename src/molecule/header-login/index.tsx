"use client"

import React, { useState, useEffect } from "react"
// import logo from "../images/logo.svg"
import { Link, navigate } from "gatsby"
import queryString from "query-string"
import Button from "@atom/button/index"

import logo from "../../images/logo.svg"

import { MenuIcon } from "lucide-react"

import {
  getCurrentUser,
  logout,
  isLoggedIn,
  cVerifyToken,
} from "@utils/auth"
// import PropTypes from "prop-types"

// import Input from "@atom/input/index"

const HeaderLogin = ({ onClickSideMenuHandler }: any) => {
  //   const [clkAvatar, handleClkAvatar] = useState(false)
  //   const [hamBurger, handleHamBurger] = useState(false)
  const [toggleAvatar, setToggleAvatar] = useState(false)
  const [usr, setUsr] = useState<any>(null)

  function handleLogout() {
    logout(navigate("/auth"))
  }

  useEffect(() => {
    setUsr(getCurrentUser())

    const queriedTheme = queryString.parse(location.search)

    if (queriedTheme.token) {
      checkToken(queriedTheme.token)
    }
  }, [])

  async function checkToken(token: any) {
    await cVerifyToken(token)
    setUsr(getCurrentUser())
  }

  return (
    <nav className="fixed bg-indigo-50 top-0 z-50 w-full border-b-4 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={event => {
                onClickSideMenuHandler(event)
              }}
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="cursor-pointer inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-6 h-6" />
            </button>

            <Link className="flex ml-2 md:mr-24" to="/modules">
              <img className="h-8 mr-3" src={logo} alt="Taimoor Sattar" />
              {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Taimoor Sattar
              </span> */}
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ml-3">
              {isLoggedIn() == true ? (
                <div className="relative">
                  <div
                    onClick={() => {
                      setToggleAvatar(prevState => !prevState)
                    }}
                    className="w-full"
                  >
                    <div className="relative flex items-center justify-center w-10 h-10 m-1 mr-2 text-xl text-white bg-gray-500 rounded-full">
                      <img
                        className="rounded-full"
                        src={usr?.avatar}
                        alt="Taimoor Sattar"
                      />
                    </div>
                  </div>

                  <div
                    className={`${
                      toggleAvatar == false && "hidden"
                    } absolute right-0 z-50 mt-2 origin-top-left bg-white rounded-md shadow-lg w-48`}
                  >
                    <div className="px-2 py-2 text-base rounded-md shadow dropdown-gray">
                      <Link
                        className="block px-4 py-2 mt-2 text-gray-900 rounded-lg md:mt-0 hover:dropdown-text-bg"
                        to="/contact"
                      >
                        <span className="mx-1 text-sm sm:text-base">
                          contact
                        </span>
                      </Link>

                      <Link
                        className="block px-4 py-2 mt-2 text-gray-900 rounded-lg md:mt-0 hover:dropdown-text-bg"
                        to="/modules"
                      >
                        <span className="mx-1 text-sm sm:text-base">
                          Modules
                        </span>
                      </Link>

                      <Link
                        className="block px-4 py-2 mt-2 text-gray-900 rounded-lg md:mt-0 hover:dropdown-text-bg"
                        to="/settings"
                      >
                        <span className="mx-1 text-sm sm:text-base">
                          Settings
                        </span>
                      </Link>

                      <span
                        className="block px-4 py-2 mt-2 text-gray-900 rounded-lg pointer md:mt-0 hover:dropdown-text-bg"
                        onClick={() => {
                          handleLogout()
                        }}
                      >
                        <span className="mx-1 text-sm sm:text-base">
                          Logout
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <Link className="no-underline" to="/auth">
                  <Button
                    btnSize="med"
                    btnTheme="filled"
                    iconRight={"keysquare"}
                    textValue="Login"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HeaderLogin

// HeaderLogin.propTypes = {
//   id: PropTypes.string,
//   labelText: PropTypes.string,
//   message: PropTypes.string,
//   status: PropTypes.string,
//   className: PropTypes.string,
//   type: PropTypes.string,
//   placeholder: PropTypes.string,
//   autoComplete: PropTypes.bool,
//   required: PropTypes.bool,
// }

// HeaderLogin.defaultProps = {
//   id: "text",
//   labelText: "Label Text",
//   message: "Your's message here...",
//   status: "normal",
//   className: "",
//   type: "text",
//   placeholder: "Place text here",
//   autoComplete: "on",
//   required: false,
// }
