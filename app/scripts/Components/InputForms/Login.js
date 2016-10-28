import React from 'react';

import store from '../../store';

export default React.createClass({
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password);

    if (localStorage.authtoken !== store.anon.authtoken) {
      this.props.hideLogin();
    }
  },
  closeLogin(e) {
    e.preventDefault();
    this.props.hideLogin();
  },
  render() {
      return (
        <form className="login-form-component landing-form" onSubmit={this.login}>
          <div className="cancel-container cancel-landing-container"><input type="button" value="X" className="cancel-landing cancel-btn btn" role="button" onClick={this.closeLogin} /></div>
          <h2 className="h2-landing">Login</h2>
          <input className="input-landing" type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
          <input className="input-landing" type="password" tabIndex="3" placeholder="password" role="textbox" ref="password"/>
          <button className="submit-btn submit-landing btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
        </form>
      );
  }
});
