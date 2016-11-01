import React from 'react';

export default React.createClass({
  handleImgChange() {
    console.log('changing? ');
  },
  render() {
    return (
      <input className="modal-p input-file"
      type="file"
      ref="file"
      accept="image/*"
      onChange={this.handleImgChange} />);
  }
});
