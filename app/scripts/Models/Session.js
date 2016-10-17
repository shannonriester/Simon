import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_BJ6LcoFC`,
  defaults: {
    username: '',
    score: 0,
    userHits: [],
    highScore: 0,
    gamesPlayed: 0,
  },
  parse: function(response) {
    if (response) {
      return {
        username: response.username,
        _id: response._id,
        authtoken: response._kmd.authtoken,
        highScore: response.highScore,
        gamesPlayed: response.gamesPlayed,
      }
    }
  },
  login(username, password) {
    console.log();
  },
  signUp(username, password1, password2) {

  },
});
