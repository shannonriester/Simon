import React from 'react';

export default React.createClass({
  render() {
    let classColor;
    console.log('color', this.props.color);
    if (this.props.color === 'green') {
      classColor = 'spanNeon1';
    } else if (this.props.color === 'red') {
      classColor = 'spanNeon2';
    } else if (this.props.color === 'yellow') {
      classColor = 'spanNeon3';
    } else if (this.props.color === 'blue') {
      classColor = 'spanNeon4';
    }

    return (
      <div className="welcome-message-container">
        <div className="welcome-message-content">
          <p>Hi{this.props.username}!</p>
          <p>Welcome to <span className={classColor}>Simon</span>!</p>
        </div>
      </div>
    );
  }
});
