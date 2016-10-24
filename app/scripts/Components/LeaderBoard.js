import React from 'react';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
  getInitialState() {
    return {
      games: store.gameCollection.toJSON(),
      // messages: store.messagesCollection.toJSON(),
    }
  },
  updateState() {
    this.setState({games: store.gameCollection.toJSON()});
  },
  componentDidMount() {
    // store.gameCollection.fetch();
    store.gameCollection.fetch();

    store.gameCollection.on('change', this.updateState);
  },
  render() {
    let games;
    console.log(this.state.games);
    if (this.state.games.length) {
      games = this.state.games.map((game, i) => {
        console.log('game', game);
        return game;
        // <tr className="user-row">
        //   <td>{user.username}</td>
        //   <td>{user.highScore}</td>
        //   <td>{user.highScoreDate}</td>
        // </tr>
      });
    }

    return (
      <div className="gameboard-component leaderboard-component">
        <Nav />
        <table>
          {games}
        </table>
      </div>
    );
  }
});
