import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Single {this.props.match.params.id}</div>;
  }
}
