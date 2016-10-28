import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    store.game.newGame();
  },
  render() {
    let id;
    let prompt = 'Game on...';
    if (!this.props.flashColor && this.props.compHits < 1) {
      id = "startGame"
    }
    if (this.props.compHits < 1) {
      prompt = 'Start Game';
    }

    return (
      <div id={id} className="start-btn-component btn" onClick={this.startGame}>
        {prompt}
      </div>
    )
  }
});
