import { IGenericErrorMessage } from './error'

// ?generic response
export type IGenericResponse<T> = {
  meta: {
    page?: number
    limit?: number
    total?: number
  }
  data: T
}

// !generic error response
export type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
