import { Context, Next } from "koa"
import chalk from "chalk"

/** global log, describe request status/method/path/time  */
export default async function Logger(ctx: Context, next: Next) {
  const start = Date.now()
  await next()
  const timeCost = (Date.now() - start) / 1000 + "s"
  let { status, method, url } = ctx
  console.log(
    `[${
      status < 300
        ? chalk.green(status.toString())
        : chalk.red(status.toString())
    }] [${chalk.yellow(method)}] ${chalk.cyan(url)} (${chalk.gray(timeCost)})`
  )
}
