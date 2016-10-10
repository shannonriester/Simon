import React from 'react';
import { browserHistory, Route, Router } from 'react-router';

import store from './store';
import GameBoard from './Components/GameBoard';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={GameBoard} />
  </Router>
);

export default router;