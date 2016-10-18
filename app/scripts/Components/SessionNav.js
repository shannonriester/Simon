import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Modal from './Modal';
import GameSquare from './GameSquare';

export default React.createClass({
  getInitialState() {
    return {
      username: store.session.get('username'),
      loggedIn: false,
      modal: false,
    }
  },
  showModal(e) {
    this.props.showModal(e.target.id)
    // this.setState({modal: e.target.id});
    // console.log(e.target.id);
  },
  logout() {
    store.session.logout();
  },
  render() {
    let sessionNav = (
      <ul className="nav-ul nav-session">
        <li id="login" className="nav-li" onClick={this.showModal.}>Log In</li>
        <li id="signup" className="nav-li" onClick={this.showModal}>Sign Up</li>
      </ul>
    );

    if (this.props.username) {
      sessionNav = (
        <ul className="nav-ul nav-session">
          <li className="nav-li">Hi, {this.state.username}</li>
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
