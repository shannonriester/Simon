import React from 'react';

import store from '../../store';
import MImgUploader from './MImgUploader';

export default React.createClass({
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
    let signup;
    let login;

    if (this.props.login) {
      login = (
          <form className="login-form session-form" type="submit" onSubmit={this.login}>
            <input type="text" tabIndex="2" placeholder="username" role="textbox" ref="username"/>
            <input type="password" tabIndex="3" placeholder="password" role="textbox" ref="password"/>
            <button className="submit-btn btn" tabIndex="4" role="button" onClick={this.login}>Enter</button>
          </form>
      );
    } else if (this.props.signup) {
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
      return (
        <ul className="session-modal-ul modal-ul">
          <li className="modal-li session-modal-li btn">
            <p className="modal-p">Upload a Profile Pic</p>
            <MImgUploader/>
          </li>
          <li className="modal-li session-modal-li btn" onClick={this.logout}><p className="modal-p">Logout</p></li>
        </ul>);
    } else {
      return (
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
  }
});
