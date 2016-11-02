import React from 'react';

import store from '../../store';

export default React.createClass({
  handleChange(e) {
    e.preventDefault();

    let file = e.target.files[0];
    store.session.uploadProfilePic(file);
  },
  render() {
    return (
      <input className="modal-p input-file btn"
      type="file"
      ref="file"
      accept="image/*"
      onChange={this.handleChange}
      required
     />);
  }
});
