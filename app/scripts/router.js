import React from 'react';
import { browserHistory, Route, Router } from 'react-router';

import store from './store';
import Landing from './Components/Landing';
import GameBoard from './Components/GameBoard';
import LeaderBoard from './Components/LeaderBoard';

const router = (
  <Router history={browserHistory}>
    <Route path="/" component={Landing} />
    <Route path="/Home" component={Landing} />
    <Route path="/GameBoard" component={GameBoard} />
    {
      // <Route path="/GameBoard/Dashboard" component={GameBoard} showModal={false}/>
    }
    <Route path="/LeaderBoard" component={LeaderBoard} />
    <Route path="/*" component={GameBoard} />
  </Router>
);

export default router;
