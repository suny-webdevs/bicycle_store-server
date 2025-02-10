import { RequestHandler } from "express"
import httpStatus from "http-status"

const notFound: RequestHandler = (_req, res, _next) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
  })
}

export default notFound
