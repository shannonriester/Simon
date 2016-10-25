import React from 'react';

import store from '../../store';

export default React.createClass({
  login(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    store.session.login(username, password);
  },
  closeLogin(e) {
    e.preventDefault();
    console.log(this.props);
    console.log(this.props.hideLogin);
    this.props.hideLogin();
  },
  render() {
      return (
        <form className="login-form-component landing-form">
          <div className="cancel-container cancel-landing-container"><button className="cancel-landing cancel-btn btn" tabIndex="1" role="button" onClick={this.closeLogin}>X</button></div>
          <h2 className="h2-landing">Login</h2>
          <input className="input-landing" type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
          <input className="input-landing" type="password" tabIndex="3" placeholder="password" role="textbox" ref="password"/>
          <button className="submit-btn submit-landing btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
        </form>
      );
  }
});
