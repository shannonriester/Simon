import React from 'react';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
  getInitialState() {
    return {
      games: store.gameCollection.toJSON(),
    }
  },
  updateState() {
    this.setState({games: store.gameCollection.toJSON()});
  },
  componentDidMount() {
    store.gameCollection.on('change', this.updateState);
  },
  render() {
    let userTable;
    console.log(this.state);
    if (this.state.users.length) {
      userTable = this.state.users.map((user, i) => {
        return user;
        // <tr className="user-row">
        //   <td>{user.username}</td>
        //   <td>{user.highScore}</td>
        //   <td>{user.highScoreDate}</td>
        // </tr>
      });
    }

    return (
      <div>
        <Nav />
        <table>
          {userTable}
        </table>
      </div>
    );
  }
});
