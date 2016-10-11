import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
  routeStartGame() {
    browserHistory.push("/SimonSays");
  },
  route(e) {
  },
  render() {
    return (
      <ul className="landing-component">
        <li id="green" className="landing-li" onClick={this.routeStartGame} ref="green">Start Game</li>
        <li id="red" className="landing-li" onClick={this.route} ref="red">Login</li>
        <li id="yellow" className="landing-li" onClick={this.route} ref="yellow">Sign Up</li>
        <li id="blue" className="landing-li" onClick={this.route} ref="blue">High Score</li>
      </ul>
    );
  }
});
