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

        window.setTimeout(() => {
          if (hitsArr.length) {this.showColor(hitsArr);}
        }, 400);

      }, 800);

    } else {
      this.setState({
        currentColor: hitsArr[0],
        hoverColor: true,
        hoverId: 'hover-' + hitsArr[0],
      });
      window.setTimeout(()=> {
        this.setState({hoverColor: false});
      }, 800);
    }

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
