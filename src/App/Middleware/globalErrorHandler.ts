/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

import { ZodError } from 'zod'
import ErrorHandler from '../../Errorhandler/errorHandler'
import handleCastError from '../../Errorhandler/handleCastError'
import handleValidationError from '../../Errorhandler/handleValidationError'
import handleZodError from '../../Errorhandler/handleZodError'
import config from '../../config'
import { IGenericErrorMessage } from '../../interfaces/error'
import { errorLogger } from '../shared/logger'
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, { error })
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error)

  let statusCode = 500
  let message = 'Something went wrong !'
  let errorMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  }
  // Check if headers already sent or not
  else if (res.headersSent) {
    // return next(
    //   new ErrorHandler('Error! Headers already sent to the client', 400),
    // )

    ;(message = error?.message
      ? error?.message
      : 'Error! Headers already sent to the client'),
      (errorMessages = error?.message
        ? [
            {
              path: '',
              message: error?.message,
            },
          ]
        : [])
  }

  // Wrong JWT error
  else if (error?.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `
    message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message,
          },
        ]
      : []
  }

  // JWT EXPIRE error
  else if (error?.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `
    message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message,
          },
        ]
      : []
  }
  // Mongoose duplicate key error
  if (error.code === 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`
    message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message,
          },
        ]
      : []
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (error instanceof ErrorHandler) {
    statusCode = error?.statusCode
    message = error.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof mongoose.Error) {
    message = error.message
    errorMessages = error.message ? [{ path: '', message: error.message }] : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
}

export default globalErrorHandler
