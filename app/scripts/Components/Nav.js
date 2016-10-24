import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import SessionNav from './SessionNav';
import Modal from './Modal';
import GameSquare from './GameSquare';

export default React.createClass({
  getInitialState() {
    return {
      username: store.session.get('username'),
      modal: false,
    }
  },
  showModal(modalID) {
    this.setState({modal: modalID});
  },
  hideModal() {
    this.setState({modal: false});
  },
  newGame() {
    store.game.newGame();
  },
  routeTo(e) {
    let route = e.target.id
    browserHistory.push(`/${route}`);
  },
  updateState() {
    this.setState({username: store.session.get('username')});
  },
  componentWillMount() {
    if (localStorage.authtoken) {
      this.setState({username: store.session.get('username')});
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
      sideModal = (<Modal
        modal={this.state.modal}
        hideModal={this.hideModal}
        username={this.state.username}
        />);
    }

    return (
      <nav className="nav-component">
        <div id="sideModal" className="icon-container" onClick={this.showModal}>
          <i className="bars-icon nav-li fa fa-bars" aria-hidden="true"></i>
        </div>

        <ul className="nav-ul nav-main">
          <li id="Home" className="nav-li" onClick={this.routeTo}>Home</li>
          <li className="nav-li" onClick={this.newGame}>New Game</li>
          <li id="LeaderBoard" className="nav-li" onClick={this.routeTo}>Leader Board</li>
        </ul>

        {sideModal}
      </nav>
    );
  }
});
