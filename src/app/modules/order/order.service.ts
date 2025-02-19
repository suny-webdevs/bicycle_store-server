import { TOrder, TProductsPayload } from "./order.type"
import { TUser } from "../user/user.type"
import { Order } from "./order.model"
import { paymentSystem } from "../../utils/payment"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../user/user.model"
import AppError from "../../errors/AppError"
import httpStatus from "http-status"
import { Bicycle } from "../bicycle/bicycle.model"

const createOrderIntoDB = async (
  user: JwtPayload,
  payload: TProductsPayload,
  client_ip: string
) => {
  const orderData: Partial<TOrder> = {}

  if (!payload?.products.length) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product not found for order")
  }

  const userData = (await User.findOne({ email: user?.email })) as TUser

  const products = payload.products

  let totalPrice = 0
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Bicycle.findById(item.productId)
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0
        totalPrice += subtotal
        return {
          productId: item.productId,
          quantity: item.quantity,
        }
      }
    })
  )

  const filteredProductDetails = productDetails.filter(
    (detail) => detail !== undefined
  )

  orderData.customerId = userData._id
  orderData.products = filteredProductDetails
  orderData.totalPrice = totalPrice
  orderData.status = "Pending"

  const data = await Order.create(orderData)

  if (userData?.address === "") {
    throw new AppError(httpStatus.CONFLICT, "Please input address")
  }
  if (userData?.city === "") {
    throw new AppError(httpStatus.CONFLICT, "Please input city")
  }

  const shurjopayPayload = {
    amount: totalPrice,
    order_id: data?._id,
    currency: "BDT",
    customer_name: userData?.name,
    customer_address: userData?.address,
    customer_email: userData?.email,
    customer_phone: userData?.phone,
    customer_city: userData?.city,
    client_ip,
  }

  const payment = await paymentSystem.makePaymentAsync(shurjopayPayload)

  if (payment?.transactionStatus) {
    await Order.findByIdAndUpdate(
      { _id: payment?.customer_order_id },
      {
        "transaction.id": payment?.sp_order_id,
        "transaction.transactionStatus": payment?.transactionStatus,
      }
    )
  }

  return { checkout: payment?.checkout_url }
}

const getAllOrders = async () => {
  const data = await Order.find()
  return data
}

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await paymentSystem.verifyPaymentAsync(order_id)

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    )
  }

  return verifiedPayment
}

export const OrderServices = { createOrderIntoDB, getAllOrders, verifyPayment }
