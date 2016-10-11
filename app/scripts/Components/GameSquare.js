import React from 'react';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: null,
      hoverColor: false,
    }
  },
  showColor(color) {
    // this.setState({hoverColor: true});
    // console.log(this.state.currentColor);
    // $(`#${color}`).trigger('hover');
    let currentColor = this.state.currentColor;
    this.refs.currentColor.SimulateNative.mouseOver();
    setTimeout(()=> {
      this.refs.currentColor.SimulateNative.mouseOut();
      // this.setState({hoverColor:false});
      // $(`#${color}`).trigger('mouseout');
    }, 500);
  },
  componentWillReceiveProps(newProps) {
    console.log('newProps', newProps.currentColor);
    this.setState({
      currentColor: newProps.currentColor,
    });
    this.showColor(newProps.currentColor);
  },
  tapSquare() {
    // console.log('tapping ' + this.props.color);
  },
  render() {
    let classNames = ("outter-square " + this.props.children);
    let color = this.state.currentColor;
    return (
      <li id={this.props.color} className={classNames} onClick={this.tapSquare} ref={color}>
        <div id={this.state.currentColor} className="inner-square"></div>
      </li>);
  }
});
