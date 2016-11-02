import React from 'react';

export default React.createClass({
  render() {
    return (
      <li>
        <p className="modal-p how-to-p">Simon How To:</p>
        <ol className="ol-directions">
          <li className="li-directions">To begin, press the <span className="span">'Start Game'</span> button.</li>
          <li className="li-directions">The computer will generate a random color and flash its neon color and play its sound.</li>
          <li className="li-directions">The player must click each generated color(s) in the same order as the computer generated pattern.</li>
          <li className="li-directions">After 5 'hits' (AKA, 'clicks'), the user proceeds to the next level, generating faster and faster patterns!</li>
        </ol>
      </li>
    );
  }
});
