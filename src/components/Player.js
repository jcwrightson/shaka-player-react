import React, { useEffect, useRef } from "react"
import shaka from "shaka-player"
import Controls from "./Controls"

const Player = ({
	src,
	onTimeUpdate,
	onLoadedMetadata,
	seek,
	play,
	fullscreen,
	currentTime,
	duration,
	handleTogglePlay,
	handleToggleFullScreen,
	handleFullScreenChange,
	handleSeek,
	handleResetPlayer
}) => {
	const videoElem = useRef(null)
	let player = null

	// ToDo:
	document.addEventListener("fullscreenchange", handleFullScreenChange)

	useEffect(() => {
		shaka.polyfill.installAll()
		player = new shaka.Player(videoElem.current)
	}, [])

	useEffect(() => {
		if (src) {
			player
				.load(src)
				.then(() => {
					if (currentTime > 0) {
						handleSeek(currentTime)
					}

					if (!play) {
						handleTogglePlay()
					}
				})
				/* eslint-disable-next-line no-console */
				.catch(console.error)
		}

		return () => {
			if (player) {
				player.destroy()
				handleResetPlayer()
			}
		}
	}, [src])

	useEffect(() => {
		if (play && videoElem.current) {
			videoElem.current.play()
		}

		if (!play && videoElem.current) {
			videoElem.current.pause()
		}
	}, [play])

	useEffect(() => {
		if (seek) {
			videoElem.current.currentTime = seek
		}
	}, [seek])

	useEffect(() => {
		if (fullscreen && document.fullscreenEnabled) {
			videoElem.current.requestFullscreen()
		}
		if (!fullscreen && document.fullscreen) {
			document.exitFullscreen()
		}
	}, [fullscreen])

	return (
		<div className='player'>
			<video
				id='video'
				ref={videoElem}
				onClick={handleTogglePlay}
				onLoadedMetadata={onLoadedMetadata}
				onTimeUpdate={onTimeUpdate}
				autoPlay
			>
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
