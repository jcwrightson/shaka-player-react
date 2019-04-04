const URI = "http://localhost:3000/graphql";

export function fetchMovies(query) {
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
        return dispatch({ type: "FETCHED_MOVIES", payload: json.data.movies });
      })
      .catch(console.error);
  };
}

export function queryMovieById(query, variables) {
  return dispatch => {
    fetch(URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
      .then(res => res.json())
      .then(json => {
        return dispatch({
          type: "FETCHED_SINGLE_MOVIE",
          payload: json.data.movie
        });
      })
      .catch(console.error);
  };
}
