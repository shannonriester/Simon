import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    store.game.newGame(store.session.get('username'));
  },
  render() {
    return (
      <div className="start-btn-component" onClick={this.startGame}>
        Start Game
      </div>
    )
  }
});
