import React from 'react';

import store from '../../store';

export default React.createClass({
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password1.value;
    let password2 = this.refs.password2.value;
    store.session.signup(username, password, password2)
  },
  render() {
      return (
        <form className="signup-form-component signup-form session-form" onSubmit={this.login}>
          <h2>Login</h2>
          <input type="text" tabIndex="1" placeholder="Choose a username" role="textbox" ref="username"/>
          <input type="password" tabIndex="2" placeholder="password" role="textbox" ref="password1"/>
          <input type="password" tabIndex="3" placeholder="confirm password" role="textbox" ref="password2"/>
          <button className="submit-btn btn" tabIndex="4" role="button" onClick={this.signup}>Enter</button>
        </form>
      );
  }
});
