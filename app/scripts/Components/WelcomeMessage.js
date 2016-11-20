import React from 'react';

export default React.createClass({
  render() {
    let classColor;
    let border;
    if (this.props.color === 'green') {
      border = 'border-green';
      classColor = 'spanNeon1';
    } else if (this.props.color === 'red') {
      border = 'border-red';
      classColor = 'spanNeon2';
    } else if (this.props.color === 'yellow') {
      border = 'border-yellow';
      classColor = 'spanNeon3';
    } else if (this.props.color === 'blue') {
      border = 'border-blue';
      classColor = 'spanNeon4';
    }

    return (
      <div className="welcome-message-container">
        <div id={border} className="welcome-message-content">
          <div className="message-content-container">
          <p>Welcome to <span className={classColor}>Simon</span>!</p>
          </div>
        </div>
      </div>
    );
  }
});
