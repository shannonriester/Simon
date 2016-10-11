import Backbone from 'backbone';

import ColorModel from '../Models/ColorModel';

export default Backbone.Collection.extend({
  model: ColorModel,
  colors: ['green', 'red', 'yellow', 'blue'],

});
