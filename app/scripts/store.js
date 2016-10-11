import ColorsCollection from './Collections/Colors';
import ColorModel from './Models/ColorModel';
import Session from './Models/Session';

const store = {
  session: new Session(),
  colors: ['green', 'red', 'yellow', 'blue'],
}

export default store;
