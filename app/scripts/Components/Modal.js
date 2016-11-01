import React from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import store from '../store';
import ModalHeader from './ModalHeader';
import ImgUploader from './ImgUploader';

export default React.createClass({
  getInitialState() {
    return {
      login: false,
      signup: false,
      type: false,
    }
  },
  closeModal(e) {
    if (e.target.id === 'modal-component' && e.target.id !== 'modal-content') {
      this.props.hideModal();
    }
  },
  closeModalBtn() {
    this.props.hideModal();
  },
  toggleLogin(e) {
    let type = e.target.innerText.split(' ').join('').toLowerCase();
    this.setState({
      login: !this.state.form,
      signup: false,
      type: type,
    });
  },
  toggleSignup(e) {
    let type = e.target.innerText.split(' ').join('').toLowerCase();
    this.setState({
      login: false,
      signup: !this.state.form,
      type: type,
    });
  },
  newGame() {
    this.props.hideModal();

    window.setTimeout(() => {
      store.game.newGame();
    }, 1000);
  },
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password);
  },
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password1.value;
    let password2 = this.refs.password2.value;
    store.session.signup(username, password, password2);
  },
  logout() {
    store.session.logout();
  },
  routeHighScore() {
    browserHistory.push('/LeaderBoard');
  },
  routeHome() {
    browserHistory.push('/Home');
  },
  render() {
    let login;
    let signup;
    let modalHeader;
    let sessionLIs;

    if (this.state.login) {
      login = (
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password"/>
            <button className="submit-btn btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
          </form>
      );
    } else if (this.state.signup) {
      signup = (
          <form className="signup-form session-form" type="submit" onSubmit={this.signup}>
            <input type="text" tabIndex="2" placeholder="Choose a username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password1"/>
            <input type="password" tabIndex="4" placeholder="confirm password" role="textbox" ref="password2"/>
            <button className="submit-btn btn" tabIndex="5" role="button" onClick={this.signup}>Enter</button>
          </form>
      );
    }

    if (localStorage.authtoken && localStorage.authtoken !== store.anon.authtoken) {
      sessionLIs = (
        <ul className="session-modal-ul modal-ul">
          <li className="modal-li session-modal-li btn">
            <p className="modal-p">Upload a Profile Pic</p>
            <ImgUploader/>
          </li>
          <li className="modal-li session-modal-li btn" onClick={this.logout}><p className="modal-p">Logout</p></li>
        </ul>);
    } else {
      sessionLIs = (
        <ul className="session-modal-ul modal-ul">
          <li className="modal-li session-modal-li btn" id="login">
            <p className="modal-p" onClick={this.toggleLogin}>Login</p>
            {login}
          </li>
          <li className="modal-li session-modal-li btn" id="signup">
            <p className="modal-p" onClick={this.toggleSignup}>Sign Up</p>
            {signup}
          </li>
        </ul>
      );
    }
    return (
      <div id="modal-component" className="modal-component" onClick={this.closeModal}>
        <div id="modal-content" className="modal-content">
        <div id="cancel-btn btn" className="cancel-container">
          <h2 className="header-title">Simon</h2>
          <button className="cancel-btn btn" tabIndex="1" role="button" onClick={this.closeModalBtn}>X</button>
        </div>
          <ModalHeader session={this.props.session}/>
          <ul className="modal-ul">
            <li className="modal-li btn" onClick={this.routeHome}>Home</li>
            <li className="modal-li btn" onClick={this.newGame}>New Game</li>
            <li className="modal-li session-modal-li btn" onClick={this.routeHighScore}><p className="modal-p">High Scores</p></li>
            {sessionLIs}
            <li>
              <p className="modal-p how-to-p">Simon How To:</p>
              <ol className="ol-directions">
                <li className="li-directions">To begin, press the <span className="span">'Start Game'</span> button in the center of the board.</li>
                <li className="li-directions">The computer will generate a random color and flash that color on the board.</li>
                <li className="li-directions">The player must click the flashed color(s) in the same order as the computer generated pattern to get to the next round.</li>
                <li className="li-directions">Each new round increases the pattern by one random color.</li>
                <li className="li-directions">After 5 'hits' (AKA, 'clicks'), the user proceeds to the next level, generating faster and faster flashes!</li>
              </ol>
            </li>
          </ul>

        </div>
      </div>
    );
  }
});
