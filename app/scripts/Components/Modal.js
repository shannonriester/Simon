import React from 'react';
import $ from 'jquery';

import store from '../store';
import ModalHeader from './ModalHeader';

export default React.createClass({
  getInitialState() {
    return {
      form: false,
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
  toggleView(e) {
    let type = e.target.innerText.split(' ').join('').toLowerCase();
    this.setState({
      form: !this.state.form,
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
  render() {
    let login;
    let signup;
    let modalHeader;
    let sessionLIs;

    if (this.state.form && this.state.type === 'login') {
      // let classNames = "login-form session-form"
      login = (
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password"/>
            <button className="submit-btn btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
          </form>
      );
    } else if (this.state.form && this.state.type === 'signup') {
      signup = (
          <form className="signup-form session-form" type="submit" onSubmit={this.signup}>
            <input type="text" tabIndex="2" placeholder="Choose a username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password1"/>
            <input type="password" tabIndex="4" placeholder="confirm password" role="textbox" ref="password2"/>
            <button className="submit-btn btn" tabIndex="5" role="button" onClick={this.signup}>Enter</button>
          </form>
      );
    }

    if (localStorage.authtoken) {
      sessionLIs = (
        <ul className="session-modal-ul modal-ul">
          <li className="modal-li session-modal-li btn" onClick={this.logout}><p className="modal-p">Logout</p></li>
          <li className="modal-li session-modal-li btn" onClick={this.logout}><p className="modal-p">High Score</p></li>
        </ul>);
    } else {
      sessionLIs = (
        <ul className="session-modal-ul modal-ul">
          <li className="modal-li session-modal-li btn" id="login">
            <p className="modal-p" onClick={this.toggleView}>Login</p>
            {login}
          </li>
          <li className="modal-li session-modal-li btn" id="signup" onClick={this.toggleView}>
            <p className="modal-p" onClick={this.toggleView}>Sign Up</p>
            {signup}
          </li>
        </ul>
      );
    }
    return (
      <div id="modal-component" className="modal-component" onClick={this.closeModal}>
        <div id="modal-content" className="modal-content">
        <div id="cancel-btn btn" className="cancel-container"><button className="cancel-btn btn" tabIndex="1" role="button" onClick={this.closeModalBtn}>X</button></div>
          <ModalHeader username ={this.props.username}/>
          {sessionLIs}
          <ul className="modal-ul">
            <li className="modal-li btn" onClick={this.newGame}>New Game</li>
            <li className="modal-li btn">Leader Board</li>
          </ul>
        </div>
      </div>
    );
  }
});