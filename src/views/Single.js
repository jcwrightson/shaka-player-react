import React, { useEffect } from "react"
import { connect } from "react-redux"
import { queryMovieById } from "../actions"
import Player from "../components/Player"

const renderSingle = ({
	match,
	manifest,
	id,
	handleLoadedMetaData,
	handleTimeUpdate,
	handleClick,
	handleDoubleClick,
	handleFullScreenChange,
	fetchMovie
}) => {
	useEffect(() => {
		if (!manifest) {
			fetchMovie(match.params)
		}
	}, [manifest])

	return (
		<div className='single'>
			<Player
				id={id}
				src={manifest}
				onLoadedMetadata={handleLoadedMetaData}
				onTimeUpdate={handleTimeUpdate}
				onClick={handleClick}
				onDoubleClick={handleDoubleClick}
				onFullScreenChange={handleFullScreenChange}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		...state.app.movie
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleClick: () => {
			dispatch({ type: "PLAYER_TOGGLE_PLAY" })
		},
		handleDoubleClick: () => {
			dispatch({ type: "PLAYER_TOGGLE_FULLSCREEN" })
		},
		handleTimeUpdate: e => {
			dispatch({
				type: "PLAYER_TIME_UPDATE",
				payload: e.target.currentTime
			})
		},
		handleLoadedMetaData: e => {
			dispatch({
				type: "PLAYER_LOADED_DURATION",
				payload: e.target.duration
			})
		},
		handleFullScreenChange: () => {
			if (
				!document.fullscreenElement &&
				!document.webkitIsFullScreen &&
				!document.mozFullScreen &&
				!document.msFullscreenElement
			) {
				dispatch({ type: "PLAYER_TOGGLE_FULLSCREEN" })
			}
		},
		fetchMovie: id => {
			dispatch(queryMovieById(id))
		}
	}
}

const Single = connect(
	mapStateToProps,
	mapDispatchToProps
)(renderSingle)
export default Single
