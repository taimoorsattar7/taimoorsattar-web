import handler from "../../api/status"
// import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby"

const mockSend = jest.fn()
const mockJson = jest.fn()
const mockStatus = jest.fn().mockReturnThis()

const mockConsoleWarn = jest.fn()
jest.spyOn(global.console, "warn").mockImplementation(mockConsoleWarn)

describe("API", () => {
  describe("check health", () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it("Check the website status", async () => {
      // expect(2 + 2).toBe(4)

      const req = {
        body: mockJson,
      }

      const res = {
        send: mockSend,
      }

      handler(req, res)

      expect(mockSend).toBe(200)
    })
  })
})
