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
    console.log('hitsArr', hitsArr);
    let totalColorsArr = [];
    let newCurrColor;
    if (hitsArr.length) {
      newCurrColor = hitsArr.shift();
      totalColorsArr = totalColorsArr.concat(newCurrColor);
    }


    this.setState({
      currentColor: newCurrColor,
      hoverColor: true,
    });

    window.setTimeout(()=> {
      if (this.refs.li) {
        this.state.hits.forEach((hitColor, i) => {
          if (this.refs.li.className.split(' ')[1] === this.state.hits[i] && this.state.hoverColor) {
              let hoverId = 'hover-' + this.state.hits[i];
              this.setState({hoverId: hoverId});
          }
        });
      }

    }, 500);

    if (totalColorsArr !== this.state.hits) {
      this.showColor();
    } else {
      this.setState({hoverColor: false});
    }

  },
  selectSquare(e) {
    let className = e.target.className.split(' ')[1];
    let userHit = className.slice(0, className.length - 3);
    store.game.userHits(userHit, this.state.hits);
  },
  componentWillReceiveProps(newProps) {
    if (newProps.currentColor) {
      this.setState({
        currentColor: newProps.currentColor,
        hits: newProps.hits,
        userHits: newProps.userHits,
      });
      this.showColor(newProps.hits);
    }
  },
  render() {
    // console.log('this.state.currentColor', this.state.currentColor);
    return (
      <li className={this.props.classLi} onClick={this.selectSquare} ref="li">
        <div id={this.state.hoverId} className={this.props.classDiv} ref="div"></div>
      </li>);
  }
});
