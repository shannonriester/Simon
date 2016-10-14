import React from 'react';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: false,
      hoverColor: false,
      hoverId: '',
      clickColor: '',
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
      this.props.toggleBorderColor(newCurrColor);
      window.setTimeout(()=> {
        this.setState({hoverColor: false});

        window.setTimeout(() => {
          if (hitsArr.length) {this.showColor(hitsArr);}
        }, 400);
      }, 800);
  },
  selectSquare(e) {
    let className = e.target.className.split(' ')[1];
    let userHit = className.slice(0, className.length - 3);
    store.game.userHits(userHit);
  },
  componentWillReceiveProps(newProps) {
    let newHitsArr = [];
    if (newProps.hits.length !== this.props.hits) {
      newHitsArr = newHitsArr.concat(newProps.hits)
    }
    this.setState({
      currentColor: newProps.currentColor,
      hits: newProps.hits,
      userHits: newProps.userHits,
    });

    this.showColor(newHitsArr);
    // this.showColor(['blue','red','green']);
  },
  render() {
    let id;
    if (this.state.hoverColor && (this.refs.li.className.split(' ')[1] === this.state.currentColor)) {
        id = this.state.hoverId;
      }
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={id} className={this.props.classDiv} ref="div"></div>
      </li>);
  }
});
