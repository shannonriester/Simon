import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import GameSquare from './GameSquare';

export default React.createClass({
  routeHome() {
    browserHistory.push('/');
  },
  render() {
    return (
      <nav className="nav-component">
        <ul className="nav-ul nav-main">
          <li className="nav-li" onClick={this.routeHome}>Home</li>
          <li className="nav-li">New Game</li>
          <li className="nav-li">High Score</li>
        </ul>
        <ul className="nav-ul nav-session">
          <li className="nav-li">Log In</li>
          <li className="nav-li">Logout</li>
          <li className="nav-li">Sign Up</li>
        </ul>
      </nav>
    );
  }
});
