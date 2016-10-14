import React from 'react';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: false,
      flashingColor: false,
      colorId: '',
      clickColor: '',
      hits: [],
      userHits: [],
    }
  },
  // flashColorArr(compHitsArr) {
  //   console.log('compHitsArr',compHitsArr);
      //
      // let totalColorsArr = [];
      // let newCurrColor = compHitsArr.shift();
      // totalColorsArr = totalColorsArr.concat(newCurrColor);
      // this.setState({
      //   currentColor: newCurrColor,
      //   flashingColor: true,
      //   colorId: 'color-' + newCurrColor,
      // });
      //
      // window.setTimeout(()=> {
      //   this.setState({flashingColor: false});
      //
      //   window.setTimeout(() => {
      //     console.log('am i infinate?');
      //     if (compHitsArr.length) {this.flashColorArr(compHitsArr);}
      //   }, 400);
      //
      // }, 800);
  // },
  selectSquare(e) {
    let className = e.target.className.split(' ')[1];
    let userHit = className.slice(0, className.length - 3);
    store.game.userHits(userHit);
  },
  render() {
    let id;
    console.log('this.props.colorId', this.props.colorId);
    console.log('this.props.currentColor', this.props.currentColor);
    console.log('this.props.flashColor', this.props.flashColor);
    if (this.refs.li) {
      console.log('this.refs.li.className.split()[1]', this.refs.li.className.split(' ')[1]);

    }
    if (this.props.flashColor && (this.refs.li.className.split(' ')[1] === this.props.currentColor)) {
        id = 'background-' + this.props.colorId;
        console.log('id', id);
      }
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={id} className={this.props.classDiv} ref="div"></div>
      </li>);
  }
});
