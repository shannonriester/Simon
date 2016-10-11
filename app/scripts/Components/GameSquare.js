import React from 'react';

import store from '../store';

export default React.createClass({
  tapSquare() {
    console.log('tapping ' + this.props.color);
  },
  render() {
    let classNames = ("outter-square " + this.props.children);
    return (<li id={this.props.color} className={classNames} onClick={this.tapSquare} ref={"color"+this.props.color}><div className="inner-square"></div></li>);
  }
});
