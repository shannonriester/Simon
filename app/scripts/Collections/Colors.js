import Backbone from 'backbone';

import GameModel from '../Models/Game';

export default Backbone.Collection.extend({
  model: GameModel,
  colors: ['green', 'red', 'yellow', 'blue'],
  // tones: ['E', 'A', 'C#', 'E'],
          //E-note (green) is at a lower octave than blue's E
});
