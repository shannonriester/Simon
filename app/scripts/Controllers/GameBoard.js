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
      flashColor: false,
      welcomeMessage: false,
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
            store.session.set('playedIntro', false);
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
  },
  playIntro() {
    if (!localStorage.getItem('playedIntro')) {
      let colorArr = ['red', 'green', 'yellow', 'blue', 'red', 'green', 'yellow', 'blue'];
      colorArr = _.shuffle(colorArr);

      let time = 300;
      let timeOut = time * colorArr.length;

      this.setState({welcomeMessage: true});
      this.flashColorArr(colorArr, time);
      localStorage.setItem('playedIntro', true);
    }
  },
  componentDidMount() {
    window.setTimeout(() => {
      if (!localStorage.getItem('playedIntro')) {
        this.playIntro();
      }
    }, 200);

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
    let welcomeMessage;

    if (this.state.flashColor) {
      colorId = 'border-' + this.state.currentColor;
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
                colorId={this.state.currentColor}
                flashColor={this.state.flashColor}
                showCompArr={this.state.showCompArr}
                key={i}
                />);
    });
    if (this.state.welcomeMessage &&
        !this.state.playedIntro &&
        !store.session.get('playedIntro') &&
        !this.state.compHits.length
      ) {
      welcomeMessage = (<WelcomeMessage username={this.state.user} color={this.state.currentColor}/>);
    }
    return (
      <div className="gameboard-component" id={colorId}>
        <Nav />
        {welcomeMessage}
        <ScoreBoard
          hits={this.state.userHitLevel}
          level={this.state.level}
          welcome={this.state.playedIntro}
          />

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
