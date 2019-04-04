import React, { Component } from "react";
import * as actions from "../actions";
import store from "../store";
import Movies from "../components/Movies";
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const queryAll = `{
		movies {
		  id,
		  name,
		  manifest
		}
	  }`;

    store.dispatch(actions.fetchMovies(queryAll));
  }

  render() {
    return <Movies />;
  }
}
