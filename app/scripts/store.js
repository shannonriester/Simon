import ColorsCollection from './Collections/Colors';
import Games from './Collections/Games';
import Game from './Models/Game';
import Session from './Models/Session';

const store = {
  session: new Session(),
  gameCollection: new Games(),
  game: new Game(),
  colors: ['green', 'red', 'yellow', 'blue'],
  settings: {
      appKey: 'kid_BJ6LcoFC',
      appSecret: '3bc50cb8c627411d8ea3732dc83f13e3',
      basicAuth: btoa('kid_BJ6LcoFC:3bc50cb8c627411d8ea3732dc83f13e3'),
  },
}

export default store;
