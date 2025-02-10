import mongoose from "mongoose"
import { IErrorSources, IGenericErrorResponse } from "../interface/error"

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const statusCode: number = 400
  const errorSources: IErrorSources[] = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      }
    }
  )

  return {
    statusCode,
    message: "Validation error",
    errorSources,
  }
}

export default handleValidationError
