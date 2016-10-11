import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    let username = 'shannon';
    store.game.newGame(username);
  },
  render() {
    return (
      <div className="start-btn-component" onClick={this.startGame}>
        Start Game
      </div>
    )
  }
});
