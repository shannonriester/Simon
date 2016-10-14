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
  selectSquare(e) {
    let className = e.target.className.split(' ')[1];
    let userHit = className.slice(0, className.length - 3);
    store.game.userHits(userHit);
  },
  render() {
    let id;
    if (this.props.flashColor && (this.refs.li.className.split(' ')[1] === this.props.currentColor)) {
        id = 'background-' + this.props.colorId;
        console.log('id', id);
    }
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={id} className={this.props.classDiv} ref="div"></div>
      </li>
    );
  }
});
