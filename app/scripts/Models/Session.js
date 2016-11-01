import Backbone from 'backbone';
import $ from 'jquery';
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
    profilePic: 'http://www.fillmurray.com/g/400/400',
  },
  parse(response) {
    if (response) {
      return {
        _id: response._id,
        username: response.username,
        authtoken: response._kmd.authtoken,
        highScore: response.highScore,
        profilePic: response.profilePic,
      }
    }
  },
  convertImgFile: function(file) {
    let fileId;
    return new Promise((resolve, reject) => {
      this.postToKinveyFile(file)
        .then((kinveyFile) => {
          fileId = kinveyFile._id;
          this.putToGoogle(file, kinveyFile)
            .then(() => {
              this.getPicFromKinvey(fileId)
                .then((downloadURL) => {
                  resolve(downloadURL);
                })

            })
        })
    })
  },
  postToKinveyFile: function(file) {
      return $.ajax({
      url: 'https://baas.kinvey.com/blob/kid_BJ6LcoFC',
      type: 'POST',
      headers: {
        Authorization: 'Kinvey ' + localStorage.authtoken,
        "X-Kinvey-Content-Type": file.type,
      },
      contentType: 'application/json',
      data: JSON.stringify({
        _public: true,
        mimeType: file.type,
      })
    });
  },
  putToGoogle: function(file, kinveyFile){
    console.log('kinveyFile', kinveyFile);
    return $.ajax({
      url: kinveyFile._uploadURL,
      headers: kinveyFile._requiredHeaders,
      data: file,
      contentLength: file.size,
      type: 'PUT',
      processData: false,
      contentType: false,
      profilePic: '',
    });
  },
  getPicFromKinvey: function(fileId) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `https://baas.kinvey.com/blob/kid_BJ6LcoFC/${fileId}`,
        headers: {
          Authorization: 'Kinvey ' + localStorage.authtoken,
        },
      })
      .then((response) => {
        resolve(response._downloadURL);
      })
      .fail((e) => {
        console.error(e);
      })
    });
  },
  uploadProfilePic(file) {
    if (file) {
      this.convertImgFile(file).then((downloadURL) => {
        let profilePic = this.get('profilePic');
        profilePic = downloadURL;
        this.set('profilePic', profilePic);

        this.save(null, {
          type: 'PUT',
          url: `https://baas.kinvey.com/user/kid_BJ6LcoFC/${this.get('_id')}`,
          success: (response) => {
            // console.log(response);
          }
        });
      });
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
        localStorage.authtoken = 'f5b1b13a-7860-4d0b-9c0e-41aa50ad3c6c.fZqFhKmrDiWkGIhgPYiw/lKcya2rxRG+eT0LxNjrQ5M=';
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
