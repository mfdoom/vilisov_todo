import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import React from "react"
import { Container } from "react-bootstrap"
import Table from "react-bootstrap/Table"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  listTODOS,
  deleteTodo,
  createTodo,
  updateTodo,
} from "../actions/todoActions"

const TableComp = () => {
  const dispatch = useDispatch()
  const listReducer = useSelector((state) => state.todos)

  const { todos } = listReducer
  const [stateTodos, setStateTodos] = useState([])
  const [modeUpdate, setModeUpdate] = useState(false)
  const [todo, setTodo] = useState({ title: "", description: "", status: "" })

  const submitHandler = (e) => {
    if (todo.title.trim().length > 0 && todo.description.trim().length > 0) {
      dispatch(createTodo({ todo })).then(() => {
        dispatch(listTODOS())
        setTodo({ title: "", description: "", status: "" })
      })
    }
  }

  const updateTodoHandler = (e) => {
    if (todo.title.trim().length > 0 && todo.description.trim().length > 0) {
      dispatch(updateTodo({ todo })).then(() => {
        dispatch(listTODOS())
        setModeUpdate(false)
        setTodo({ title: "", description: "", status: "" })
      })
    }
  }

  const deleteHandler = (id) => {
    if (window.confirm()) {
      dispatch(deleteTodo(id))
        .then(() => {
          dispatch(listTODOS())
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const changeTodoClick = (todo) => {
    setModeUpdate(true)
    setTodo((prevTodo) => ({
      ...prevTodo,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      id: todo._id,
    }))
  }

  const handleTitleChange = (e) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      title: e.target.value,
    }))
  }

  const handleDescriptionChange = (e) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      description: e.target.value,
    }))
  }

  const handleStatusChange = (e) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      status: e.target.value,
    }))
  }

  useEffect(() => {
    dispatch(listTODOS())
  }, [dispatch])

  useEffect(() => {
    setStateTodos(todos)
  }, [todos])

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Описание</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {stateTodos.map((el, ind) => (
            <React.Fragment key={ind}>
              <tr>
                <td>{el.title}</td>
                <td>{el.description}</td>
                <td>
                  {el.status === "done" ? (
                    <i className="text-success fa-solid fa-square-check"></i>
                  ) : el.status === "pending" ? (
                    <i className="fa-solid fa-spinner"></i>
                  ) : el.status === "inprocess" ? (
                    <i className="text-warning fa-solid fa-gears"></i>
                  ) : el.status === "undone" ? (
                    <i className="text-danger fa-solid fa-exclamation"></i>
                  ) : (
                    ""
                  )}
                </td>
                <td>
                  <i
                    className=" fa-solid fa-pen-to-square text-primary"
                    style={{ padding: "0px 10px", cursor: "pointer" }}
                    onClick={() => {
                      changeTodoClick(el)
                    }}
                  ></i>
                </td>
                <td>
                  <i
                    className="fa-solid fa-trash-can text-danger"
                    style={{ padding: "0px 10px", cursor: "pointer" }}
                    onClick={() => {
                      deleteHandler(el._id)
                    }}
                  ></i>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Control
            type="text"
            autoComplete={"off"}
            value={todo.title}
            placeholder="Введите название"
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            value={todo.description}
            onChange={handleDescriptionChange}
            autoComplete={"off"}
            placeholder="Введите описание"
            as="textarea"
            rows={3}
          />
        </Form.Group>

        {modeUpdate ? (
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <div className="form-group">
              <label htmlFor="exampleFormControlSelect1">Example select</label>
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(e)}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option>done</option>
                <option>pending</option>
                <option>inprocess</option>
                <option>undone</option>
              </select>
            </div>
          </Form.Group>
        ) : (
          ""
        )}

        {modeUpdate ? (
          <div>
            <Button
              className="m-1"
              variant="warning"
              type="submit"
              onClick={() => updateTodoHandler()}
            >
              Обновить данные
            </Button>
            <Button
              className="m-1"
              variant="primary"
              type="submit"
              onClick={() => {
                setModeUpdate(false)
                setTodo({ title: "", description: "", status: "" })
              }}
            >
              <i className="fa-solid fa-rectangle-xmark p-1"></i>
            </Button>
          </div>
        ) : (
          <Button variant="primary" type="submit" onClick={submitHandler}>
            Отправить
          </Button>
        )}
      </Form>
    </Container>
  )
}

export default TableComp
