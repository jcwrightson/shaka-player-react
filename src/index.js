import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { Route, Switch, Router } from "react-router"
import { history, store } from "./store"

import Single from "./views/Single"
import Home from "./views/Home"

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/movie/:id' component={Single} />
				<Route component={() => <div>404 &mdash; Not Found</div>} />
			</Switch>
		</Router>
	</Provider>,
	document.getElementById("app")
)
