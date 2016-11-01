import React from 'react';

export default React.createClass({
  render() {
    let greeting = (<p className="greeting">Hi, Welcome to Simon!</p>);
    if (this.props.username) {
      greeting = (<p className="greeting">Hi, {this.props.username}!</p>);
    }

    return (
      <header className="modal-header-component">
        <div className="greeting-container">
          <figure className="profile-pic" style={{backgroundImage:`url(${this.props.session.profilePic})`}} alt="profile picture"></figure>
          <figcaption>{greeting}</figcaption>
        </div>
      </header>
    );
  }
});
