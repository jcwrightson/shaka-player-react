import { doFetch, url } from "./api"

function selectMovie(id) {
	return {
		type: "SELECT_MOVIE",
		id
	}
}
function requestMovies() {
	return {
		type: "REQUEST_MOVIES"
	}
}

function requestMovie() {
	return {
		type: "REQUEST_MOVIE"
	}
}

function receiveMovies(json) {
	return {
		type: "RECEIVE_MOVIES",
		movies: json.data.movies
	}
}

function receiveMovie(json) {
	return {
		type: "RECEIVE_MOVIE",
		movie: json.data.movie
	}
}

export function fetchMovies() {
	const query = `{
    movies {
      id,
      name,
      manifest
    }
  }`

	return dispatch => {
		dispatch(requestMovies())

		doFetch(url, query).then(json => {
			if (!json.error) {
				dispatch(receiveMovies(json))
			}
		})
	}
}

export function fetchMovieById(id) {
	console.log("here", id)
	const query = `query movies($id:String!){
		    movie(id:$id){
		      id,
		      name,
		      manifest
		    }
		  }`

	return dispatch => {
		dispatch(requestMovie())

		doFetch(url, query, id).then(json => {
			dispatch(receiveMovie(json))
		})
	}
}

export function selectMovieById(id) {
	return (dispatch, getState) => {
		dispatch(selectMovie(id))
		const { movies } = getState()
		const exists = movies.list.filter(movie => movie.id === id)[0]
		if (exists) {
			dispatch(receiveMovie({ data: { movie: { ...exists } } }))
		} else {
			dispatch(fetchMovieById(id))
		}
	}
}
