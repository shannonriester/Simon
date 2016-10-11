import React from 'react';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: false,
      hoverColor: false,
    }
  },
  showColor() {
    this.setState({hoverColor: true});
    window.setTimeout(()=> {
      this.setState({hoverColor: false});
    }, 500);
  },
  tapSquare() {
  },
  componentWillReceiveProps(newProps) {
    if (newProps.currentColor) {
      this.setState({currentColor: newProps.currentColor});
      this.showColor();
    }

  },
  componentDidMount(){

  },
  render() {
    console.log('color:', this.state.currentColor);
    let hoverColor;
    if (this.state.hoverColor) {
      hoverColor = 'hover-' + this.state.currentColor;
      console.log(hoverColor);
    }
    return (
      <li className={this.props.classLi} onClick={this.tapSquare} ref="li">
        <div id={hoverColor} className={this.props.classDiv} ref="innerDiv"></div>
      </li>);
  }
});
