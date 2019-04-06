import React, { useEffect } from "react"
import shaka from "shaka-player"
import Controls from "./Controls"

const Player = ({
	src,
	onFullScreenChange,
	onTimeUpdate,
	onLoadedMetadata,
	seek,
	play,
	fullscreen,
	currentTime,
	duration,
	handleTogglePlay,
	handleToggleFullScreen,
	handleSeek,
	handleResetPlayer
}) => {
	const bindEventListeners = video => {
		video.addEventListener("click", handleTogglePlay)
		video.addEventListener("dblclick", handleToggleFullScreen)
		video.addEventListener("loadedmetadata", onLoadedMetadata)
		video.addEventListener("timeupdate", onTimeUpdate)
		video.addEventListener("fullscreenchange", onFullScreenChange)
	}
	const initPlayer = () => {
		shaka.polyfill.installAll()
		const video = document.getElementById("video")
		const player = new shaka.Player(video)
		player.addEventListener("error", console.error)

		player
			.load(src)
			.then(handleTogglePlay)
			.catch(console.error)

		bindEventListeners(video)

		window.player = player
		window.video = video
	}

	useEffect(() => {
		if (src) {
			initPlayer()
		}

		return () => {
			if (window.player) {
				window.player.destroy()
			}

			handleResetPlayer()
		}
	}, [src])

	useEffect(() => {
		if (play && window.video) {
			window.video.play()
		}

		if (!play && window.video) {
			window.video.pause()
		}
	}, [play])

	useEffect(() => {
		if (seek) {
			window.video.currentTime = seek
		}
	}, [seek])

	useEffect(() => {
		if (fullscreen && document.fullscreenEnabled) {
			window.video.requestFullscreen()
		}
		if (!fullscreen && document.fullscreen) {
			document.exitFullscreen()
		}
	}, [fullscreen])

	return (
		<div className='player'>
			<video id='video' autoPlay>
				<track />
			</video>
			<Controls
				currentTime={currentTime}
				play={play}
				duration={duration}
				seek={seek}
				handleTogglePlay={handleTogglePlay}
				handleToggleFullScreen={handleToggleFullScreen}
				handleSeek={handleSeek}
			/>
		</div>
	)
}

export default Player
