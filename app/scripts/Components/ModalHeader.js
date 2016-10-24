import React from 'react';

export default React.createClass({
  render() {
    let greeting;
    if (this.props.username) {
      greeting = (<p className="greeting">Hi, {this.props.username}!</p>);
    } else {
      greeting = (<p className="greeting">Hi, Welcome to Simon!</p>);
    }
    return (
      <header className="modal-header-component">
        <div className="greeting-container">
          <img className="profile-pic" src="http://www.fillmurray.com/g/400/400" alt="profile picture"/>
          {greeting}
        </div>
      </header>
    );
  }

});
