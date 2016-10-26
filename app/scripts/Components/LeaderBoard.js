import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      scores: store.highScores.toJSON(),
    }
  },
  updateState() {
    this.setState({scores: store.highScores.toJSON()});
  },
  componentDidMount() {
    store.highScores.fetch();

    store.highScores.on('change', this.updateState);
  },
  render() {
    let scores;
    console.log(this.state.scores);
    if (this.state.scores.length) {
      scores = this.state.scores.map((score, i) => {
        console.log('score', score);
        return score;
        // <tr className="user-row">
        //   <td>{user.username}</td>
        //   <td>{user.highScore}</td>
        //   <td>{user.highScoreDate}</td>
        // </tr>
      });
    }

    return (
      <div className="gameboard-component leaderboard-component">
        <table>
          {scores}
        </table>
      </div>
    );
  }
});
