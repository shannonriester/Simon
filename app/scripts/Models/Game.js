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
    currentColor: '',
  },
  newGame: function(username) {
    // this.reset();
    this.set({
      score: 0,
      hits: [],
    });
    //randomColor(level, of all the colors )
    let newColor = this.randomColor(1, this.get('colors'));
    this.set('currentColor', newColor);
    // console.log('newColor', newColor);
    // this.set('hits', newColor);
    return newColor;
  },
  addHit(level) {
    let hitArr = this.get('hits');
    let newHit = this.randomColor(level);
    // console.log('newHit', newHit);
    hitArr.concat(newHit);
  },
  randomColor(level) {
    let randomColor = Math.floor(Math.random() * 4);
    switch(randomColor) {
      case 0:
        console.log('random color', 'green');
        return 'green';
        break;
      case 1:
        console.log('random color', 'red');
        return 'red';
        break;
      case 2:
        console.log('random color', 'yellow');
        return 'yellow';
        break;
      case 3:
        console.log('random color', 'blue');
        return 'blue';
        break;
    }
  },
});
