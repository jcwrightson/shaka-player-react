export default function(
	state = {
		movies: [],
		movie: {},
		player: {
			duration: 0,
			currentTime: 0,
			play: false,
			seek: null
		}
	},
	action
) {
	switch (action.type) {
		case "FETCHED_MOVIES": {
			return { ...state, movies: [...action.payload] }
		}
		case "FETCHED_SINGLE_MOVIE": {
			return {
				...state,
				movie: { ...state.movie, ...action.payload, play: true }
			}
		}
		case "SELECT_MOVIE": {
			return {
				...state,
				movie: {
					...state.movies.filter(
						movie => movie.id === action.payload
					)[0]
				}
			}
		}
		case "PLAYER_TOGGLE_PLAY": {
			const stateCopy = Object.assign({}, state)
			stateCopy.player.play = !stateCopy.player.play
			return stateCopy
		}

		case "PLAYER_LOADED_DURATION": {
			return {
				...state,
				player: {
					...state.player,
					duration: action.payload
				}
			}
		}
		case "PLAYER_TIME_UPDATE": {
			return {
				...state,
				player: {
					...state.player,
					currentTime: action.payload || 0
				}
			}
		}
		case "PLAYER_SEEK": {
			return {
				...state,
				player: {
					...state.player,
					seek: action.payload
				}
			}
		}
		default: {
			return state
		}
	}
}
