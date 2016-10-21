import React from 'react';

import store from '../store';

export default React.createClass({
  closeModal(e) {
    console.log(e.target);
    if (e.target.id === 'modal-component' && e.target.id !== 'modal-content') {
      this.props.hideModal();
    }
  },
  closeModalBtn() {
    this.props.hideModal()
  },
  login() {
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password)
  },
  render() {
    let modal;
    if (this.props.modal === 'login') {
      modal = (
        <div className="modal-content-container login-modal">
          <div id="cancel-btn" className="cancel-container"><button className="cancel-btn" tabIndex="3" role="button" onClick={this.closeModalBtn}>X</button></div>
          <h2>Login</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabIndex="0" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabIndex="1" placeholder="username" role="textbox" ref="password"/>
            <button className="submit-btn" tabIndex="2" role="button" onClick={this.login}>Enter</button>
          </form>
        </div>
      );
    } else if (this.props.modal === 'signup') {
      modal = (
        <div className="modal-content-container login-modal">
          <div id="cancel-btn" className="cancel-container"><button className="cancel-btn" tabIndex="3" role="button" onClick={this.closeModalBtn}>X</button></div>
          <h2>Sign Up</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.signup}>
            <input type="text" tabIndex="0" placeholder="Choose a username?" role="textbox" ref="username"/>
            <input type="password" tabIndex="1" placeholder="password" role="textbox" ref="password1"/>
            <input type="password" tabIndex="2" placeholder="confirm password" role="textbox" ref="password2"/>
            <button className="submit-btn" tabIndex="3" role="button" onClick={this.signup}>Enter</button>
          </form>
        </div>
      );
    }

    return (
      <div id="modal-component" className="modal-component" onClick={this.closeModal}>
        <div id="modal-content" className="modal-content">
          {modal}
        </div>
      </div>
    )
  }
});
