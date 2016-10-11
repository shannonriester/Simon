import ColorsCollection from './Collections/Colors';
import Game from './Models/Game';
import Session from './Models/Session';

const store = {
  session: new Session(),
  game: new Game(),
  colors: ['green', 'red', 'yellow', 'blue'],
}

export default store;
