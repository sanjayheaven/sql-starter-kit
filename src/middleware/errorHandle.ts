import { Context, Next } from "koa"

/** global error handle */
export default async function ErrorHandle(ctx: Context, next: Next) {
  try {
    process.on("unhandledRejection", function (err, promise) {
      console.log("/error")
      console.log("UnhandledPromiseRejectionWarning will make node break down")
    })
    await next()
  } catch (error: any) {
    let { code, message, status, name } = error
    console.log(error)
    console.log(code, message, name, "error code msg")
    ctx.status = status || 500 // typeorm error code will be
    let payload = { code, message: error?.message || "Internal Server Error" }
    ctx.body = payload
  }
}
