import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  // urlRoot:`https://baas.kinvey.com/user/kid_BJ6LcoFC`,
  defaults: {
    player: '',
    score: 0,
    hits: [],
    highScore: 0,
    colors: ['green', 'red', 'yellow', 'blue'],
  },
  newGame: function(username) {
    // this.reset();
    this.set({
      score: 0,
      hits: [],
    });
    //randomColor(level, of all the colors )
    this.randomColor(1, this.get('colors'));
  },
  randomColor(level, colors) {
    let randomColor = Math.floor(Math.random() * colors.length);
    console.log('random color', randomColor);
  },
});
