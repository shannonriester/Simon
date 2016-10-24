import ColorsCollection from './Collections/Colors';
import Users from './Collections/Users';
import Game from './Models/Game';
import Session from './Models/Session';

const store = {
  session: new Session(),
  userCollection: new Users(),
  game: new Game(),
  colors: ['green', 'red', 'yellow', 'blue'],
  settings: {
      appKey: 'kid_BJ6LcoFC',
      appSecret: '3bc50cb8c627411d8ea3732dc83f13e3',
      basicAuth: btoa('kid_BJ6LcoFC:3bc50cb8c627411d8ea3732dc83f13e3'),
  },
}

export default store;
