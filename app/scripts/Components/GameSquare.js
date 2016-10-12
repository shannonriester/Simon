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
    if (hitsArr.length > 1) {
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
          this.showColor(hitsArr);
        }
      }, 500);

    } else {
      this.setState({
        currentColor: hitsArr[0],
        hoverColor: true,
        hoverId: 'hover-' + hitsArr[0],
      });
      window.setTimeout(()=> {
        this.setState({hoverColor: false});
      }, 500);
    }

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
      // let hitsArr = ['blue', 'red', 'yellow', 'green'];
      let hitsArr = newProps.hits;
      this.showColor(hitsArr);

  },
  componentDidMount() {

  },
  render() {
    let id;
    if (this.state.hoverColor) {
      let targetLiColor = this.refs.li.className.split(' ')[1];

      if (targetLiColor === this.state.currentColor) {
        id = this.state.hoverId;
      }

    }
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={id} className={this.props.classDiv} ref="div"></div>
      </li>);
  }
});
