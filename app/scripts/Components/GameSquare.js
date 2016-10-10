import React from 'react';

import store from '../store';

export default React.createClass({
  tapSquare() {
    console.log('tapping ' + this.props.color);
  },
  render() {
    return (<li className="game-square" onClick={this.tapSquare} ref={"color"+this.props.color}></li>);
  }
});
