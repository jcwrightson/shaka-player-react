import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import appReducer from "./reducer"

export default history =>
	combineReducers({
		router: connectRouter(history),
		app: appReducer
	})
