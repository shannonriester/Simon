import Backbone from 'backbone';
import moment from 'moment';

import HighScore from '../Models/HighScore';

export default Backbone.Collection.extend({
  model: HighScore,
  url: `https://baas.kinvey.com/appdata/kid_BJ6LcoFC/HighScores`,
  compareHighScores(username, userHitArr, level) {
    console.log('this.models', this.models);
    this.models.map((score, i) => {
      console.log('score', score);
      if (currentScore >= score) {
        console.log('new high score!');

        this.saveHighScore(username, userHitArr.length, level);
      }
    });
  },
  saveHighScore(username, score, level) {
    let date = moment().format('MM Do YYYY, h:mm a');
    console.log('score', score);
    this.create({
      player: username,
      highScore: score,
      level: level,
      moment: moment().format('MMMM Do YYYY, h:mm a'),
    }, {
      success: (model, response) => {
        console.log('SAVED HIGH SCORE');
      },
      error: function(response) {
        console.error('FAILED TO SAVE HIGH SCORE TO SERVER: ', response);
      }
    });
  },
});
