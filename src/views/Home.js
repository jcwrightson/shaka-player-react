import React, { useEffect } from "react"
import { push } from "connected-react-router"
import { connect } from "react-redux"
import { fetchMovies, selectMovie } from "../actions"
import { store } from "../store"

const mapStateToProps = state => {
	return {
		movies: state.app.movies,
		player: state.app.player
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSelectMovie: id => {
			dispatch(selectMovie(id))
			dispatch(push(`/movie/${id}`))
		}
	}
}

const renderMovies = ({ movies, onSelectMovie }) => {
	useEffect(() => {
		store.dispatch(fetchMovies())
	}, [])

	return (
		<div className='movies'>
			{movies.map(movie => (
				<div
					className='movie'
					key={movie.id}
					role='presentation'
					onClick={() => onSelectMovie(movie.id)}
				>
					<div>{movie.name}</div>
				</div>
			))}
		</div>
	)
}

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderMovies)

export default Home
