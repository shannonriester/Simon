import React from 'react';

import store from '../store';
import Nav from './Nav';
import GameSquare from './GameSquare';
import StartButton from './StartButton';
import ScoreBoard from './ScoreBoard';

export default React.createClass({
  getInitialState() {
    return {
      compHits: store.game.get('compHits'),
      userHits: store.game.get('userHits'),
      showCompArr: false,
      currentColor: '',
      currentCompHitsArr: [],
      flashColor: false,
      colorId: '',
    }
  },
  flashColorArr(compHitsArr) {
      let mapCompHits = compHitsArr.map((color, i) => {
        return color;
      });
      let newCurrColor = mapCompHits.shift();

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
            this.flashColorArr(mapCompHits);
          } else {
            this.setState({showCompArr: false});
          }
        }, 400);

      }, 800);
  },
  updateState() {
    this.setState({
      compHits: store.game.get('compHits'),
      userHits: store.game.get('userHits'),
    });
    this.flashColorArr(store.game.get('compHits'));
  },
  componentDidMount() {
    store.game.on('change update', this.updateState);
  },
  componentWillUnmount() {
    store.game.off('change update', this.updateState);
  },
  render() {
    let colorId;
    if (this.state.flashColor) {
      colorId = 'border-' + this.state.colorId;
    }
    console.log('this.state.colorId', this.state.colorId);

    let gameSquare = store.colors.map((color, i) => {
      let classLi = "outer-square " + color;
      let classDiv = "inner-square " + color + "Div";
      return (<GameSquare
                className="game-square"
                currentColor={this.state.currentColor}
                compHits={this.state.compHits}
                userHits={this.state.userHits}
                classLi={classLi}
                classDiv={classDiv}
                colorId={this.state.colorId}
                flashColor={this.state.flashColor}
                showCompArr={this.state.showCompArr}
                key={i}/>);
    });

    return (
      <div className="gameboard-component" id={colorId}>
        <Nav />
        <ScoreBoard level={this.state.compHits}/>
        <div className="gameboard-container">
          <ul className="gameboard">
            {gameSquare}
          </ul>
          <StartButton startGame={this.startGame}/>
        </div>

      </div>
    );
  }
});
