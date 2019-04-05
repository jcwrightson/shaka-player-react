import React, { useEffect } from "react"
import { connect } from "react-redux"
import shaka from "shaka-player"
import Controls from "./Controls"
import { store } from "../store"

const renderPlayer = props => {
	// console.log(props)
	const initPlayer = () => {
		shaka.polyfill.installAll()
		const video = document.getElementById(props.id)
		const player = new shaka.Player(video)
		player.addEventListener("error", console.error)
		video.addEventListener("loadedmetadata", props.onLoadedMetaData)
		video.addEventListener("timeupdate", props.onTimeUpdate)

		player.load(props.src)

		window.player = player
		window.video = video
	}

	const handleClick = () => {
		store.dispatch({ type: "PLAYER_TOGGLE_PLAY" })
	}

	// INIT
	useEffect(() => {
		if (props.src) {
			initPlayer()
		}
	}, [props.src])

	// PLAY PAUSE
	useEffect(() => {
		if (props.play && window.player) {
			window.video.play()
		}

		if (!props.play && window.player) {
			window.video.pause()
		}
	}, [props.play])

	// SEEK
	useEffect(() => {
		if (props.seek) {
			window.video.currentTime = props.seek
		}
	}, [props.seek])

	return (
		<div className='video-container'>
			<video id={props.id} onClick={handleClick}>
				<track />
			</video>
			<Controls {...props} />
		</div>
	)
}

const mapStateToProps = state => {
	return {
		...state.app.player
	}
}

const Player = connect(mapStateToProps)(renderPlayer)
export default Player
