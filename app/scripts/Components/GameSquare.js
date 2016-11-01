import React from 'react';
import $ from 'jquery';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      clicked: false,
      clickColor: '',
    }
  },
  selectSquare(e) {
    if (!this.props.showCompArr) {
      let className = e.target.className.split(' ')[1];
      let userHit = className.slice(0, className.length - 3);

      store.game.userHits(userHit);

      this.setState({
        clicked: true,
        clickColor: userHit,
      });

      let soundColor = new Audio(`/assets/sounds/${userHit}1.wav`);
      soundColor.play();

      window.setTimeout(() => {
        this.setState({clicked: false});
      }, 200);
    }
  },
  render() {
    let id;
    if (this.props.flashColor && (this.refs.li.className.split(' ')[1] === this.props.currentColor)) {
        id = 'background-' + this.props.colorId;
    }
    if (this.state.clicked && (this.refs.li.className.split(' ')[1] === this.state.clickColor) && !this.props.showCompArr) {
      id = 'background-' + this.state.clickColor;
    }
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={id} className={this.props.classDiv} ref="div"></div>
      </li>
    );
  }
});
