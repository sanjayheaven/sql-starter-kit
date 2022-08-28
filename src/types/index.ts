/** same table pagination */
export type IPagination = { pageSize?: number; current?: number }

/**  Error Msg */
export type IErrorMsg = {
  // response code,defined in err messsage config
  code: number
  // response error msg
  msg: string
  /** http status default httpStatus.BAD_REQUEST */
  status?: number
}

/** DB sort  */
export enum Sort {
  ASC = "ASC",
  DESC = "DESC",
}
