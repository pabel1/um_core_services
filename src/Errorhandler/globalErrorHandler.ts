import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../interfaces/error'
import ErrorHandler from './errorHandler'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  err.message = err.message || 'Internal Server Error'

  // For logger so that we can catch the error.
  // errorLogger.error(err);

  // Check if headers already sent or not
  if (res.headersSent) {
    return next(
      new ErrorHandler('Error! Headers already sent to the client', 400),
    )
  }

  // Wrong Mongodb Id error
  if (err?.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`
    err = new ErrorHandler(message, 400)
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400)
  }

  // Wrong JWT error
  if (err?.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `
    err = new ErrorHandler(message, 400)
  }

  // JWT EXPIRE error
  if (err?.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `
    err = new ErrorHandler(message, 400)
  }

  const errorMessage: IGenericErrorMessage[] = []

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
    errorMessage,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}

export default globalErrorHandler
