import React from 'react';
import $ from 'jquery';

import store from '../store';
import Nav from './Nav';
import GameSquare from '../Components/GameSquare';
import StartButton from '../Components/StartButton';
import ScoreBoard from '../Components/ScoreBoard';

export default React.createClass({
  getInitialState() {
    return {
      user: store.session.get('username'),
      compHits: store.game.get('compHits'),
      userHits: store.game.get('userHits'),
      userHitLevel: store.game.get('userHitLevel'),
      timeout: store.game.get('timeout'),
      level: store.game.get('level'),
      gameOver: store.game.get('gameOver'),
      showCompArr: false,
      currentColor: '',
      currentCompHitsArr: [],
      flashColor: false,
      colorId: '',
    }
  },
  flashColorArr(compHitsArr, timeout) {
      let mapCompHits = compHitsArr.map((color, i) => {
        return color;
      });
      let newCurrColor = mapCompHits.shift();
      let secondTime = timeout * 2;

      this.setState({
        showCompArr: true,
        flashColor: true,
        currentColor: newCurrColor,
        colorId: newCurrColor,
      });

      console.log('newCurrColor', newCurrColor);
      console.log(`/assets/sounds/${newCurrColor}.wav`);

      let soundColor = new Audio(`/assets/sounds/${newCurrColor}.wav`);
      soundColor.play();

      window.setTimeout(() => {
        this.setState({flashColor: false});
        soundColor.pause();
        window.setTimeout(() => {
          if (mapCompHits.length) {

            this.flashColorArr(mapCompHits, timeout);
          } else {
            this.setState({showCompArr: false});
            soundColor.pause();
          }
        }, timeout);

      }, secondTime);
  },
  updateState() {
    this.setState({
      user: store.session.get('username'),
      compHits: store.game.get('compHits'),
      userHits: store.game.get('userHits'),
      userHitLevel: store.game.get('userHitLevel'),
      level: store.game.get('level'),
      timeout: store.game.get('timeout'),
    });
    if (store.game.get('compHits').length > 0) {
      this.flashColorArr(store.game.get('compHits'), store.game.get('timeout'));
    }
    if (store.game.get('gameOver')) {
      store.highScores.compareHighScores(this.state.user, this.state.userHitLevel.length, this.state.level);
    }
  },
  componentDidMount() {
    store.game.on('change', this.updateState);
    store.session.on('change', this.updateState);
  },
  componentWillUnmount() {
    store.game.off('change', this.updateState);
    store.session.off('change', this.updateState);
    this.setState({showCompArr: false});

  },
  render() {
    let colorId;
    if (this.state.flashColor) {
      colorId = 'border-' + this.state.colorId;
    }

    let gameSquare = store.colors.map((color, i) => {
      let classLi = "outer-square " + color;
      let classDiv = "inner-square " + color + "Div";
      return (<GameSquare
                className="game-square"
                currentColor={this.state.currentColor}
                compHits={this.state.compHits}
                classLi={classLi}
                classDiv={classDiv}
                colorId={this.state.colorId}
                flashColor={this.state.flashColor}
                showCompArr={this.state.showCompArr}
                key={i}
                gameOver={this.state.gameOver}
                />);
    });
    return (
      <div className="gameboard-component" id={colorId}>
        <Nav />
        <ScoreBoard hits={this.state.userHitLevel} level={this.state.level}/>
        <div className="gameboard-container">
          <ul className="gameboard">
            {gameSquare}
          </ul>
          <StartButton
            startGame={this.startGame}
            resetUserHits={this.resetUserHits}
            flashColor={this.state.flashColor}
            compHits={this.state.compHits}
            showCompArr={this.state.showCompArr}
            />
        </div>

      </div>
    );
  }
});
