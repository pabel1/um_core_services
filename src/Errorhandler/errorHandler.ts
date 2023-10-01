class ErrorHandler extends Error {
  statusCode: number
  stack: string | undefined

  constructor(message: string, statusCode: number, stack: string = '') {
    super(message)
    this.statusCode = statusCode
    if (stack) {
      this.stack = stack
    } else {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export default ErrorHandler
