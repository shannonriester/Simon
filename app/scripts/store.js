import ColorsCollection from './Collections/Colors';
import HighScores from './Collections/HighScores';
import Game from './Models/Game';
import Session from './Models/Session';

const store = {
  session: new Session(),
  highScores: new HighScores(),
  game: new Game(),
  colors: ['green', 'red', 'yellow', 'blue'],
  settings: {
      appKey: 'kid_BJ6LcoFC',
      appSecret: '3bc50cb8c627411d8ea3732dc83f13e3',
      basicAuth: btoa('kid_BJ6LcoFC:3bc50cb8c627411d8ea3732dc83f13e3'),
  },
  anon: {
    username: 'anon',
    authtoken: '991879eb-0605-4ac7-9e90-0cf5b8e4e597.ZosH1NxXsgeFuWO4F7LAq7eWqjt0wf5zA2rp7Fmhwu4=',
  }
}

export default store;
