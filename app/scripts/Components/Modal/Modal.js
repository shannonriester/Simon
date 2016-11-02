import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import store from '../../store';
import ModalHeader from './MHeader';
import MSessionBtns from './MSessionBtns';
import GameDirections from './MGameDirections';

export default React.createClass({
  closeModal(e) {
    if ((e.target.id === 'modal-component' && e.target.id !== 'modal-content') || e.target.id === 'close-modal-button') {
      this.props.hideModal();
    }
  },
  closeModalBtn() {
    this.props.hideModal();
  },
  newGame() {
    this.props.hideModal();

    window.setTimeout(() => {
      store.game.newGame();
    }, 1000);
  },
  routeHighScore() {
    browserHistory.push('/LeaderBoard');
  },
  routeHome() {
    browserHistory.push('/Home');
  },
  render() {
    return (
      <div id="modal-component" className="modal-component" onClick={this.closeModal}>
        <div id="modal-content" className="modal-content">
        <div id="cancel-btn btn" className="cancel-container">
          <h2 className="header-title">Simon</h2>
          <button id="close-modal-button" className="cancel-btn btn" tabIndex="1" role="button" onClick={this.closeModalBtn}>X</button>
        </div>

          <ModalHeader session={this.props.session}/>

          <ul className="modal-ul">
            <li className="modal-li btn" onClick={this.routeHome}>Home</li>
            <li className="modal-li btn" onClick={this.newGame}>New Game</li>
            <li className="modal-li session-modal-li btn" onClick={this.routeHighScore}><p className="modal-p">High Scores</p></li>
            <MSessionBtns />
            <GameDirections />
          </ul>

        </div>
      </div>
    );
  }
});
