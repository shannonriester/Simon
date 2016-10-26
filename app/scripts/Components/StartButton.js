import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    store.game.newGame();
  },
  render() {
    let id;
    if (!this.props.flashColor && this.props.compHits < 1) {
      id = "startGame"
    }
    return (
      <div id={id} className="start-btn-component btn" onClick={this.startGame}>
        Start Game
      </div>
    )
  }
});
