import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import {
  todosListReducer,
  TodoDeleteReducer,
  todoCreateReducer,
  todoUpdateReducer,
} from "./reducers/todosReducer"

const middleware = [thunk]

const reducer = combineReducers({
  todos: todosListReducer,
  deleteTodos: TodoDeleteReducer,
  createTodo: todoCreateReducer,
  todoUpdate: todoUpdateReducer,
})

const initialState = {}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
