import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import SessionNav from '../Components/SessionNav';
import Modal from '../Components/Modal';
import GameSquare from '../Components/GameSquare';

export default React.createClass({
  getInitialState() {
    return {
      modal: false,
      username: store.session.get('username'),
    }
  },
  showModal() {
    this.setState({modal: true});
    // browserHistory.push('/GameBoard/Dashboard');
  },
  hideModal() {
    this.setState({modal: false});
    // browserHistory.push('/GameBoard');
  },
  routeTo(e) {
    let route = e.target.id
    browserHistory.push(`/${route}`);
  },
  updateState() {
    this.setState({username: store.session.get('username')});

    if (this.state.username || store.session.get('username')) {
      let player = store.session.get('username');
      store.game.setPlayer(player);
      store.highScores.compareHighScores();
    }
  },
  componentDidMount() {
    store.session.on('change', this.updateState);

    store.highScores.fetch();
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
        <div className="bars-icon-container" onClick={this.showModal}>
          <i className="bars-icon fa fa-bars btn" aria-hidden="true"></i>
        </div>
        <ul className="nav-ul nav-main">
          <li id="Home" className="nav-li btn" onClick={this.routeTo}>Home</li>
          <li id="GameBoard" className="nav-li btn" onClick={this.routeTo}>Game</li>
          <li id="LeaderBoard" className="nav-li btn" onClick={this.routeTo}>Board</li>
        </ul>
        {sideModal}
      </nav>
    );
  }
});
