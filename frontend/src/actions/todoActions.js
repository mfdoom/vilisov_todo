import axios from "axios"

export const listTODOS = () => async (dispatch) => {
  try {
    dispatch({ type: "TODO_LIST_REQUEST" })

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_ADDRESS}api/todos`
    )

    dispatch({
      type: "TODO_LIST_SUCCESS",
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: "TODO_LIST_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteTodo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "TODO_DELETE_REQUEST",
    })

    await axios.delete(`${process.env.REACT_APP_API_ADDRESS}api/todos/${id}`)

    dispatch({
      type: "TODO_DELETE_SUCCESS",
    })
  } catch (error) {
    dispatch({
      type: "TODO_DELETE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createTodo =
  ({ todo }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "TODO_CREATE_REQUEST",
      })

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_ADDRESS}api/todos`,
        {
          todo,
        }
      )

      dispatch({
        type: "TODO_CREATE_SUCCESS",
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: "TODO_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const updateTodo =
  ({ todo }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "TODO_UPDATE_REQUEST",
      })

      const { data } = await axios.put(
        `${process.env.REACT_APP_API_ADDRESS}api/todos/${todo.id}`,
        todo
      )

      dispatch({
        type: "TODO_UPDATE_SUCCESS",
      })
      dispatch({
        type: "TODO_DETAILS_SUCCESS",
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: "TODO_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
