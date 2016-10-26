import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import SessionNav from '../Components/SessionNav';
import Modal from '../Components/Modal';
import GameSquare from '../Components/GameSquare';

export default React.createClass({
  getInitialState() {
    return {
      username: store.session.get('username'),
      modal: false,
    }
  },
  showModal() {
    this.setState({modal: true});
    browserHistory.push('GameBoard/Dashboard');
  },
  hideModal() {
    this.setState({modal: false});
    browserHistory.push('/GameBoard');
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

    // store.game.setUser(store.session.get('username'));
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
        <ul className="nav-ul nav-main">
          <li className="nav-li" onClick={this.showModal}>
            <i className="bars-icon fa fa-bars" aria-hidden="true"></i>
          </li>
          <li id="Home" className="nav-li" onClick={this.routeTo}>Home</li>
          <li id="GameBoard" className="nav-li" onClick={this.routeTo}>Game Board</li>
          <li id="LeaderBoard" className="nav-li" onClick={this.routeTo}>Leader Board</li>
        </ul>

        {sideModal}
      </nav>
    );
  }
});
