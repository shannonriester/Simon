import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import router from './router';
import store from './store';

$(document).ajaxSend(function(e, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('kinvey') !== -1 && jqueryAjax.url.indexOf('blob') === -1) {
    if (localStorage.authtoken) {
      if (localStorage.authtoken === store.anon.authtoken && jqueryAjax.url.indexOf('user') !== -1) {
        xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
      } else {
        xhrAjax.setRequestHeader('Authorization', `Kinvey ${localStorage.authtoken}`);
      }
    } else {
      xhrAjax.setRequestHeader('Authorization', `Basic ${store.settings.basicAuth}`);
    }
  }
});

if (localStorage.authtoken && localStorage.authtoken !== store.anon.authtoken) {
  store.session.retrieve();
} else if (!localStorage.authtoken) {
  localStorage.authtoken = store.anon.authtoken;
}

ReactDOM.render(router, document.getElementById('container'));
