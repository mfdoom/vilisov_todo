import connectDb from "./config/db.js"
import dotenv from "dotenv"
import express from "express"

import todoRoutes from "./routes/todoRoutes.js"

dotenv.config()

connectDb()

const PORT = process.env.PORT || 5050

const app = express()

app.use(express.json())

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  )

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Auth-Token"
  )

  res.setHeader("Access-Control-Allow-Credentials", true)

  next()
})

app.use("/api/todos", todoRoutes)

app.listen(
  PORT,
  console.log(
    `server is running on ${process.env.NODE_ENV} at ${process.env.PORT} port`
  )
)

app.get("/", (req, res) => {
  res.send("API is running...")
})
