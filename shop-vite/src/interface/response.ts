export interface ResponseError<T> extends ResponseData<T> {
  time: Date
  success: boolean
  path: string
}

export interface ResponseData<T> {
  status: Number
  data: T
  msg: string
}
