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
    // console.log(this.refs.li.children);
    console.log(this.state.currentColor);
    console.log();

    if (this.refs.li.children[0].className.indexOf(this.state.currentColor) !== -1) {
      console.log('props-color:',this.props.color);
      console.log('state-color:', this.state.currentColor);
      this.setState({hoverColor: true});
      window.setTimeout(()=> {
        this.setState({hoverColor: false});
      }, 200);
    }
  },
  tapSquare() {
  },
  componentWillReceiveProps(newProps) {
    this.setState({currentColor: newProps.currentColor});
    this.showColor();
  },
  componentDidMount(){

  },
  render() {
    let hoverColor;
    if (this.state.hoverColor) {
      hoverColor = 'hover-' + this.state.currentColor;
    }
    return (
      <li className={this.props.classLi} onClick={this.tapSquare} ref="li">
        <div id={hoverColor} className={this.props.classDiv} value={this.state.currentColor}></div>
      </li>);
  }
});
