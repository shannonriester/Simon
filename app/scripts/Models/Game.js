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
  addLevel() {
    let nextColor = this.randomColor(this.get('colors').length);
    let hitArr = this.get('hits').concat(nextColor);
    window.setTimeout(() => {
      console.log('newHitArr: ', hitArr);

      this.set({
        hits: hitArr,
        currentColor: nextColor,
        userHits: [],
      });
    },1500);
    // return hitArr;
  },
  checkUserInput(userHitsArr, compHitsArr, n) {
    if (userHitsArr[n] === compHitsArr[n]) {
      console.log('good job..keep going...?');

      // console.log('newUserHitsArr:', userHitsArr);
    } else {
      console.log('wrong!');
      this.restart();
    }
  },
  userHits(newHit) {
    let compHitsArr = this.get('hits');
    let userHitsArr = this.get('userHits').concat(newHit);

    console.log('compHitsArr:', compHitsArr);
    console.log('userHitsArr:', userHitsArr);

    let n = userHitsArr.length - 1;

    if (userHitsArr.length === compHitsArr.length) {
      // window.setTimeout(() => {
      this.addLevel();
      // },1500);
    } else {
      this.checkUserInput(userHitsArr, compHitsArr, n);
      this.set({userHits: userHitsArr}, {silent: true });
    }


    // if (compHitsArr.length !== userHitsArr.length) {
    //   for (var i=0; i < compHitsArr.length; i++) {
    //     if (userHitsArr[i] === compHitsArr[i]) {
    //       userHitsArr = this.get('userHits').concat(newHit);
    //       // console.log('newUserHitsArr', newUserHitsArr);
    //       console.log('ok...keep going');
    //       return this.set('userHits', userHitsArr);
    //     } else {
    //       console.log('user guessed wrong!');
    //       this.restart();
    //     }
    //   }
    // } else if ((compHitsArr.length === userHitsArr.length)) {
    //   console.log('compHitsArr', compHitsArr);
    //   console.log('userHitsArr', userHitsArr);
    //   compHitsArr.forEach((color, i) => {
    //     if (userHitsArr[i] === compHitsArr[i]) {
    //       console.log('right on! you guessed right');
          // window.setTimeout(() => {
          //   this.addHit();
          // },1200);
    //     } else {
    //       console.log('user guessed wrong!');
    //       this.restart();
    //     }
    //   });
    // }
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
