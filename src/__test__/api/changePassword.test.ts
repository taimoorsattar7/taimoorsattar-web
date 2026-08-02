import handler from "../../api/changePassword"
import * as sanityActions from "../../lib/sanity/sanityActions"

jest.mock("../../lib/sanity/sanityActions", () => ({
  sanityRequest: jest.fn(),
  sanityUpdate: jest.fn(),
}))

const mockJson = jest.fn().mockReturnThis()
const mockStatus = jest.fn().mockReturnThis()

describe("Change Password API Handler", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Returns 400 when invalid email is provided", async () => {
    const req: any = { body: { email: "invalid-email", prvPassword: "123", newPassword: "123" } }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalledWith(400)
  })

  it("Returns 401 when current password is wrong", async () => {
    ;(sanityActions.sanityRequest as jest.Mock).mockResolvedValue([
      { _id: "cust-1", email: "test@example.com", password: "oldPassword123" }
    ])

    const req: any = {
      body: {
        email: "test@example.com",
        prvPassword: "wrongPassword",
        newPassword: "newPassword123",
      },
    }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalledWith(401)
  })

  it("Returns 200 when password is changed successfully in Sanity", async () => {
    ;(sanityActions.sanityRequest as jest.Mock).mockResolvedValue([
      { _id: "cust-1", email: "test@example.com", password: "oldPassword123" }
    ])
    ;(sanityActions.sanityUpdate as jest.Mock).mockResolvedValue({
      _id: "cust-1",
      _type: "customer",
      password: "newPassword123",
    })

    const req: any = {
      body: {
        email: "test@example.com",
        prvPassword: "oldPassword123",
        newPassword: "newPassword123",
      },
    }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalledWith(200)
    expect(mockJson).toHaveBeenCalledWith({
      is: true,
      message: "success",
    })
  })
})
