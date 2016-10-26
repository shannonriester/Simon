import React from 'react';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
  getInitialState() {
    return {
      username: store.session.get('username'),
    }
  },
  updateState() {
    this.setState({username: store.session.get('username')});

    if (this.state.username || store.session.get('username')) {
      let player = store.session.get('username');
      store.game.setPlayer(player);
      store.highScores.compareHighScores();
    }
  },
  componentDidMount() {
    store.session.on('change', this.updateState);

    store.highScores.fetch();
  },
  componentWillUnmount() {
    store.session.off('change', this.updateState);
  },
  render() {
    return (
      <div id="container">
        <Nav username={this.state.username}/>
        {this.props.children}
      </div>
    );
  }
});
