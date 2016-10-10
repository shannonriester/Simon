import React from 'react';

import store from '../store';

export default React.createClass({
  tapSquare() {

  },
  render() {
    return (
        <li className="game-square" onClick={this.tapSquare} ref={this.props.color}></li>
    )
  }
});
