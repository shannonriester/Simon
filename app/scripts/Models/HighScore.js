import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/appdata/kid_BJ6LcoFC/HighScores`,
  defaults: {
    player: '',
    highScore: 0,
    level: 1,
    moment: '',
  },
});
