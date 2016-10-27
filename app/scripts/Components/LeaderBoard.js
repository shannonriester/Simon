import React from 'react';

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
      highScores = this.state.highScores.map((score, i) => {
        console.log('score', score);
        return (
          <tbody key={i}>
            <tr className="user-row">
              <td>{score.player}</td>
              <td>{score.highScore}</td>
              <td>{score.level}</td>
              <td>{score.moment}</td>
            </tr>
          </tbody>
        );
      });
    }

    return (
      <div className="gameboard-component leaderboard-component">
        <Nav />
        <table className="score-table">
          <thead>
            <tr>
              <th>Player</th>
              <th>High Score</th>
              <th>High Score</th>
              <th>Date</th>
            </tr>
          </thead>
            {highScores}
        </table>
      </div>
    );
  }
});
