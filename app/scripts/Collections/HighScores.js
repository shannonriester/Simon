import Backbone from 'backbone';
import moment from 'moment';

import HighScore from '../Models/HighScore';

export default Backbone.Collection.extend({
  model: HighScore,
  url: `https://baas.kinvey.com/appdata/kid_BJ6LcoFC/HighScores`,
  compareHighScores(username, currentScore, level) {
    this.models.map((game, i) => {
      game = game.toJSON();
      if (currentScore >= game.highScore) {
        console.log('currentScore', currentScore);
        console.log('game.highScore', game.highScore);
        this.saveHighScore(username, currentScore, level);
      }
    });
  },
  findUsersGames(username) {
    this.models.map((game, i) => {
      console.log('game', game);
    });
  },
  saveHighScore(username, score, level) {
    let date = moment().format('MM Do YYYY, h:mm a');
    this.findUsersGames(username);

    if (username !== '') {
      this.create({
        player: username,
        highScore: score,
        level: level,
        moment: moment().format('MMM Do YYYY, h:mm a'),
      }, {
        success: (model, response) => {
          console.log('SAVED HIGH SCORE', response);
        },
        error: function(response) {
          console.error('FAILED TO SAVE HIGH SCORE TO SERVER: ', response);
        }
      });
    }
  },
});
