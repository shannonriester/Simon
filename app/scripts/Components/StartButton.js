import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    store.game.newGame();
  },
  render() {
    let id;
    let prompt;
    
    if (this.props.gameOver) {
      prompt = 'Game Over!'
    } else if (!this.props.showCompArr && this.props.compHits.length < 1) {
      prompt = 'Start Game'
      id = "startGame"
    } else if (this.props.showCompArr) {
      prompt = 'Simon says...'
    } else if (!this.props.showCompArr && this.props.compHits.length > 0) {
      prompt = 'Player\'s move';
    }

    return (
      <div id={id} className="start-btn-component btn" onClick={this.startGame}>
        <p className="prompt">{prompt}</p>
      </div>
    );
  }
});
