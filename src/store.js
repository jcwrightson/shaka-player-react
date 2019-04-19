import { createBrowserHistory } from "history"
import { applyMiddleware, compose, createStore } from "redux"
import { routerMiddleware } from "connected-react-router"
import thunk from "redux-thunk"
import logger from "redux-logger"
import createRootReducer from "./reducers"

export const history = createBrowserHistory()

export const store = createStore(
	createRootReducer(history),
	compose(applyMiddleware(routerMiddleware(history), thunk, logger))
)
