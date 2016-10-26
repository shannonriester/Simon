import Backbone from 'backbone';

export default Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/appdata/kid_BJ6LcoFC/Games`,
  defaults: {
    player: '',
    date: '',
    compSliceArr: [],
    compHits: [],
    userHits: [],
    userHitLevel: 0,
    highScore: 0,
    colors: ['green', 'red', 'yellow', 'blue'],
    level: 1,
    timeout: 400,
  },
  parse(response) {
    if (response) {
      return {
        _id: response._id,
        player: response.username,
        date: response.date,
      }
    }
  },
  setPlayer(username) {
    this.set({player: username});
  },
  restart: function() {
    this.set({
      score: 0,
      compHits: [],
      userHits: [],
      userHitLevel: 0,
      highScore: 0,
      colors: ['green', 'red', 'yellow', 'blue'],
      level: 1,
      timeout: 400,
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
    });
  },
  increaseTime(length) {
    length = length - 1;
    if (length === 5) {
      this.set({
        level: 2,
        timeout: 300,
      }, {silent: true});
      console.log('5 hits!');
    } else if (length === 10) {
      this.set({
        level: 3,
        timeout: 250,
      }, {silent: true});
      console.log('10 hits!');
    } else if (length === 15) {
      this.set({
        level: 4,
        timeout: 200,
      }, {silent: true});
      console.log('15 hits!');
    } else if (length === 20) {
      this.set({
        level: 5,
        timeout: 180,
      }, {silent: true});
      console.log('20 hits!');
    } else if (length === 25) {
      this.set({
        level: 6,
        timeout: 160,
      }, {silent: true});
      console.log('25 hits!');
    } else if (length === 30) {
      this.set({
        level: 7,
        timeout: 130,
      }, {silent: true});
      console.log('30 hits!');
    } else if (length === 35) {
      this.set({
        level: 8,
        timeout: 100,
      }, {silent: true});
      console.log('30 hits!');
    } else if (length === 40) {
      this.set({
        level: 9,
        timeout: 75,
      }, {silent: true});
      console.log('30 hits!');
    } else if (length === 45) {
      this.set({
        level: 10,
        timeout: 50,
      }, {silent: true});
      console.log('30 hits! Game over, you wierdo. Go do something fun outside ;)');
    }
  },
  addLevel() {
    let nextColor = this.randomColor(this.get('colors').length);
    let nextCompHits = this.get('compHits').concat(nextColor);

    window.setTimeout(() => {
      this.increaseTime(nextCompHits.length);
      this.set({
        compHits: nextCompHits,
        compSliceArr: nextCompHits,
        userHits: [],
      });
    }, 1100);
  },
  checkUserInput(userHitsArr, compHitsArr, n) {
    // store.session.saveGame(userHitsArr.length);
    if (userHitsArr[n] !== compHitsArr[n]) {
      store.highScores.compareHighScores()
      console.log('wrong!');
      this.restart();
    }
  },
  userHits(newHit, compHits) {
    let compHitsArr = this.get('compHits');
    let userHitsArr = this.get('userHits').concat(newHit);

    this.set({userHitLevel: userHitsArr}, {silent: true});

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
