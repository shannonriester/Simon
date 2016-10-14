import React from 'react';

import store from '../store';
import Nav from './Nav';
import GameSquare from './GameSquare';
import StartButton from './StartButton';
import ScoreBoard from './ScoreBoard';

export default React.createClass({
  getInitialState() {
    return {
      currentColor: store.game.get('currentColor'),
      hits: store.game.get('hits'),
      userHits: store.game.get('userHits'),
      showBorder: false,
      colorId: '',
    }
  },
  toggleBorderColor(color) {
    // this.setState({
    //   showBorder: true,
    //   colorId: 'border-' + color,
    // });
    // window.setTimeout(() => {
    //   this.setState({
    //     showBorder: false,
    //     colorId: '',
    //   });
    // }, 400);

  },
  startGame() {
    store.game.newGame();
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
    // store.session.on('change update', this.updateState);
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
                borderColorOn={this.borderColorOn}
                borderColorOff={this.borderColorOff}
                toggleBorderColor={this.toggleBorderColor}
                key={i}/>);
    });
    let id;
    // if (this.state.showBorder) {
      // id = this.state.colorId;
      // console.log('this.state.colorId',this.state.colorId);
    // }
    return (
      <div className="gameboard-component" id={id}>
        <Nav />
        <ScoreBoard level={this.state.hits}/>
        <div className="gameboard-container">
          <ul className="gameboard">
            {gameSquare}
          </ul>
          <StartButton startGame={this.startGame}/>
        </div>

      </div>
    )
  }
});
