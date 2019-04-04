import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import shaka from "shaka-player";

class Movie extends Component {
  static propTypes = {
    src: PropTypes.string,
    currentTime: PropTypes.number,
    onLoadedMetaData: PropTypes.func, // used to get duration
    onTimeUpdate: PropTypes.func, // used to get current time
    play: PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  initPlayer() {
    var video = document.getElementById(this.props.id);
    var player = new shaka.Player(video);

    player.addEventListener("error", this.onErrorEvent);

    player
      .load(this.props.src)
      .then(function() {})
      .catch(this.onError);
  }

  onErrorEvent(event) {
    onError(event.detail);
  }

  onError(error) {
    console.error("Error code", error.code, "object", error);
  }

  componentWillMount() {
    shaka.polyfill.installAll();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      if (shaka.Player.isBrowserSupported()) {
        this.initPlayer();
      }
    }
  }

  render() {
    return <video id={this.props.id} controls />;
  }
}

const mapStateToProps = state => {
  return {
    ...state.movie,
    src: state.movie.manifest
  };
};

const Player = connect(mapStateToProps)(Movie);

export default Player;
