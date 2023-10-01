import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import globalErrorHandler from './App/Middleware/globalErrorHandler'
import router from './App/routes'
const app: Application = express()

app.use(cors())
app.use(express.json({ limit: '100mb' }))
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: '100mb' }))

// define routes
app.use('/api/v1', router)

//global error handler
app.use(globalErrorHandler)

// not found Route Defined
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: ' Not Found!!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: `${req.originalUrl}-This Route Not Found!!`,
      },
    ],
  })
  next()
})

export default app
