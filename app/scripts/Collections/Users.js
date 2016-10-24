import Backbone from 'backbone';

import UserModel from '../Models/UserModel';

export default Backbone.Collection.extend({
  model: UserModel,
  url: `https://baas.kinvey.com/user/kid_BJ6LcoFC`,
});
