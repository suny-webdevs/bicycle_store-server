import { Response } from "express"
import httpStatus from "http-status"

const sendResponse = <T>(res: Response, message: string, data: T) => {
  return res.status(httpStatus.OK).json({
    success: true,
    message: `${message}`,
    data: data,
  })
}

export default sendResponse
