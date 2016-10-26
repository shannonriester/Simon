import Backbone from 'backbone';
import moment from 'moment';

import Game from '../Models/UserModel';

export default Backbone.Collection.extend({
  model: Game,
  url: `https://baas.kinvey.com/appdata/kid_BJ6LcoFC/HighScores`,
  compareHighScores(currentScore, username) {
    this.models.map((score, i) => {
      if (currentScore >= score) {
        console.log('new high score!');
        // let gameModel = score._id
        this.saveHighScore(username, score)
      }
    });
  },
  saveHighScore(username, score) {
    // this.models.find()
    let date = moment().format('MM Do YYYY, h:mm a');
    console.log(score);
    this.create({
      player: username,
      highScore: score,
      moment: moment().format('MM Do YYYY, h:mm a');
    })
  },
});
