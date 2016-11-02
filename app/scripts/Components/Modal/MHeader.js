import React from 'react';

import store from '../../store';

export default React.createClass({
  render() {
    let greeting = (<p className="greeting">Hi, Welcome to Simon!</p>);
    let url = '/assets/Simon.png';

    if (localStorage.authtoken && localStorage.authtoken !== store.anon.authtoken) {
      greeting = (<p className="greeting">Hi, {this.props.session.username}! Welcome back =]</p>);
      url = this.props.session.profilePic;
    }

    return (
      <header className="modal-header-component">
        <div className="greeting-container">
          <figure className="profile-pic" style={{backgroundImage:`url(${url})`}} alt="profile picture"></figure>
          <figcaption>{greeting}</figcaption>
        </div>
      </header>
    );
  }
});
