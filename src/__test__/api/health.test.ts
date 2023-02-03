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
      const req: any = {
        body: mockJson,
      }

      const res: any = {
        send: mockSend,
        // body: mockJson,
        status: mockStatus,
      }

      handler(req, res)
      expect(mockStatus.mock.calls[0][0]).toBe(200)
    })
  })
})
