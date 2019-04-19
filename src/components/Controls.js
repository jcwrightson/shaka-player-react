import React, { useEffect, useRef } from "react"

const Controls = ({
	duration,
	currentTime,
	play,
	handleToggleFullScreen,
	handleTogglePlay,
	handleSeek
}) => {
	const progContainer = useRef(null)
	const progBar = useRef(null)

	const handleProgress = () => {
		if (progContainer.current && progBar.current) {
			progBar.current.style.width = `${(currentTime / duration) *
				progContainer.current.clientWidth}px`
		}
	}

	const handleSeekClick = e => {
		const bounds = progContainer.current.getBoundingClientRect()
		const seekPosition = e.clientX - bounds.left
		const seekTime = Math.floor(
			(seekPosition / progContainer.current.clientWidth) * duration
		)

		handleSeek(seekTime)
	}

	const formatTime = raw => {
		const minutes = Math.floor(raw / 60)
		const seconds = Math.floor(raw - minutes * 60)
		const hours = Math.floor(raw / 3600)

		if (!hours > 0) {
			return `${minutes
				.toString()
				.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
		}

		return `${hours
			.toString()
			.padStart(2, "0")}:${minutes
			.toString()
			.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
	}

	useEffect(() => {
		handleProgress()
	}, [currentTime])

	return (
		<div className='controls'>
			<div
				id='progress'
				ref={progContainer}
				onClick={handleSeekClick}
				role='presentation'
			>
				<div id='bar' ref={progBar} />
			</div>
			<div className='row'>
				<div className='row'>
					<button onClick={handleTogglePlay} type='button'>
						{play ? (
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
							{formatTime(currentTime)} | {formatTime(duration)}
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
