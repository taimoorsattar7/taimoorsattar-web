import handler from "../../api/login"
import * as sanityActions from "../../lib/sanity/sanityActions"

jest.mock("../../lib/sanity/sanityActions", () => ({
  sanityRequest: jest.fn(),
}))

const mockJson = jest.fn().mockReturnThis()
const mockStatus = jest.fn().mockReturnThis()

describe("Login API Handler", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Returns 400 when email or password is missing", async () => {
    const req: any = { body: { email: "" } }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalledWith(400)
  })

  it("Returns 401 when invalid password is provided", async () => {
    ;(sanityActions.sanityRequest as jest.Mock).mockResolvedValue([
      { _id: "cust-1", email: "taimoorsattar7@gmail.com", password: "correct-password", name: "Taimoor" }
    ])

    const req: any = {
      body: {
        email: "taimoorsattar7@gmail.com",
        password: "wrong-password",
      },
    }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalledWith(401)
  })

  it("Returns 200 and JWT token when valid credentials are provided", async () => {
    ;(sanityActions.sanityRequest as jest.Mock).mockResolvedValue([
      { _id: "cust-1", email: "taimoorsattar7@gmail.com", password: "valid-password", name: "Taimoor Sattar" }
    ])

    const req: any = {
      body: {
        email: "taimoorsattar7@gmail.com",
        password: "valid-password",
      },
    }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalledWith(200)
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "success",
        token: expect.any(String),
        email: "taimoorsattar7@gmail.com",
      })
    )
  })
})
