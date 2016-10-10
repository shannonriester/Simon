import React from 'react';

import store from '../store';
import GameSquare from './GameSquare';

export default React.createClass({
  render() {
    return (
      <nav className="nav-component">
        <ul className="nav-ul nav-main">
          <li className="nav-li">Home</li>
          <li className="nav-li">Play</li>
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
