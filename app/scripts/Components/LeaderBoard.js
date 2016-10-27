import React from 'react';
import _ from 'underscore';

import store from '../store';
import Nav from '../Controllers/Nav';

export default React.createClass({
  getInitialState() {
    return {
      highScores: store.highScores.toJSON(),
    }
  },
  updateState() {
    this.setState({
      highScores: store.highScores.toJSON(),
    });
    if (this.state.highScores.length < 0) {
      store.highScores.fetch();
    }
  },
  componentDidMount() {
    store.highScores.fetch();

    store.highScores.on('change, update', this.updateState);
  },
  render() {
    let highScores;
    if (this.state.highScores.length) {
      this.state.highScores = _.sortBy(this.state.highScores, 'highScore').reverse();

      highScores = this.state.highScores.map((score, i) => {
        return (
            <tr className="player-row" key={i}>
              <td className="player-cell"><label className="rank">{i + 1}.</label> <p className="player-name">{score.player}</p></td>
              <td className="player-cell">{score.highScore}</td>
              <td className="player-cell">{score.level}</td>
              <td className="player-cell">{score.moment}</td>
            </tr>
        );
      });

      if (highScores.length > 10) {
        highScores = highScores.slice(0,10);
      }
    }

    return (
      <div className="gameboard-component leaderboard-component">
        <Nav />
        <table className="score-table">
        <colgroup span="4"></colgroup>
          <thead>
            <tr className="tr-theads">
              <th className="th-1">Player</th>
              <th className="th-2">High Score</th>
              <th className="th-3">Level</th>
              <th className="th-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {highScores}
          </tbody>
        </table>
      </div>
    );
  }
});
