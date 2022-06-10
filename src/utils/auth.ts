import Axios, { AxiosResponse } from "axios"

// import { useQuery } from "react-query"

import get_gravatar_image_url from "@lib/get_gravatar_image_url"

const isBrowser = typeof window !== `undefined`

const getUser: any = () => {
  return window.localStorage.gatsbyUser
    ? JSON.parse(window.localStorage.gatsbyUser)
    : {}
}

const setUser: any = (user: any) =>
  (window.localStorage.gatsbyUser = JSON.stringify(user))

export const handleLogin: any = async ({ email, password }: any) => {
  if (!isBrowser) return false

  let { data }: AxiosResponse<any> = await Axios.post(`/api/login`, {
    email: email,
    password: password,
  })

  if (data.message == "success") {
    return setUser({
      email: data.email,
      avatar: get_gravatar_image_url(data.email, 120, "mm", "g", "y"),
      token: data.token,
    })
  }

  return false
}

export const isLoggedIn: any = () => {
  if (!isBrowser) return "false"
  const user = getUser()

  return !!user.email
}

export const getCurrentUser: any = () => isBrowser && getUser()

export const logout: any = (callback: any) => {
  if (!isBrowser) return
  setUser({})
  if (callback) {
    callback()
  }
}

export const cVerifyToken: any = async (token: any) => {
  if (!isBrowser) return "false"
  let { data }: AxiosResponse<any> = await Axios.post(`/api/verifyToken`, {
    token: token,
  })

  return setUser({
    email: data.email,
    avatar: get_gravatar_image_url(data.email, 120, "mm", "g", "y"),
    token: data.token,
  })
}
