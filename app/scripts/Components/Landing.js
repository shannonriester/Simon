import React from 'react';
import { browserHistory } from 'react-router';

import store from '../store';
import Login from './InputForms/Login';
import Signup from './InputForms/SignUp';

export default React.createClass({
  getInitialState() {
    return {
      login: false,
      signup: false,
      session: store.session.toJSON(),
    }
  },
  greetSession(targetContainer) {
    this.setState({greetSession:targetContainer});

    // window.setTimeout(() => {
      // this.setState({
      //   greetSession: false,
      //   login: false,
      //   signup: false,
      // });
    // }, 1500);

  },
  showLogin() {
    this.setState({
      login: true,
      signup: false,
    });
  },
  hideLogin() {
    this.setState({login: false});
  },
  showSignup() {
    this.setState({
      login: false,
      signup: true,
    });
  },
  hideSignup() {
    this.setState({signup: false});
  },
  startGame() {
    browserHistory.push(`/GameBoard`);
  },
  leaderBoard() {
    browserHistory.push(`/LeaderBoard`);
  },
  updateSession() {
    this.setState({
      session: store.session.toJSON(),
    })
  },
  componentDidMount() {
    store.session.on('change', this.updateSession);
  },
  componentWillUnmount() {
    store.session.off('change', this.updateSession);
  },
  render() {
    let login;
    let signup;

    if (this.state.login) {
      login = (<Login hideLogin={this.hideLogin} greetSession={this.greetSession} greeting={this.state.greetSession} session={this.state.session}/>);
    } else if(!this.state.login){
      login = <h1 className="h1-landing" onClick={this.showLogin} onTouchEnd={this.showLogin}>Login</h1>;
    }

    if (this.state.signup) {
      signup = (<Signup hideSignup={this.hideSignup} greetSession={this.greetSession} greeting={this.state.greetSession} session={this.state.session}/>);
    } else {
      signup = <h1 className="h1-landing" onClick={this.showSignup} onTouchEnd={this.showSignup}>Sign Up</h1>;
    }

    return (
      <ul className="landing-component">
        <li className="landing-li outer-square greenDiv green" onClick={this.startGame} onTouchEnd={this.startGame} ref="green"><div className="landing-inner inner-square greenDiv btn"><h1 className="h1-landing">Game Board</h1></div></li>
        <li className="landing-li outer-square redDiv red " ref="red"><div className="Login landing-inner inner-square redDiv btn" >{login}</div></li>
        <li className="landing-li outer-square yellow" ref="yellow"><div className="landing-inner inner-square yellowDiv btn">{signup}</div></li>
        <li id="HighScore" className="landing-li outer-square blue" onClick={this.leaderBoard} ref="blue"><div className="landing-inner inner-square blueDiv btn"><h1 className="h1-landing">Leader Board</h1></div></li>
      </ul>
    );
  }
});
