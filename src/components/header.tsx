import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"

import {
  getCurrentUser,
  logout,
  isLoggedIn,
  cVerifyToken,
} from "@utils/auth.ts"

import queryString from "query-string"

import "@components/_site-header.scss"
import "@components/_wrapper.scss"
import "@components/_headline.scss"
import "@components/_primary-nav.scss"

import logo from "../images/logo.svg"

import about from "../images/about-icon.svg"
import blogs from "../images/blogs-icon.svg"
import contact from "../images/contact-icon.svg"

const Header = ({ location }: any) => {
  const [hamBurger, handleHamBurger] = useState(false)
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
    <>
      <header className="site-header">
        <div className="wrapper wrapper--narrow">
          <div className="flex flex--wrap justify-between gap-5 flex--items-center">
            <span className="headline headline--logo">
              <Link to="/?from=header">
                <img
                  className="site-header__logo"
                  src={logo}
                  alt="Taimoor Sattar"
                />
                <span className="site-header__logo-text">Taimoor Sattar</span>
              </Link>
            </span>

            <div
              className={`flex-grow-1 z-index-4 md_pos-r-10 md_pos-t-65 md_position_absolute
              ${!hamBurger ? "md_display_none" : ""}`}
            >
              <nav
                className={
                  "m-0 p-0 primary-nav primary-nav--pull-right" +
                  (!hamBurger ? " primary-nav--vanish" : "")
                }
              >
                <ul>
                  <li>
                    <Link to="/about?from=header">
                      <img src={about} alt="Taimoor Sattar" />
                      <span title={"About"}>About</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/blogs?from=header">
                      <img src={blogs} alt="Taimoor Sattar" />
                      <span title={"Blogs"}>Blogs</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/course?from=header">
                      <img src={blogs} alt="Taimoor Sattar" />
                      <span title={"Course"}>Course</span>
                    </Link>
                  </li>

                  <li>
                    <Link to="/contact?from=header">
                      <img src={contact} alt="Taimoor Sattar" />
                      <span title={"Contact"}>Contact</span>
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {typeof usr?.avatar == "string" ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setToggleAvatar(prevState => !prevState)
                    handleHamBurger(() => false)
                  }}
                  className="w-full"
                >
                  <div className="relative flex items-center justify-center w-10 h-10 m-1 mr-2 text-xl text-white bg-gray-500 rounded-full">
                    <img
                      className="rounded-full"
                      src={usr.avatar}
                      alt="Taimoor Sattar"
                    />
                  </div>
                </button>

                <div
                  className={`${
                    toggleAvatar == false && "hidden"
                  } absolute right-0 z-50 mt-2 origin-top-left bg-white rounded-md shadow-lg w-48`}
                >
                  <div className="px-2 py-2 text-base rounded-md shadow dropdown-gray">
                    <Link
                      className="block px-4 py-2 mt-2 text-gray-900 rounded-lg md:mt-0 hover:dropdown-text-bg"
                      to="/modules"
                    >
                      <span className="mx-1 text-sm sm:text-base">Modules</span>
                    </Link>

                    <Link
                      className="block px-4 py-2 mt-2 text-gray-900 rounded-lg md:mt-0 hover:dropdown-text-bg"
                      to="/settings"
                    >
                      <span className="mx-1 text-sm sm:text-base">
                        Settings
                      </span>
                    </Link>

                    {isLoggedIn() == true && (
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
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/auth">
                <button className="px-4 py-1 font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
                  Login
                </button>
              </Link>
              // <Link to="/auth">
              //   <div className="relative flex items-center justify-center w-10 h-10 m-1 mr-2 text-xl text-white bg-gray-500 rounded-full cursor-pointer">
              //     <img src={"/icons/avatar_person_icon.svg"} alt="Avatar" />
              //   </div>
              // </Link>
            )}

            <div className="flex flex--items-center">
              <div
                onClick={() => {
                  setToggleAvatar(false)
                  handleHamBurger(prevState => !prevState)
                }}
                className={
                  !hamBurger
                    ? "pointer site-header__menu-icon"
                    : "pointer site-header__menu-icon--close-x"
                }
              >
                <div className="site-header__menu-icon__middle"></div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header