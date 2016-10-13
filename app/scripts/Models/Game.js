import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  // urlRoot:`https://baas.kinvey.com/user/kid_BJ6LcoFC`,
  defaults: {
    player: '',
    score: 0,
    hits: [],
    userHits: [],
    highScore: 0,
    colors: ['green', 'red', 'yellow', 'blue'],
    currentColor: '',
  },
  restart: function() {
    this.set({
      hits: [],
      score: 0,
      userHits: [],
      currentColor: '',
    });
  },
  newGame: function() {
    this.restart();

    let newColor = this.randomColor(this.get('colors').length);
    this.set({
      score: 0,
      hits: [newColor],
      currentColor: [],
    });
    return newColor;
  },
  addHit() {
    let nextColor = this.randomColor(this.get('colors').length);
    let hitArr = this.get('hits').concat(nextColor);
    console.log('hitArr', hitArr);
    console.log('hitArr.lenght', hitArr.length);
    this.set({
      hits: hitArr,
      currentColor: nextColor,
      userHits: [],
    });
    return hitArr;
  },
  userHits(newHit) {
    let compHitsArr = this.get('hits');
    let userHitsArr = this.get('userHits').concat(newHit);

    console.log('compHitsArr', compHitsArr);
    console.log('userHitsArr', userHitsArr);
    if (compHitsArr.length !== userHitsArr.length) {
      for (var i=0; i < compHitsArr.length; i++) {
        if (userHitsArr[i] === compHitsArr[i]) {
          let newUserHitsArr = this.get('userHits').concat(newHit);
          this.set('userHits', newUserHitsArr);
          console.log('ok...keep going');
          return this.set('userHits', newUserHitsArr);
        } else {
          console.log('user guessed wrong!');
          this.restart();
        }
      }
    } else {
      compHitsArr.forEach((color, i) => {
        if (userHitsArr[i] === compHitsArr[i]) {
          console.log('right on! you guessed right');
          window.setTimeout(() => {
            this.addHit();
          },1000);
        } else {
          console.log('user guessed wrong!');
          this.restart();
        }
      });
    }
  },
  randomColor(colorsLength) {
    let randomColor = Math.floor(Math.random() * colorsLength);
    switch(randomColor) {
      case 0:
        return 'green';
        break;
      case 1:
        return 'red';
        break;
      case 2:
        return 'yellow';
        break;
      case 3:
        return 'blue';
        break;
    }
  },
});
