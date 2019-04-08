import React, { useEffect } from "react"
import { push } from "connected-react-router"
import { connect } from "react-redux"
import { fetchMovies, selectMovieById } from "../actions"

const renderMovies = ({ movies, isFetching, onLoad, onSelectMovie }) => {
	useEffect(() => {
		if (!movies.length && !isFetching) {
			onLoad()
		}
	}, [movies])

	return (
		<div className='movies container'>
			{!isFetching && (
				<React.Fragment>
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
				</React.Fragment>
			)}
			{isFetching && (
				<React.Fragment>
					<div className='loading'>Loading...</div>
				</React.Fragment>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		movies: state.movies.list,
		isFetching: state.movies.isFetching
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onLoad: () => {
			dispatch(fetchMovies())
		},
		onSelectMovie: id => {
			dispatch(selectMovieById(id))
			dispatch(push(`/movie/${id}`))
		}
	}
}

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(renderMovies))
export default Home
