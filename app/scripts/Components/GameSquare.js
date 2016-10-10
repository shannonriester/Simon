import React from 'react';

import store from '../store';

export default React.createClass({
  tapSquare() {
    console.log('tapping ' + this.props.color);
  },
  render() {
    return (<li id={this.props.color} className="outter-square" onClick={this.tapSquare} ref={"color"+this.props.color}><div className="inner-square"></div></li>);
  }
});
