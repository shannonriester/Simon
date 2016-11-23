#My Simon Game
  My version of the 1990's Simon game

##Live Site
[simon](simon-says.surge.sh)

##Features
  - Game Board  
    - Each game played will flash cool neon colors and play sounds when a color is flashed or when the player clicks on a game-square
  - Leader Board
    - Account holders highest scores can be added to the Leader Board if they are good enough ;)!
  - Logged-in users can upload a profile photo
  - Personal Best
    - Users can see their best games/scores

## Installation
- Clone this repo (or fork then clone, if you prefer)
- Run `npm install`
- if you get permission errors you may need to run `sudo npm install` to install a couple global dependencies

## Use
- `npm install` will scaffold your project AND start the dev server
- `npm start` will start the dev server and watch for changes
- `npm test` will run any test files included in the test folder
- `npm run deploy` will push the content of `dist/` to gh-pages
- When the server is running, your site will be live on [http://localhost:8080/](http://localhost:8080/)

## Dependencies
- `React.js`
- `Backbone.js`
- `underscore.js`
- `jQuery`
- `Sass` [install guide here](http://sass-lang.com/install)

## Back End
- BaaS, [Kinvey](https://www.kinvey.com)

to do
  - login/sign up interaction on the landing
  - game intro loading games (play intro theme)
