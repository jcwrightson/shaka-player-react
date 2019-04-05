import React, { useEffect } from "react"
import { store } from "../store"

const Controls = props => {
	const handleProgress = () => {
		const prog = document.querySelector("#progress")
		const bar = document.querySelector("#bar")

		if (bar && prog) {
			bar.style.width = `${(props.currentTime / props.duration) *
				prog.clientWidth}px`
		}
	}

	const handleTogglePlay = () => {
		store.dispatch({ type: "PLAYER_TOGGLE_PLAY" })
	}

	const handleSeekClick = e => {
		const bounds = e.target.getBoundingClientRect()
		const seekPosition = e.clientX - bounds.left
		const seekTime = Math.floor(
			(seekPosition / e.target.clientWidth) * props.duration
		)

		store.dispatch({ type: "PLAYER_SEEK", payload: seekTime })
	}

	const handleToggleFullScreen = () => {
		window.video.webkitEnterFullScreen()
	}

	useEffect(() => {
		handleProgress()
	}, [props.currentTime])

	return (
		<div className='controls'>
			<div id='progress' onClick={handleSeekClick} role='presentation'>
				<div id='bar' />
			</div>
			<div className='row'>
				<div className='row'>
					<button onClick={handleTogglePlay} type='button'>
						{props.play ? (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 12 14'
							>
								<path
									id='ic_pause_24px'
									d='M6,19h4V5H6ZM14,5V19h4V5Z'
									transform='translate(-6 -5)'
								/>
							</svg>
						) : (
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 11 14'
							>
								<path
									id='ic_play_arrow_24px'
									d='M8,5V19l11-7Z'
									transform='translate(-8 -5)'
								/>
							</svg>
						)}
					</button>
					<div className='row meta'>
						<div>
							{Math.floor(props.currentTime)} /{" "}
							{Math.floor(props.duration)}
						</div>
					</div>
					<button onClick={handleToggleFullScreen} type='button'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 14 14'
						>
							<path
								id='ic_fullscreen_24px'
								d='M7,14H5v5h5V17H7ZM5,10H7V7h3V5H5Zm12,7H14v2h5V14H17ZM14,5V7h3v3h2V5Z'
								transform='translate(-5 -5)'
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Controls
