import React, { useEffect } from "react"
import { push } from "connected-react-router"
import { connect } from "react-redux"
import { fetchMovies, selectMovie } from "../actions"

const renderMovies = ({ movies, onLoad, onSelectMovie }) => {
	useEffect(() => {
		if (!movies.length) {
			onLoad()
		}
	}, [movies])

	return (
		<div className='movies container'>
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

const mapStateToProps = state => {
	return {
		movies: state.app.movies
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => {
			dispatch(fetchMovies())
		},
		onSelectMovie: id => {
			dispatch(selectMovie(id))
			dispatch(push(`/movie/${id}`))
		}
	}
}

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(renderMovies))
export default Home
