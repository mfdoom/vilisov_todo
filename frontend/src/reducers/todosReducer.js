export const todosListReducer = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "TODO_LIST_REQUEST":
      return { todos: [], loading: true }
    case "TODO_LIST_SUCCESS":
      return {
        todos: action.payload.todos,
        loading: false,
      }
    case "TODO_LIST_FAIL":
      return { error: action.payload }
    default:
      return state
  }
}

export const TodoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "TODO_DELETE_REQUEST":
      return { loading: true }
    case "TODO_DELETE_SUCCESS":
      return {
        loading: false,
        success: true,
      }
    case "TODO_DELETE_FAIL":
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const todoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "TODO_CREATE_REQUEST":
      return { loading: true }
    case "TODO_CREATE_SUCCESS":
      return { loading: false, success: true, todo: action.payload }
    case "TODO_CREATE_FAIL":
      return { loading: false, error: action.payload }
    case "TODO_CREATE_RESET":
      return {}
    default:
      return state
  }
}

export const todoUpdateReducer = (state = { todo: {} }, action) => {
  switch (action.type) {
    case "TODO_UPDATE_REQUEST":
      return { loading: true }
    case "TODO_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
      }
    case "TODO_UPDATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      }
    case "TODO_UPDATE_RESET":
      return {
        todo: {},
      }
    default:
      return state
  }
}
