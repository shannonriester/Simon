import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import router from './router';
import store from './store';

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (localStorage.authtoken) {
    if (localStorage.authtoken === store.anon.authtoken) {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${store.anon.authtoken}`);
    } else {
      xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
    }
  } else {
    xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
  }

});


if (localStorage.getItem('authtoken') && localStorage.authtoken !== store.anon.authtoken) {
  store.session.retrieve();
} else if (!localStorage.authtoken) {
  localStorage.authtoken = store.anon.authtoken;
}


ReactDOM.render(router, document.getElementById('container'));
