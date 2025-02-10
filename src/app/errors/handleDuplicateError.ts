import { IErrorSources, IGenericErrorResponse } from "../interface/error"

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const statusCode = 400

  const match = err.message.match(/"([^"]*)"/)
  const extractedMessage = match && match[1]

  const errorSources: IErrorSources[] = [
    { path: "", message: `${extractedMessage} is already exist` },
  ]

  return {
    statusCode,
    message: "Data Existing Error",
    errorSources,
  }
}

export default handleDuplicateError
