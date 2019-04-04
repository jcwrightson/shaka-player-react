import React, { Component } from "react";
import Player from "../components/Player";
import store from "../store";
import * as actions from "../actions";

export default class Single extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const query = `query movies($id:String!){
		movie(id:$id){
		  id,
		  name,
		  manifest
		}
	}`;
    store.dispatch(actions.queryMovieById(query, this.props.match.params));
  }

  render() {
    return <Player />;
  }
}
