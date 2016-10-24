import React from 'react';
import { browserHistory } from 'react-router';

export default React.createClass({
  routeStartGame() {
    browserHistory.push("/GameBoard");
  },
  route(e) {

  },
  render() {
    return (
      <ul className="landing-component">
        <li className="landing-li outer-square greenDiv green" onClick={this.routeStartGame} ref="green"><div className="landing-inner inner-square greenDiv btn">Start Game</div></li>
        <li className="landing-li outer-square redDiv red " onClick={this.route} ref="red"><div className="landing-inner inner-square redDiv btn">Login</div></li>
        <li className="landing-li outer-square yellow" onClick={this.route} ref="yellow"><div className="landing-inner inner-square yellowDiv btn">Sign Up</div></li>
        <li className="landing-li outer-square blue" onClick={this.route} ref="blue"><div className="landing-inner inner-square blueDiv btn">High Score</div></li>
      </ul>
    );
  }
});
