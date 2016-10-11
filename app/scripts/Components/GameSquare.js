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
  showColor(color) {
    // console.log(this);
    // console.log(color);

    this.setState({hoverColor: true});

    window.setTimeout(()=> {
      this.setState({hoverColor: false});
    }, 500);

  },
  componentWillReceiveProps(newProps) {
    if (newProps.currentColor) {
      this.setState({currentColor: newProps.currentColor});
      this.showColor(newProps.currentColor);
    }
  },
  render() {
    console.log('current color in the render', this.state.currentColor);

    let hoverColor;
    if (this.refs.li){
    let targetLiColor = this.refs.li.className.split(' ');
    if (targetLiColor[1] === this.state.currentColor && this.state.hoverColor) {
      console.log(targetLiColor[1]);
      console.log(this.refs.li.className.children);
      hoverColor = 'hover-' + this.state.currentColor;
    }
  }
    return (
      <li className={this.props.classLi} onClick={this.tapSquare} ref="li">
        <div id={hoverColor} className={this.props.classDiv} ref="div"></div>
      </li>);
  }
});
