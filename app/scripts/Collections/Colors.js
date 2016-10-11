import Backbone from 'backbone';

import GameModel from '../Models/Game';

export default Backbone.Collection.extend({
  model: GameModel,
  colors: ['green', 'red', 'yellow', 'blue'],

});
