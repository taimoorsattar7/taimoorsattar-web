import Axios, { AxiosResponse } from "axios"
import get_gravatar_image_url from "@lib/get_gravatar_image_url"

const isBrowser = typeof window !== `undefined`

export const getUser: any = () => {
  if (!isBrowser) return {}
  try {
    return window.localStorage.gatsbyUser
      ? JSON.parse(window.localStorage.gatsbyUser)
      : {}
  } catch (e) {
    return {}
  }
}

export const setUser: any = (user: any) => {
  if (!isBrowser) return user
  window.localStorage.gatsbyUser = JSON.stringify(user)
  return user
}

export const handleLogin: any = async ({ email, password }: any) => {
  if (!isBrowser) return false

  try {
    const { data }: AxiosResponse<any> = await Axios.post(`/api/login`, {
      email: email,
      password: password,
    })

    if (data.message === "success" && data.token) {
      return setUser({
        email: data.email,
        name: data.name || "Student",
        avatar: "/profile-pic.jpg",
        token: data.token,
      })
    }
  } catch (error: any) {
    console.warn("Login failed:", error?.response?.data || error?.message)
  }

  return false
}

export const isLoggedIn: any = () => {
  if (!isBrowser) return false
  const user = getUser()
  return Boolean(user && user.email)
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
  if (!isBrowser) return false
  try {
    const { data }: AxiosResponse<any> = await Axios.post(`/api/verifyToken`, {
      token: token,
    })

    if (data.email) {
      return setUser({
        email: data.email,
        name: data.name || "Student",
        avatar: "/profile-pic.jpg",
        token: data.token || token,
      })
    }
  } catch (error) {
    console.warn("Verify token failed:", error)
  }
  return false
}
