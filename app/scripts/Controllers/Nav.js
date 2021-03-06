import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Modal from '../Components/Modal/Modal';
import GameSquare from '../Components/GameSquare';

export default React.createClass({
  getInitialState() {
    return {
      modal: false,
      username: store.session.get('username'),
      session: store.session.toJSON(),
    }
  },
  showModal() {
    this.setState({modal: true});
  },
  hideModal() {
    this.setState({modal: false});
  },
  routeTo(e) {
    let route = e.target.id
    browserHistory.push(`/${route}`);
  },
  updateState() {
    this.setState({
      username: store.session.get('username'),
      session: store.session.toJSON(),
    });

    if (this.state.username || store.session.get('username')) {
      let player = store.session.get('username');
      store.game.setPlayer(player);
    }
  },
  componentDidMount() {
    store.highScores.fetch();
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
        session={this.state.session}
        />);
    }

    return (
      <nav className="nav-component">
        <div className="bars-icon-container" onClick={this.showModal} onTouchEnd={this.showModal}>
          <i className="bars-icon fa fa-bars btn" aria-hidden="true"></i>
        </div>
        <ul className="nav-ul nav-main">
          <li id="Home" className="nav-li btn" onClick={this.routeTo} onTouchEnd={this.routeTo}>Home</li>
          <li id="GameBoard" className="nav-li btn" onClick={this.routeTo} onTouchEnd={this.routeTo}>Game</li>
          <li id="LeaderBoard" className="nav-li btn" onClick={this.routeTo} onTouchEnd={this.routeTo}>Scores</li>
        </ul>
        {sideModal}
      </nav>
    );
  }
});
