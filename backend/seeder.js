import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"

import Todos from "./data/todos.js"

import Todo from "./models/todoModel.js"

import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Todo.deleteMany()

    const sampleTodos = Todos.map((todo) => {
      console.log(todo)
      return { ...todo }
    })

    await Todo.insertMany(sampleTodos)

    console.log("Imported ok".green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

importData()
