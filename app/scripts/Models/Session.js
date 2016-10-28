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

    if (newHighScore > this.get('highScore')) {
      this.save({highScore: newHighScore});
    }
    this.save({gamesPlayed: numGames});
  },
  addGame() {
    let numGames = this.get('gamesPlayed');
    numGames = numGames + 1;
    if (this.get('username')) {
    this.set({gamesPlayed: numGames})
    }
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
        throw new Error('LOGIN FAILED');
      }
    });
  },
  signup(username, password, password2) {
    if (password === password2) {
      console.log('in the signup and matching passwords');

      this.save({
        username: username,
        password: password,
      },{
        url: `https://baas.kinvey.com/user/kid_BJ6LcoFC/`,
        type: 'POST',
        success: (model, response) => {
          // localStorage.removeItem('authtoken');
          this.unset('password');
          console.log('response in the sign up', response);
          localStorage.setItem('authtoken', response._kmd.authtoken);
        },
        error: function(model, response) {
          throw new Error('SIGN UP FAILED', response);
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
        localStorage.authtoken = '991879eb-0605-4ac7-9e90-0cf5b8e4e597.ZosH1NxXsgeFuWO4F7LAq7eWqjt0wf5zA2rp7Fmhwu4=';
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
