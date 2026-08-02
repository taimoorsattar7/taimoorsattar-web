import Axios, { AxiosResponse } from "axios"

const isBrowser = typeof window !== `undefined`

export const getInitialsAvatar = (email?: string, name?: string, providedAvatar?: string) => {
  if (providedAvatar && typeof providedAvatar === "string" && providedAvatar.length > 0 && providedAvatar !== "/profile-pic.jpg") {
    return providedAvatar
  }

  const displayName = name || (email ? email.split("@")[0] : "Student")
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0d9488&color=ffffff&bold=true&size=128`
}

export const getUser: any = () => {
  if (!isBrowser) return {}
  try {
    const user = window.localStorage.gatsbyUser
      ? JSON.parse(window.localStorage.gatsbyUser)
      : {}

    if (user && user.email) {
      user.avatar = getInitialsAvatar(user.email, user.name, user.avatar)
    }

    return user
  } catch (e) {
    return {}
  }
}

export const setUser: any = (user: any) => {
  if (!isBrowser) return user
  if (user && user.email) {
    user.avatar = getInitialsAvatar(user.email, user.name, user.avatar)
  }
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
        avatar: getInitialsAvatar(data.email, data.name, data.avatar),
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
        avatar: getInitialsAvatar(data.email, data.name, data.avatar),
        token: data.token || token,
      })
    }
  } catch (error) {
    console.warn("Verify token failed:", error)
  }
  return false
}
