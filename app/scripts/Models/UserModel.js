import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_BJ6LcoFC`,
  defaults: {
    username: '',
    score: 0,
    hits: [],
    highScore: 0,
  },
});
