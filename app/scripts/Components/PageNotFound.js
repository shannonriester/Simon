import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render: function() {
    return (
      <div className="page-not-found-component">
        <h1>Lost page...</h1>
        <Link className="link" to="/"><h2>Oops! Did you get lost?</h2></Link>
      </div>
    );
  }
});
