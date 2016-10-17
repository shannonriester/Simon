import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  // urlRoot:`https://baas.kinvey.com/user/kid_BJ6LcoFC`,
  defaults: {
    player: '',
    score: 0,
    compSliceArr: [],
    compHits: [],
    userHits: [],
    highScore: 0,
    colors: ['green', 'red', 'yellow', 'blue'],
    currentColor: '',
  },
  restart: function() {
    this.set({
      score: 0,
      compHits: [],
      userHits: [],
      highScore: 0,
      colors: ['green', 'red', 'yellow', 'blue'],
      currentColor: '',
    });
  },
  newGame: function() {
    this.restart();

    let newCompHitsArr = [];
    let newColor = this.randomColor(this.get('colors').length);
    newCompHitsArr = newCompHitsArr.concat(newColor);
    // console.log('newCompHitsArr', newCompHitsArr);
    this.set({
      compSliceArr: newCompHitsArr,
      compHits: newCompHitsArr,
      compSliceArr: newCompHitsArr,
      currentColor: newColor,
    });
  },
  addLevel() {
    let nextColor = this.randomColor(this.get('colors').length);
    let nextCompHits = this.get('compHits').concat(nextColor);

    window.setTimeout(() => {
      this.set({
        compHits: nextCompHits,
        compSliceArr: nextCompHits,
        currentColor: nextColor,
        userHits: [],
      });
    }, 1000);
  },
  checkUserInput(userHitsArr, compHitsArr, n) {
    if (userHitsArr[n] !== compHitsArr[n]) {
      console.log('wrong!');
      this.restart();
    }
  },
  userHits(newHit, compHits) {
    let compHitsArr = this.get('compHits');
    let userHitsArr = this.get('userHits').concat(newHit);

    let n = userHitsArr.length - 1;

    if (userHitsArr.length === compHitsArr.length) {
      this.addLevel();
    } else {
      this.checkUserInput(userHitsArr, compHitsArr, n);
      this.set({userHits: userHitsArr}, {silent: true });
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
