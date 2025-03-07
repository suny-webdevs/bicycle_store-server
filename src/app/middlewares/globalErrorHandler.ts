import { ErrorRequestHandler } from "express"
import { IErrorSources } from "../interface/error"
import config from "../config"
import { ZodError } from "zod"
import handleZodError from "../errors/handleZodError"
import handleCastError from "../errors/handleCastError"
import handleDuplicateError from "../errors/handleDuplicateError"
import AppError from "../errors/AppError"
import handleValidationError from "../errors/handleValidationError"

const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  let statusCode: number = 500
  let message: string = "Something went wrong"
  let errorSources: IErrorSources[] = [
    {
      path: "",
      message,
    },
  ]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode
    message = simplifiedError?.message
    errorSources = simplifiedError.errorSources
  } else if (err?.name === "ValidationError") {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (err?.name === "CastError") {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [{ path: "", message: err?.message }]
  } else if (err instanceof Error) {
    message = err?.message
    errorSources = [{ path: "", message: err?.message }]
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  })
}

export default globalErrorHandler
