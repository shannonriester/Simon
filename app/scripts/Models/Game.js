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
  newGame: function(username) {
    this.restart();

    let newColor = this.randomColor(this.get('colors').length);
    this.set({
      score: 0,
      hits: [newColor],
      currentColor: [newColor],
    });

    return newColor;
  },
  userHits(userHit, hits) {
    let hitArr = this.get('hits');
    let nextColor = this.randomColor(this.get('colors').length);
    let newHitArr = hitArr.concat(nextColor);


    this.set('userHits', []);
    let userHitArr = this.get('userHits');
    userHitArr = userHitArr.concat(userHit);

    if (userHitArr.length === hitArr.length) {
      newHitArr.forEach((hit, i) => {
        if (userHitArr[i] === newHitArr[i]) {
          console.log('user answer: ', userHitArr[i]);
          console.log('comp answer: ', newHitArr[i]);
        } else {
          console.log('user guessed wrong!');

        }
      });

      this.set({
        score: hitArr.length + 1,
        hits: newHitArr,
        userHits: userHitArr,
        currentColor: nextColor,
      });
    }


    // if (newUserHitArr === newHitArr) {
    //   window.setTimeout(() => {
    //     return true;
    //   },1000);
    //
    // } else {
    //   return false;
    // }

  },
  randomColor(colorsLength) {
    let randomColor = Math.floor(Math.random() * colorsLength);
    switch(randomColor) {
      case 0:
        // console.log('random color', 'green');
        return 'green';
        break;
      case 1:
        // console.log('random color', 'red');
        return 'red';
        break;
      case 2:
        // console.log('random color', 'yellow');
        return 'yellow';
        break;
      case 3:
        // console.log('random color', 'blue');
        return 'blue';
        break;
    }
  },
});
