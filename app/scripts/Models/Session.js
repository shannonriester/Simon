import Backbone from 'backbone';
import moment from 'moment';


export default Backbone.Model.extend({
  idAttribute: '_id',
  urlRoot:`https://baas.kinvey.com/user/kid_BJ6LcoFC`,
  defaults: {
    username: '',
    score: 0,
    userHits: [],
    highScore: 0,
    gamesPlayed: 0,
  },
  parse(response) {
    if (response) {
      return {
        _id: response._id,
        username: response.username,
        authtoken: response._kmd.authtoken,
        highScore: response.highScore,
      }
    }
  },
  saveGame(newHighScore) {
    let date = moment().format('MM Do YYYY, h:mm a');
    let numGames = this.get('gamesPlayed');
    numGames = numGames + 1;
    console.log('numGames', numGames);

    if (newHighScore > this.get('highScore')) {
      this.save({highScore: newHighScore});
    }
    this.save({gamesPlayed: numGames});
  },
  addGame() {
    let numGames = this.get('gamesPlayed');
    numGames = numGames + 1;
    this.set({gamesPlayed: })
  },
  login(username, password) {
    this.save({
      username: username,
      password: password,
    }, {
      url: `https://baas.kinvey.com/user/kid_BJ6LcoFC/login`,
      type: 'POST',
      success: (model, response) => {
        localStorage.setItem('authtoken', response._kmd.authtoken);
        this.unset('password');
      },
      error: function(model, response) {
        this.unset('username');
        this.unset('password');
        this.trigger('change');
        throw new Error('LOGIN FAILED');
      }
    });
  },
  signup(username, password, password2) {
    if (password === password2) {
      this.save({
        username: username,
        password: password,
      },{
        url: `https://baas.kinvey.com/user/kid_BJ6LcoFC/`,
        type: 'POST',
        success: (model, response) => {
          localStorage.setItem('authtoken', response._kmd.authtoken);
          this.unset('password');
        },
        error: function(model, response) {
          throw new Error('LOGIN FAILED');
        }
      });
    } else {
      console.log('PASSWORDS DON\'T MATCH');
    }
  },
  logout() {
    this.save(null, {
      url: `https://baas.kinvey.com/user/kid_BJ6LcoFC/_logout`,
      type: 'POST',
      success: (model, response) => {
        localStorage.clear();
        this.clear();
      },
      error: function(model, response) {
        throw new Error('LOGOUT FAILED');
      },
    });
  },
  retrieve() {
    this.fetch({
      url: `https://baas.kinvey.com/user/kid_BJ6LcoFC/_me`,
      success: (model, response) => {
        // console.log('RETRIEVED USER: ', this);
      },
      error: function(response) {
        throw new Error('COULD NOT FETCH USER', response);
      }
    });
  },
});
