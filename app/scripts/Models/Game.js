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
    userHitLevel: 0,
    highScore: 0,
    colors: ['green', 'red', 'yellow', 'blue'],
    level: 0,
  },
  restart: function() {
    this.set({
      score: 0,
      compHits: [],
      userHits: [],
      userHitLevel: 0,
      highScore: 0,
      colors: ['green', 'red', 'yellow', 'blue'],
      level: 0,
    });
  },
  newGame: function() {
    this.restart();

    let newCompHitsArr = [];
    let newColor = this.randomColor(this.get('colors').length);
    newCompHitsArr = newCompHitsArr.concat(newColor);
    this.set({
      compSliceArr: newCompHitsArr,
      compHits: newCompHitsArr,
      compSliceArr: newCompHitsArr,
    });
  },
  increaseTime(length) {
    length = length - 1;
    if (length - 1 >= 5) {
      this.set({level: 1});
      console.log('at level 5!');
    } else if (length - 1 >= 10) {
      this.set({level: 2});
      console.log('at level 10!');
    } else if (length - 1 >= 15) {
      this.set({level: 3});
      console.log('at level 15!');
    } else if (length - 1 >= 20) {
      this.set({level: 4});
      console.log('at level 20!');
    } else if (length - 1 >= 25) {
      this.set({level: 5});
      console.log('at level 25!');
    } else if (length - 1 >= 30) {
      this.set({level: 6});
      console.log('at level 30!');
    }
  },
  addLevel() {
    let nextColor = this.randomColor(this.get('colors').length);
    let nextCompHits = this.get('compHits').concat(nextColor);
    this.increaseTime(nextCompHits.length)

    console.log('nextCompHits.length', nextCompHits.length);
    window.setTimeout(() => {
      this.set({
        compHits: nextCompHits,
        compSliceArr: nextCompHits,
        level: 0,
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
    // console.log(userHitsArr);

    let n = userHitsArr.length - 1;

    if (userHitsArr.length === compHitsArr.length) {
      this.addLevel();
      let score = this.get('userHitLevel') + 1;
      this.set({userHitLevel: score});
    } else {
      this.checkUserInput(userHitsArr, compHitsArr, n);
      this.set({userHits: userHitsArr}, {silent: true });

      let score = this.get('userHitLevel') + 1;
      this.set({userHitLevel: score});
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
