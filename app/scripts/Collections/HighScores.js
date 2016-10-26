import Backbone from 'backbone';

import Game from '../Models/UserModel';

export default Backbone.Collection.extend({
  model: Game,
  url: `https://baas.kinvey.com/appdata/kid_BJ6LcoFC/HighScores`,
  addHighScore(username, gameModel) {
    // this.models.find()
  },
});
