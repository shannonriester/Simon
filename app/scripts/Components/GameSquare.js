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
  showColor() {
    console.log(this.refs.innerDiv.id);
    window.setTimeout(()=> {

    }, 500);
  },
  tapSquare() {
    // console.log('tapping ' + this.props.color);
  },
  componentWillReceiveProps(newProps) {
    this.setState({
      currentColor: newProps.currentColor,
    });
  },
  componentDidMount(){},
  render() {
    // console.log(this.props.children);
    let color = this.state.currentColor;
    let classLi = ("outter-square " + color);
    let classDiv = ("inner-square " + color + "Div");

    return (
      <li className={this.props.classLi} onClick={this.tapSquare} ref="li">
        <div className={this.props.classDiv} ref="innerDiv"></div>
      </li>);
  }
});
