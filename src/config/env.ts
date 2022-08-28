import dotenv from "dotenv"
import path from "path"

let { parsed = {} } = dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
})

// console.log(parsed)

export default {
  // DB super admin
  /**
   * username (default admin)
   * name (default admin)
   * password(will be encrypted default admin)
   * phone(type is number,default to 0)
   */

  // server
  serviceUrl: parsed["SERVICE_URL"],
  port: Number(parsed["PORT"]),

  // mongodb
  databaseAddress: parsed["DATABASE_ADDRESS"],
}
