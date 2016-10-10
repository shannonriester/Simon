import React from 'react';

import store from '../store';
import GameSquare from './GameSquare';

export default React.createClass({
  render() {
    let gameSquare = store.colors.map((color, i) => {
      return (<GameSquare className="game-square" color={color} key={i}/>);
    });
    return (
      <ul className="gameboard-component">
        {gameSquare}
      </ul>
    )
  }
});
