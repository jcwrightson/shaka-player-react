import fetch from "node-fetch"

const URI = "http://localhost:3000/graphql"

export function fetchMovies() {
	const query = `{
    movies {
      id,
      name,
      manifest
    }
  }`
	return dispatch => {
		fetch(URI, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query
			})
		})
			.then(res => res.json())
			.then(json => {
				return dispatch({
					type: "FETCHED_MOVIES",
					payload: json.data.movies
				})
			})
			.catch(console.error)
	}
}

export function queryMovieById(id) {
	const queryById = `query movies($id:String!){
    movie(id:$id){
      id,
      name,
      manifest
    }
  }`
	return dispatch => {
		fetch(URI, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				query: queryById,
				variables: id
			})
		})
			.then(res => res.json())
			.then(json => {
				return dispatch({
					type: "FETCHED_SINGLE_MOVIE",
					payload: json.data.movie
				})
			})
			.catch(console.error)
	}
}

export function selectMovie(id) {
	return dispatch => {
		dispatch({ type: "SELECT_MOVIE", payload: id })
	}
}
