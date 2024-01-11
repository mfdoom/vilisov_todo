import express from "express"

import {
  getTodos,
  deletetodo,
  createTodo,
  updateTodo,
} from "../controllers/todoControllers.js"

const router = express.Router()

router.route("/").get(getTodos).post(createTodo)

router.route("/:id").delete(deletetodo).put(updateTodo)

export default router
