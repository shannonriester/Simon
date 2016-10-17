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
      currentColor: store.game.get('currentColor'),
      currentCompHitsArr: [],
      flashColor: false,
      colorId: '',
    }
  },
  flashColorArr(compHitsArr) {
    if (compHitsArr.length > 1) {
      let totalColorsArr = [];
      let newCurrColor = compHitsArr.shift();
      totalColorsArr = totalColorsArr.concat(newCurrColor);
      this.setState({
        flashColor: true,
        colorId: newCurrColor,
      });

      window.setTimeout(()=> {
        this.setState({flashColor: false});

        window.setTimeout(() => {
          if (compHitsArr.length) {this.flashColorArr(compHitsArr);}
        }, 400);

      }, 800);

    } else {
      this.setState({
        flashColor: true,
        colorId: compHitsArr[0],
      });
      window.setTimeout(()=> {
        this.setState({flashColor: false});
      }, 800);
    }
  },
  updateState() {
    this.setState({
      compHits: store.game.get('compHits'),
      userHits: store.game.get('userHits'),
      currentColor: store.game.get('currentColor'),
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
