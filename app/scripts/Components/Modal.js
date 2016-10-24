import React from 'react';

import store from '../store';
import ModalHeader from './ModalHeader';

export default React.createClass({
  getInitialState() {
    return {
      modal: false,
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
    this.setState({
      modal: !this.state.login,
      type: e.target.id,
    });
  },
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password)
  },
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password1.value;
    let password2 = this.refs.password2.value;
    store.session.signup(username, password, password2)
  },
  logout() {
    store.game.logout();
  },
  render() {
    let modal;
    let modalHeader;
    let sessionLIs = (
      <ul className="session-modal-ul modal-ul">
        <li className="modal-li session-modal-li btn" onClick={this.logout}>Logout</li>
      </ul>);

    if (this.state.modal && this.state.type === 'login') {
      modal = (
        <div className="modal-content-container login-modal">
          <h2>Login</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="username" role="textbox" ref="password"/>
            <button className="submit-btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
          </form>
        </div>
      );
    } else if (this.state.modal && this.state.type === 'signup') {
      modal = (
        <div className="modal-content-container login-modal">
          <h2>Sign Up</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.signup}>
            <input type="text" tabIndex="2" placeholder="Choose a username?" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password1"/>
            <input type="password" tabIndex="4" placeholder="confirm password" role="textbox" ref="password2"/>
            <button className="submit-btn btn" tabIndex="5" role="button" onClick={this.signup}>Enter</button>
          </form>
        </div>
      );
    }

    if (!this.props.username) {
      sessionLIs = (
        <ul className="session-modal-ul modal-ul">
          <li className="modal-li session-modal-li btn" id="login" onClick={this.toggleView}>Login {modal}</li>
          <li className="modal-li session-modal-li btn" id="signup" onClick={this.toggleView}>Sign Up {modal}</li>
        </ul>
      );
    } else {
      modalHeader = (<ModalHeader username ={this.props.username}/>);
    }

    return (
      <div id="modal-component" className="modal-component" onClick={this.closeModal}>
        <div id="modal-content" className="modal-content">
        <div id="cancel-btn" className="cancel-container"><button className="cancel-btn btn" tabIndex="1" role="button" onClick={this.closeModalBtn}>X</button></div>
          {modalHeader}
          {sessionLIs}
          <ul className="modal-ul">
            <li className="modal-li btn">High Score</li>
            <li className="modal-li btn">Leader Board</li>
          </ul>
        </div>
      </div>
    );
  }
});
