import { Context, Next } from "koa"
import { z } from "zod"
import { ValidateError } from "../config/errorMsg/_general"

const A = z.object({})

/**  Route data Validate,acrroding to the schemas in Validations directory  */
export default function Validate(schema: typeof A) {
  return async (ctx: Context, next: Next) => {
    let parseInfo
    if (ctx.method == "POST") {
      parseInfo = ctx.request.body
    } else if (ctx.method == "GET") {
      parseInfo = ctx.request.query
    }
    console.log(parseInfo, ctx.method)
    let data = schema.safeParse(parseInfo)
    if (data.success) {
      await next()
    } else {
      let zodError = data.error
      let err: any = new Error(`Validate Fail: ${zodError?.message}`)
      err.code = ValidateError.code
      throw err
    }
  }
}
