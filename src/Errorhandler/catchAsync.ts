import { NextFunction, Request, RequestHandler, Response } from 'express'

const catchAsyncError = (fn: RequestHandler): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default catchAsyncError
