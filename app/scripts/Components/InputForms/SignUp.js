import React from 'react';

import store from '../../store';

export default React.createClass({
  signup(e) {
    e.preventDefault();
    let username = this.refs.username.value;
    let password1 = this.refs.password1.value;
    let password2 = this.refs.password2.value;
    store.session.signup(username, password1, password2);

    if (localStorage.authtoken !== store.anon.authtoken) {
      this.props.hideSignup();
    }
  },
  closeSignup(e) {
    e.preventDefault();
    this.props.hideSignup();
  },
  render() {
      return (
        <form className="signup-form-component landing-form" onSubmit={this.signup}>
          <div className="cancel-container cancel-landing-container"><input type="button" value="X" className="cancel-landing cancel-btn btn" role="button" onClick={this.closeSignup} /></div>
          <h2 className="h2-landing">Sign Up</h2>
          <input className="input-landing" type="text" tabIndex="2" placeholder="Choose a username" role="textbox" ref="username"/>
          <input className="input-landing" type="password" tabIndex="3" placeholder="password" role="textbox" ref="password1"/>
          <input className="input-landing" type="password" tabIndex="4" placeholder="confirm password" role="textbox" ref="password2"/>
          <button className="submit-btn submit-landing btn" tabIndex="5" role="button" onClick={this.signup}>Enter</button>
        </form>
      );
  }
});
