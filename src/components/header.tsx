import React, { useState, useEffect, Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Container } from "@components/Container"
import queryString from "query-string"

import { Link, navigate } from "gatsby"
import { getCurrentUser, logout, cVerifyToken } from "@utils/auth"
import logo from "../images/logo.svg"

import Button from "@atom/button/index"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Header({ location }: any) {
  const [usr, setUsr] = useState<any>(null)

  function handleLogout() {
    logout(navigate("/auth"))
  }

  const navigation = [
    {
      name: "About",
      href: "/about",
      current: location?.pathname?.includes("about") ? true : false,
    },
    {
      name: "Blogs",
      href: "/blogs",
      current: location?.pathname?.includes("blogs") ? true : false,
    },
    {
      name: "Course",
      href: "/course",
      current: location?.pathname?.includes("course") ? true : false,
    },
    {
      name: "Contact",
      href: "/contact",
      current: location?.pathname?.includes("contact") ? true : false,
    },
  ]

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
    <Disclosure as="nav" className="bg-slate-700">
      {({ open }: any) => (
        <Container>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={"/"}>
                    <img
                      className="h-7 w-auto"
                      src={logo}
                      alt="Taimoor Sattar"
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? " text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {typeof usr?.avatar == "string" ? (
                <>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="cursor-pointer relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={usr.avatar}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/modules"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Modules
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                onClick={() => {
                                  handleLogout()
                                }}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Sign out
                              </span>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </>
              ) : (
                <Link to="/auth">
                  <Button
                    textValue="Login to the course"
                    iconRight="LockIcon"
                    btnSize="sml"
                    btnTheme="outline"
                  />
                </Link>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map(item => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </Container>
      )}
    </Disclosure>
  )
}
