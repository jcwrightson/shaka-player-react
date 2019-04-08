import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"

function movies(
	state = {
		isFetching: false,
		list: []
	},
	action
) {
	switch (action.type) {
		case "REQUEST_MOVIES":
			return Object.assign({}, state, {
				isFetching: true
			})
		case "RECEIVE_MOVIES":
			return Object.assign({}, state, {
				isFetching: false,
				list: action.movies
			})
		default:
			return state
	}
}

function movie(
	state = {
		isFetching: false,
		item: {}
	},
	action
) {
	switch (action.type) {
		case "REQUEST_MOVIE":
			return Object.assign({}, state, {
				isFetching: true
			})
		case "RECEIVE_MOVIE":
			return Object.assign({}, state, {
				isFetching: false,
				item: action.movie
			})
		default:
			return state
	}
}

function selectedMovie(state = null, action) {
	switch (action.type) {
		case "SELECT_MOVIE":
			return action.id
		default:
			return state
	}
}

const playerInitialState = {
	duration: 0,
	currentTime: 0,
	play: true,
	fullscreen: false,
	seek: null
}
function player(state = { ...playerInitialState }, action) {
	switch (action.type) {
		case "PLAYER_TOGGLE_PLAY":
			return Object.assign({}, state, {
				play: !state.play
			})
		case "PLAYER_TOGGLE_FULLSCREEN":
			return Object.assign({}, state, {
				fullscreen: !state.fullscreen
			})

		case "PLAYER_LOADED_DURATION":
			return Object.assign({}, state, {
				duration: action.payload
			})

		case "PLAYER_TIME_UPDATE":
			return Object.assign({}, state, {
				currentTime: action.payload
			})
		case "PLAYER_SEEK":
			return Object.assign({}, state, {
				seek: action.payload
			})

		case "PLAYER_RESET":
			return playerInitialState

		default: {
			return state
		}
	}
}

export default history =>
	combineReducers({
		router: connectRouter(history),
		movies,
		movie,
		selectedMovie,
		player
	})
