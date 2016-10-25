import React from 'react';
import { browserHistory } from 'react-router';

import Login from './InputForms/Login';
import Signup from './InputForms/SignUp';

export default React.createClass({
  getInitialState() {
    return {
      login: false,
      signup: false,
    }
  },
  showLogin(e) {
    this.setState({
      login: true,
      signup: false,
    });
  },
  hideLogin() {
    console.log('working hideFunction on landing...');
    this.setState({login: false});
  },
  showSignup() {
    this.setState({
      login: true,
      signup: false,
    });
  },
  hideSignup() {
    this.setState({signup: false});
  },
  routeTo(e) {
    browserHistory.push(`/${e.target.id}`);
  },
  render() {
    let login;
    let signup;

    if (this.state.login) {
      login = (<Login hideLogin={this.hideLogin} />);
    } else if(!this.state.login){
      login = <h1 className="h1-landing" onClick={this.showLogin}>Login</h1>;
    }

    if (this.state.signup) {
      signup = (<Signup hideSignup={this.hideSignup} />);
    } else {
      signup = <h1 className="h1-landing" onClick={this.showSignup}>Sign Up</h1>;
    }


    return (
      <ul className="landing-component">
        <li id="StartGame" className="landing-li outer-square greenDiv green" onClick={this.routeTo} ref="green"><div className="landing-inner inner-square greenDiv btn">Start Game</div></li>
        <li className="landing-li outer-square redDiv red " ref="red"><div className="Login landing-inner inner-square redDiv btn" >{login}</div></li>
        <li className="SignUp landing-li outer-square yellow" ref="yellow"><div className="landing-inner inner-square yellowDiv btn">{signup}</div></li>
        <li id="HighScore" className="landing-li outer-square blue" onClick={this.routeTo} ref="blue"><div className="landing-inner inner-square blueDiv btn">High Score</div></li>
      </ul>
    );
  }
});
