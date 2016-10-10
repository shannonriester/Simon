import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot: '',
  defaults: {
    username: '',
    score: 0,
    hits: [],
    highScore: 0,
  },
});
