import { IErrorMsg } from "../types"
import httpStatus from "http-status"

export default function throwError({
  code,
  msg,
  status = httpStatus.BAD_REQUEST,
}: IErrorMsg) {
  let err: any = new Error(msg)
  err.code = code
  err.status = status
  throw err
}
