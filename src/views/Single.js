import React, { useEffect } from "react"
import { connect } from "react-redux"
import Player from "../components/Player"
import { store } from "../store"
import * as actions from "../actions"

const renderSingle = props => {
	useEffect(() => {
		if (!props.manifest) {
			store.dispatch(actions.queryMovieById(props.match.params))
		}
	}, [props.manifest])

	const handleLoadedMetaData = e => {
		store.dispatch({
			type: "PLAYER_LOADED_DURATION",
			payload: e.target.duration
		})
		store.dispatch({ type: "PLAYER_TOGGLE_PLAY" })
	}

	const handleTimeUpdate = e => {
		store.dispatch({
			type: "PLAYER_TIME_UPDATE",
			payload: e.target.currentTime
		})
	}

	return (
		<div className='single'>
			<Player
				id={props.id}
				src={props.manifest}
				onLoadedMetaData={handleLoadedMetaData}
				onTimeUpdate={handleTimeUpdate}
			/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		...state.app.movie
	}
}

const Single = connect(mapStateToProps)(renderSingle)
export default Single
