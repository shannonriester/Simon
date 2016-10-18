import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    let modal;
    if (this.props.modal === 'login') {
      modal = (
        <li className="modal-content-container login-modal">
          <h2>Login</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabindex="0" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabindex="1" placeholder="username" role="textbox" ref="password"/>
            <button className="submit-btn" tabindex="2" role="button" onClick={this.login}>Enter</button>
            <button className="cancel-btn" tabindex="3" role="button">Cancel</button>
          </form>
        </li>
      );
    } else if (this.props.modal === 'signup') {
      modal = (
        <li className="modal-content-container login-modal">
          <h2>Login</h2>
          <form className="login-form session-form" type="submit" onSubmit={this.signup}>
            <input type="text" tabindex="0" placeholder="what\'s your username?" role="textbox" ref="username"/>
            <input type="password" tabindex="1" placeholder="username" role="textbox" ref="password1"/>
            <input type="password" tabindex="2" placeholder="username" role="textbox" ref="password2"/>
            <button className="submit-btn" tabindex="3" role="button" onClick={this.signup}>Enter</button>
            <button className="cancel-btn" tabindex="4" role="button">Cancel</button>
          </form>
        </li>
      );
    }

    return (
      <div className="modal-component">
        <div className="modal-content">

          {modal}
        </div>
      </div>
    )
  }
});
