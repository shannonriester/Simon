import React from 'react';

import store from '../store';
import Nav from './Nav';

export default React.createClass({
  render() {
    return (
      <div id="container">
        {this.props.children}
      </div>
    );
  }
});
