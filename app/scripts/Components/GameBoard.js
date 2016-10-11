import React from 'react';

import store from '../store';
import Nav from './Nav';
import GameSquare from './GameSquare';

export default React.createClass({
  render() {
    let gameSquare = store.colors.map((color, i) => {
      return (<GameSquare className="game-square" color={color} key={i}/>);
    });
    return (
      <div className="gameboard-component">
        <Nav />
        <ul className="gameboard">
          {gameSquare}
        </ul>
      </div>
    )
  }
});
