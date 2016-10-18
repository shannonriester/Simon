import React from 'react';

import store from '../store';

export default React.createClass({
  render() {
    console.log(this.props.modal);

    return (
      <div className="modal-component">
        <div className="modal-content">

        </div>
      </div>
    )
  }
});
