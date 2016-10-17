import React from 'react';
import { browserHistory, Route, Router } from 'react-router';

import store from './store';
import Landing from './Components/Landing';
import GameBoard from './Components/GameBoard';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Landing} />
    <Route path="/Home" component={Landing} />
    <Route path="/SimonSays" component={GameBoard} />
  </Router>
);

export default router;
