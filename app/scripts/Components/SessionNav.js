import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Modal from './Modal';
import GameSquare from './GameSquare';

export default React.createClass({
  showModal(e) {
    e.stopPropagation();
    e.preventDefault();
    this.props.showModal(e.target.id);
  },
  logout() {
    store.session.logout();
  },
  render() {
    let sessionNav = (
      <ul className="nav-ul nav-session">
        <li id="login" className="nav-li" onClick={this.showModal}>Log In</li>
        <li id="signup" className="nav-li" onClick={this.showModal}>Sign Up</li>
      </ul>
    );

    if (this.props.username) {
      sessionNav = (
        <ul className="nav-ul nav-session">
          <li className="nav-li">Hi {this.props.username}!</li>
          <li className="nav-li" onClick={this.logout}>Logout</li>
        </ul>
      );
    }

    return (
      <div className="session-nav-component">
        {sessionNav}
      </div>
    );
  }
});