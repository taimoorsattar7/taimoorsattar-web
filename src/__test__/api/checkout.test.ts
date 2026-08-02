import handler from "../../api/checkout"
import * as stripeCheckout from "../../lib/stripe/checkout"

jest.mock("../../lib/stripe/checkout", () => ({
  createSession: jest.fn(),
  retrieveSession: jest.fn(),
}))

const mockJson = jest.fn().mockReturnThis()
const mockStatus = jest.fn().mockReturnThis()

describe("Checkout API Handler", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Returns error when required fields are missing", async () => {
    const req: any = {
      method: "POST",
      body: {
        email: "test@example.com",
      },
    }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockStatus).toHaveBeenCalled()
    const statusCode = mockStatus.mock.calls[0][0]
    expect(statusCode).toBeGreaterThanOrEqual(400)
  })

  it("Returns session URL when valid checkout session request is submitted", async () => {
    ;(stripeCheckout.createSession as jest.Mock).mockResolvedValue({
      url: "https://checkout.stripe.com/c/pay/cs_test_12345",
    })

    const req: any = {
      method: "POST",
      body: {
        email: "test@example.com",
        name: "Test Student",
        priceId: "price_123",
        mode: "subscription",
        successUrl: "https://taimoorsattar.dev/settings",
        cancelUrl: "https://taimoorsattar.dev/settings",
      },
    }
    const res: any = { json: mockJson, status: mockStatus }

    await handler(req, res)
    expect(mockJson).toHaveBeenCalledWith({
      url: "https://checkout.stripe.com/c/pay/cs_test_12345",
    })
  })
})
