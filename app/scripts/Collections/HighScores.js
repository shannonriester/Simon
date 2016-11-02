import Backbone from 'backbone';
import _ from 'underscore';
import moment from 'moment';

import HighScore from '../Models/HighScore';

export default Backbone.Collection.extend({
  model: HighScore,
  url: `https://baas.kinvey.com/appdata/kid_BJ6LcoFC/HighScores`,
  compareHighScores(username, currentScore, level) {
    let models = this.models.map((model, i) => {
      model = model.toJSON();
      return model;
    });

    let sortedModels = _.sortBy(models, 'highScore').reverse();

    sortedModels.filter((game, i) => {
      if (currentScore > game.highScore) {
        let model = this.findWhere({_id: game._id});
        console.log('model', model);
        this.saveHighScore(username, currentScore, level);
        model.destroy();
      }
    });
  },
  findUsersGames(username) {
    return this.models.filter((game, i) => {
      if (game.player === username) {
        return game;
      }
    });
  },
  saveHighScore(username, newHighScore, level) {
    let date = moment().format('MM Do YYYY, h:mm a');
    let gameModel = this.findUsersGames(username);

    if (username !== '' && username !== "") {
      this.create({
        player: username,
        highScore: newHighScore,
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
  deleteModels() {
    let models = this.models.filter((game, i) => {
      game = game.toJSON();
      // console.log('game', game.player);
      if (game.player === '' || game.player === "") {
        // console.log('game', game);
        // game.destroy();
      }
    });
  }
});
