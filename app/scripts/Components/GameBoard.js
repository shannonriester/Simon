import React from 'react';

import store from '../store';
import Nav from './Nav';
import GameSquare from './GameSquare';
import StartButton from './StartButton';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: store.game.get('currentColor'),
      hits: store.game.get('hits'),
      userHits: store.game.get('userHits'),
    }
  },
  startGame() {
    let username = 'shannon';
    store.game.newGame(username);
  },
  updateState() {
    this.setState({
      currentColor: store.game.get('currentColor'),
      hits: store.game.get('hits'),
      userHits: store.game.get('userHits'),
    });
  },
  componentDidMount() {
    store.game.on('change update', this.updateState);
  },
  componentWillUnmount() {
    store.game.off('change update', this.updateState);
  },
  render() {
    let gameSquare = store.colors.map((color, i) => {
      let classLi = "outter-square " + color;
      let classDiv = "inner-square " + color + "Div";
      return (<GameSquare
                className="game-square"
                color={color}
                currentColor={this.state.currentColor}
                hits={this.state.hits}
                userHits={this.state.userHits}
                classLi={classLi}
                classDiv={classDiv}
                key={i}/>);
    });

    return (
      <div className="gameboard-component">
        <Nav />
        <ul className="gameboard">
          {gameSquare}
        </ul>
        <StartButton startGame={this.startGame}/>
      </div>
    )
  }
});
