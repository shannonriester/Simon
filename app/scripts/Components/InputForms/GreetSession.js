import React from 'react';

export default React.createClass({
  render() {
    let action;
    if (this.props.greeting === 'login') {
      action = 'You\'re all logged in (:'
    } else {
      action = 'Thanks for signing up!'
    }
    return (
      <div className="greet-session-component">
        <p className="greet-session-p">Hi, {this.props.session.username}.</p>
        <p className="greet-session-p">{action}</p>
        <p className="greet-session-p">Ready to play?</p>
      </div>
    );
  }
});
