import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.history.push("/movie/1");
  }

  render() {
    return (
      <div>
        Home
        <ul>
          <li onClick={this.handleClick}>Link</li>
        </ul>
      </div>
    );
  }
}
