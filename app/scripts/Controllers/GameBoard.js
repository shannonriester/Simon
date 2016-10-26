import React from 'react';

import store from '../store';
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

      window.setTimeout(()=> {
        this.setState({flashColor: false});

        window.setTimeout(() => {
          if (mapCompHits.length) {
            this.flashColorArr(mapCompHits, timeout);
          } else {
            this.setState({showCompArr: false});
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

    this.flashColorArr(store.game.get('compHits'), store.game.get('timeout'));
    if (store.game.get('gameOver')) {
      // store.highScores.compareHighScores(this.state.user, this.state.userHitLevel, this.state.level);
      store.highScores.saveHighScore(this.state.user, this.state.userHitLevel.length, this.state.level);
    }
  },
  componentDidMount() {
    store.game.on('change', this.updateState);
  },
  componentWillUnmount() {
    store.game.off('change', this.updateState);
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
                key={i}/>);
    });
    return (
      <div className="gameboard-component" id={colorId}>
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
            />
        </div>

      </div>
    );
  }
});
