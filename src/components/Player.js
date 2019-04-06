import React, { useEffect } from "react"
import { connect } from "react-redux"
import shaka from "shaka-player"
import Controls from "./Controls"

const renderPlayer = props => {
	const bindEventListeners = video => {
		video.addEventListener("click", props.onClick)
		video.addEventListener("dblclick", props.onDoubleClick)
		video.addEventListener("loadedmetadata", props.onLoadedMetadata)
		video.addEventListener("timeupdate", props.onTimeUpdate)
		video.addEventListener("fullscreenchange", props.onFullScreenChange)
	}
	const initPlayer = () => {
		shaka.polyfill.installAll()
		const video = document.getElementById(props.id)
		const player = new shaka.Player(video)
		player.addEventListener("error", console.error)
		player.addEventListener("loaded", console.log)
		bindEventListeners(video)

		player
			.load(props.src)
			.then(props.dispatch({ type: "PLAYER_TOGGLE_PLAY" }))
			.catch(console.error)

		window.player = player
		window.video = video
	}

	useEffect(() => {
		if (props.src) {
			initPlayer()
		}

		return () => {
			if (window.player) {
				window.player.destroy()
			}

			props.dispatch({ type: "PLAYER_RESET" })
		}
	}, [props.src])

	useEffect(() => {
		if (props.play && window.video) {
			window.video.play()
		}

		if (!props.play && window.video) {
			window.video.pause()
		}
	}, [props.play])

	useEffect(() => {
		if (props.seek) {
			window.video.currentTime = props.seek
		}
	}, [props.seek])

	useEffect(() => {
		if (document) {
			if (props.fullscreen && document.fullscreenEnabled) {
				window.video.requestFullscreen()
			}
			if (!props.fullscreen && document.fullscreenEnabled) {
				// window.video.exitFullscreen()
			}
		}
	}, [props.fullscreen])

	return (
		<div className='video-container'>
			<video id={props.id} autoPlay>
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

const Player = connect(mapStateToProps)(React.memo(renderPlayer))
export default Player
