import Backbone from 'backbone';

import UserModel from '../Models/UserModel';

export default Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/appdata/kid_BJ6LcoFC/Games`,
});
