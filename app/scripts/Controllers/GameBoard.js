import React from 'react';
import _ from 'underscore';

import store from '../store';
import Nav from './Nav';
import GameSquare from '../Components/GameSquare';
import StartButton from '../Components/StartButton';
import ScoreBoard from '../Components/ScoreBoard';
import WelcomeMessage from '../Components/WelcomeMessage';

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
      playedIntro: false,
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

      let soundColor = new Audio(`/assets/sounds/${newCurrColor}1.wav`);
      soundColor.play();

      window.setTimeout(() => {
        this.setState({flashColor: false});
        soundColor.pause();
        window.setTimeout(() => {
          if (mapCompHits.length) {

            this.flashColorArr(mapCompHits, timeout);
          } else {
            this.setState({
              showCompArr: false,
              playedIntro: true,
            });
            soundColor.pause();
          }
        }, timeout);

      }, secondTime);
  },
  updateState() {
    if (this.state.playedIntro) {
      this.setState({
        user: store.session.get('username'),
        compHits: store.game.get('compHits'),
        userHits: store.game.get('userHits'),
        userHitLevel: store.game.get('userHitLevel'),
        level: store.game.get('level'),
        gameOver: store.game.get('gameOver'),
        timeout: store.game.get('timeout'),
        playedIntro: true,
      });
      if (store.game.get('compHits').length > 0 && this.state.playedIntro) {
        this.flashColorArr(store.game.get('compHits'), store.game.get('timeout'));
      }
      if (store.game.get('gameOver')) {
        store.highScores.saveHighScore(this.state.user, this.state.userHitLevel.length, this.state.level);
      }
    }
  },
  playIntro() {
    let colorArr = ['red', 'green', 'yellow', 'blue', 'red', 'green', 'yellow', 'blue'];
    colorArr = _.shuffle(colorArr);
    this.flashColorArr(colorArr, 130);
    this.setState({welcomeMessage: true});
  },
  componentDidMount() {
      window.setTimeout(() => {
        this.playIntro();
      },1000);
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
                />);
    });
    return (
      <div className="gameboard-component" id={colorId}>
        <Nav />
        <WelcomeMessage username={this.state.user}/>
        <ScoreBoard hits={this.state.userHitLevel} level={this.state.level} welcome={this.state.playedIntro}/>
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
            gameOver={this.state.gameOver}
            />
        </div>

      </div>
    );
  }
});
