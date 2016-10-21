import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    this.props.startGame();
  },
  render() {
    return (
      <div className="scoreboard-component">
        <h2 className="h2-level">Level: {this.props.level}</h2>
        <h5 className="h5-hits">No. of Hits: {this.props.hits}</h5>
      </div>
    )
  }
});
