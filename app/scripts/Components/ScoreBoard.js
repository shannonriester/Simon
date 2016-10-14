import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    this.props.startGame();
  },
  render() {
    return (
      <div className="scoreboard-component">
        <h2 className="h2-level">Level: {this.props.level.length}</h2>
      </div>
    )
  }
});
