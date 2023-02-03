import handler from "../../api/login"

// import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"
const mockJson = jest.fn().mockReturnThis().mockName("loginReturnJson")
const mockStatus = jest.fn().mockReturnThis().mockName("loginReturnStatus")

const mockConsoleWarn = jest.fn()
jest.spyOn(global.console, "warn").mockImplementation(mockConsoleWarn)

describe("API", () => {
  describe("check health", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it("Test login function", async () => {
      const req: any = {
        body: {
          email: "taimoorsattar7@gmail.com",
          password: "qwety",
        },
      }

      const res: any = {
        json: mockJson,
        status: mockStatus,
      }

      await handler(req, res)
      // console.log("json", mockJson.mock.results[0].value)
      // console.log("status ---", mockStatus.mock.calls[0][0])

      expect(mockStatus.mock.calls[0][0]).toBe(200)
    })
  })
})
