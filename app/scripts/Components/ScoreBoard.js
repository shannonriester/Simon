import React from 'react';

import store from '../store';

export default React.createClass({
  startGame() {
    this.props.startGame();
  },
  render() {
    let hits = this.props.hits.length
    if (!this.props.hits.length) {
      hits = 0;
    }
    return (
      <div className="scoreboard-component">
        <h2 className="h2-level">Level: {this.props.level}</h2>
        <h5 className="h5-hits">No. of Hits: {hits}</h5>
      </div>
    )
  }
});
