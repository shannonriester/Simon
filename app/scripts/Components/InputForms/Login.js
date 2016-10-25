import React from 'react';

import store from '../../store';

export default React.createClass({
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password);
  },
  render() {
      return (
        <form className="login-form-component login-form session-form" onSubmit={this.login}>
          <h2>Login</h2>
          <input type="text" tabIndex="1" placeholder="username" role="textbox" ref="username"/>
          <input type="password" tabIndex="2" placeholder="password" role="textbox" ref="password"/>
          <button className="submit-btn btn" tabIndex="3" role="button" onClick={this.login}>Enter</button>
        </form>
      );
  }
});
