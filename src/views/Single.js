import React, { useEffect } from "react"
import { connect } from "react-redux"
import { push } from "connected-react-router"
import { queryMovieById } from "../actions"
import Player from "../components/Player"

const mapStateToProps = state => {
	return {
		...state.app.movie,
		...state.app.player
	}
}

const mapDispatchToProps = dispatch => {
	return {
		handleResetPlayer: () => {
			dispatch({ type: "PLAYER_RESET" })
		},
		handleTogglePlay: () => {
			dispatch({ type: "PLAYER_TOGGLE_PLAY" })
		},
		handleToggleFullScreen: () => {
			dispatch({ type: "PLAYER_TOGGLE_FULLSCREEN" })
		},
		onTimeUpdate: e => {
			dispatch({
				type: "PLAYER_TIME_UPDATE",
				payload: e.target.currentTime
			})
		},
		onLoadedMetadata: e => {
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
		handleSeek: time => {
			dispatch({ type: "PLAYER_SEEK", payload: time })
		},
		fetchMovie: id => {
			dispatch(queryMovieById(id))
		},
		navigateTo: path => {
			dispatch(push(path))
		}
	}
}

const renderSingle = props => {
	useEffect(() => {
		if (!props.manifest) {
			props.fetchMovie(props.match.params)
		}
	}, [props.manifest])

	return (
		<div className='single'>
			<nav>
				<button
					type='button'
					onClick={() => {
						props.navigateTo("/")
					}}
				>
					Home
				</button>
			</nav>
			<Player src={props.manifest} {...props} />
		</div>
	)
}

const Single = connect(
	mapStateToProps,
	mapDispatchToProps
)(React.memo(renderSingle))
export default Single
