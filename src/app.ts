import Koa from "koa"
import { connect } from "./services/db"

import middleware from "./middleware"
import envConfig from "./config/env"
import Router from "./routes"

const start = async (app: Koa, port: Number) => {
  try {
    await connect() // await TypeORM initialize
    app.use(middleware) // register global middleware
    app.use(Router) // register router

    // start app listen
    const conn = app.listen(port, () =>
      console.log(`👻  :Server is now listening at port: ${port} `)
    )

    process.on("SIGINT", () => {
      conn.keepAliveTimeout = 1
      console.log("Closing server...")
      conn.close(() => {
        console.log("Server closed !!!")
        process.exit()
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const App = new Koa()
start(App, envConfig.port)
