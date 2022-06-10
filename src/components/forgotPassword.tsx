import React from "react"

const ForgetPassword = () => {
  return (
    <>
      <div className="flex justify-center min-h-screen antialiased bg-gray-100">
        <div className="container max-w-md p-3 my-auto mt-24 bg-white border-2 border-gray-200 sm:mt-40">
          <div className="m-6 text-center">
            <h1 className="text-3xl font-semibold text-gray-700">
              Forgot your password?
            </h1>
            <p className="text-gray-500">
              Just enter your email address below and we'll send you a link to
              reset your password!
            </p>
          </div>
          <div className="m-6">
            <form className="mb-4">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email address"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <button
                  type="button"
                  className="w-full px-3 py-4 text-white duration-100 ease-in-out bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
                >
                  Send reset link
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?
                <a
                  href="#!"
                  className="font-semibold text-indigo-500 focus:text-indigo-600 focus:outline-none focus:underline"
                >
                  Sign up
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
