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
    console.log(e.target.id);
  },
  logout() {
    store.session.logout();
  },
  routeTo(e) {
    let route = e.target.id
    browserHistory.push(`/${route}`);
  },
  updateState() {
    this.setState({username: store.session.get('username')})
  },
  componentWillMount() {
    if (localStorage.authtoken) {
      this.setState({loggedIn: true});
    }
  },
  componentDidMount() {
    store.session.on('change', this.updateState);
  },
  componentWillUnmount() {
    store.session.off('change', this.updateState);
  },
  render() {
    let sideModal;
    if (this.state.modal) {
      sideModal = (<Modal modal={this.state.modal}/>);
    }

    let sessionNav = (
      <ul className="nav-ul nav-session">
        <li id="login" className="nav-li" onClick={this.showModal}>Log In</li>
        <li id="signup" className="nav-li" onClick={this.showModal}>Sign Up</li>
      </ul>
    );

    if (this.state.loggedIn) {
      sessionNav = (
        <ul className="nav-ul nav-session">
          <li className="nav-li">Hi, {this.state.username}</li>
          <li className="nav-li" onClick={this.logout}>Logout</li>
        </ul>
      );
    }

    return (
      <nav className="nav-component">
        <ul className="nav-ul nav-main">
          <li id="sideModal" className="nav-li" onClick={this.showModal}><i className="bars-icon fa fa-bars" aria-hidden="true"></i></li>
          <li id="Home" className="nav-li" onClick={this.routeTo}>Home</li>
          <li className="nav-li" onClick={this.newGame}>New Game</li>
          <li id="HighScore" className="nav-li" onClick={this.routeTo}>High Score</li>
        </ul>

        {sessionNav}

        {sideModal}
      </nav>
    );
  }
});
