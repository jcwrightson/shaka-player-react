import { createStore, applyMiddleware } from "redux";
import { routerReducer, routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";

function reducer(
  state = {
    movies: [],
    movie: {},
    routing: routerReducer
  },
  action
) {
  switch (action.type) {
    case "FETCHED_MOVIES": {
      return { ...state, movies: [...action.payload] };
    }
    case "FETCHED_SINGLE_MOVIE": {
      return {
        ...state,
        movie: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

const browserHistory = createBrowserHistory();
const middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));

export default createStore(reducer, middleware);
