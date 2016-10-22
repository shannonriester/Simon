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
    // console.log(this.state.username);
    let sideModal;
    let dashboardBtn;
    if (this.state.modal) {
      sideModal = (<Modal modal={this.state.modal} hideModal={this.hideModal} username={this.state.username}/>);
    }
    if (localStorage.authtoken) {
      dashboardBtn = (<li className="nav-li" onClick={this.showModal}><i id="sideModal" className="bars-icon fa fa-bars" aria-hidden="true"></i></li>);
    }

    return (
      <nav className="nav-component">
        <ul className="nav-ul nav-main">
          {dashboardBtn}
          <li id="Home" className="nav-li" onClick={this.routeTo}>Home</li>
          <li className="nav-li" onClick={this.newGame}>New Game</li>
          <li id="LeaderBoard" className="nav-li" onClick={this.routeTo}>Leader Board</li>
        </ul>

        <SessionNav username={this.state.username} showModal={this.showModal} />

        {sideModal}
      </nav>
    );
  }
});
