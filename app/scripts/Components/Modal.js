import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      login: false,
      signup: false,
    }
  }
  closeModal(e) {
    if (e.target.id === 'modal-component' && e.target.id !== 'modal-content') {
      this.props.hideModal();
    }
  },
  closeModalBtn() {
    this.props.hideModal()
  },
  toggleView(e) {
    e.preventDefault();
    let id = e.target.id
    this.setState({{id}: !this.state.login});
  }
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
  render() {
    let modal;
    let sessionLIs = (<li onClick={ store.game.logout(); }>Logout</li>);
    if (this.props.modal === 'login') {
      modal = (
        <div className="modal-content-container login-modal">
          <div id="cancel-btn" className="cancel-container"><button className="cancel-btn" tabIndex="1" role="button" onClick={this.closeModalBtn}>X</button></div>
          <h2>Login</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="username" role="textbox" ref="password"/>
            <button className="submit-btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
          </form>
        </div>
      );
    } else if (this.props.modal === 'signup') {
      modal = (
        <div className="modal-content-container login-modal">
          <div id="cancel-btn" className="cancel-container"><button className="cancel-btn" tabIndex="1" role="button" onClick={this.closeModalBtn}>X</button></div>
          <h2>Sign Up</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.signup}>
            <input type="text" tabIndex="2" placeholder="Choose a username?" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password1"/>
            <input type="password" tabIndex="4" placeholder="confirm password" role="textbox" ref="password2"/>
            <button className="submit-btn" tabIndex="5" role="button" onClick={this.signup}>Enter</button>
          </form>
        </div>
      );
    }


    if (this.props.username) {
      sessionLIs = (
        <li id="login" onClick={this.toggleView}>Login</li>
        <li id="signup" onClick={this.toggleView}>Sign Up</li>
      );
    }

    return (
      <div id="modal-component" className="modal-component" onClick={this.closeModal}>
        <div id="modal-content" className="modal-content">
          <ul>
            {sessionLIs}
          </ul>
          {modal}
        </div>
      </div>
    );
  }
});
