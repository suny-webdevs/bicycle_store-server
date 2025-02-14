import Shurjopay, { PaymentResponse, VerificationResponse } from "shurjopay"
import config from "../config"

const shurjopay = new Shurjopay()

shurjopay.config(
  config.spEndpoint!,
  config.spUsername!,
  config.spPassword!,
  config.spPrefix!,
  config.spReturnUrl!
)

const makePaymentAsync = async (
  paymentPayload: any
): Promise<PaymentResponse> => {
  return new Promise((resolve, reject) => {
    shurjopay.makePayment(
      paymentPayload,
      (response) => resolve(response),
      (error) => reject(error)
    )
  })
}

const verifyPaymentAsync = (
  order_id: string
): Promise<VerificationResponse[]> => {
  return new Promise((resolve, reject) => {
    shurjopay.verifyPayment(
      order_id,
      (response) => resolve(response),
      (error) => reject(error)
    )
  })
}

export const paymentSystem = {
  makePaymentAsync,
  verifyPaymentAsync,
}
