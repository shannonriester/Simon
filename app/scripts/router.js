import React from 'react';
import { browserHistory, Route, Router } from 'react-router';

import store from './store';
import Landing from './Components/Landing';
import GameBoard from './Controllers/GameBoard';
import LeaderBoard from './Components/LeaderBoard';
import PageNotFound from './Components/PageNotFound';

const router = (
  <Router history={browserHistory}>
      <Route path="/" component={Landing} />
      <Route path="/Home" component={Landing} />
      <Route path="GameBoard" component={GameBoard} />
      <Route path="GameBoard/Dashboard" component={GameBoard} />
      <Route path="/LeaderBoard" component={LeaderBoard} />
      <Route path="*" component={PageNotFound} />
  </Router>
);

export default router;
