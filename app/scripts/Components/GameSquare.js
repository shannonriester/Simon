import React from 'react';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: false,
      hoverColor: false,
      hoverId: '',
      hits: [],
      userHits: [],
    }
  },
  showColor(hitsArr) {
    let totalColorsArr = [];
    let newCurrColor = hitsArr.shift();

    totalColorsArr = totalColorsArr.concat(newCurrColor);

    this.setState({
      currentColor: newCurrColor,
      hoverColor: true,
      hoverId: 'hover-' + newCurrColor,
    });
    window.setTimeout(()=> {
      this.setState({hoverColor: false});
      if (hitsArr.length) {
        console.log('running recursive function...');
        this.showColor(hitsArr);
      }
    }, 500);
  },
  selectSquare(e) {
    let className = e.target.className.split(' ')[1];
    let userHit = className.slice(0, className.length - 3);
    store.game.userHits(userHit, this.state.hits);
  },
  componentWillReceiveProps(newProps) {
      this.setState({
        currentColor: newProps.currentColor,
        hits: newProps.hits,
        userHits: newProps.userHits,
      });
      // let hitsArr = newProps.hits;
      let hitsArr = ['red', 'blue', 'yellow'];

      this.showColor(hitsArr);
  },
  render() {
    let id;
    if (this.refs.li) {
      console.log('targeted li:', this.refs.li.className.split(' ')[1]);
      console.log('this.state.currentColor', this.state.currentColor);
      console.log(this.state.hoverColor);
      if ((this.refs.li.className.split(' ')[1] === this.state.currentColor) && this.state.hoverColor) {
        id = this.state.hoverId;
      }
    }
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={id} className={this.props.classDiv} ref="div"></div>
      </li>);
  }
});
