'use strict';

import '../css/style.styl';
import keyboard from 'keyboardjs';
import {controls} from './controls';
import DodgeFalling from './games/two/dodge-falling';
import StayBetween from './games/two/stay-between';

(function() {
  createjs.Ticker.setFPS(60);
  controls.init(keyboard);

  let games = [];
  let game = new DodgeFalling(['left', 'right']);
  games.push(game);

  setTimeout(() => {
    let game2 = new StayBetween(['up', 'down']);
    games.push(game2);
  }, 5000);

  createjs.Ticker.addEventListener('tick', tick);

  function tick(event) {
    games.forEach(game => game.tick(event));
  }
})();
