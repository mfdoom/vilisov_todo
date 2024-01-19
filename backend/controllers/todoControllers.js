import Todo from "../models/todoModel.js"
let conc = 0
const getTodos = async (req, res) => {
  try {
    conc++
    console.log(c)
    const todos = await Todo.find({})
    res.status(200).json({ todos })
  } catch (error) {
    console.log(error)
  }
}

const deletetodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)
    if (todo) {
      await todo.remove()
      res.status(204).json({ message: "Todo удален" })
    } else {
      res.status(404)
      throw new Error("Todo не найдено")
    }
  } catch (error) {
    console.log(error)
  }
}

const createTodo = async (req, res) => {
  const { description, title, status } = req.body.todo
  try {
    const todo = new Todo({
      description,
      title,
    })
    const createdTodo = await todo.save()
    res.status(201).json(createdTodo)
  } catch (error) {
    console.log(error)
  }
}

const updateTodo = async (req, res) => {
  const todo = await Todo.findById(req.params.id)
  const { description, status, title } = req.body
  try {
    if (todo) {
      todo.description = description
      todo.status = status
      todo.title = title
      const updatedTodo = await todo.save()
      res.status(200).json({ message: "Todo обновлен" })
    } else {
      res.status(404)
      throw new Error("не найдено")
    }
  } catch (error) {
    console.log(error)
  }
}

export { getTodos, deletetodo, createTodo, updateTodo }
