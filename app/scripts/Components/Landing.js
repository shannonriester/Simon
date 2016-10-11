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
        <li className="landing-li outter-square green" onClick={this.routeStartGame} ref="green"><div className="landing-inner inner-square">Start Game</div></li>
        <li className="landing-li outter-square red" onClick={this.route} ref="red"><div className="landing-inner inner-square">Login</div></li>
        <li className="landing-li outter-square yellow" onClick={this.route} ref="yellow"><div className="landing-inner inner-square">Sign Up</div></li>
        <li className="landing-li outter-square blue" onClick={this.route} ref="blue"><div className="landing-inner inner-square">High Score</div></li>
      </ul>
    );
  }
});
