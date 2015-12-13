'use strict';

import '../css/style.styl';
import keyboard from 'keyboardjs';
import {controls} from './controls';
import DodgeFalling from './games/two/dodge-falling';
import StayBetween from './games/two/stay-between';
import Snapshot from './games/one/snapshot';

(function() {
  createjs.Ticker.setFPS(60);
  controls.init(keyboard);
  createjs.Ticker.addEventListener('tick', tick);
  let games = [];
  let gameSpawns = [];
  document.addEventListener('lose', onLoss);

  startGames();

  keyboard.bind('g', startGames);
  function startGames() {
    createjs.Ticker.setPaused(false);
    games.forEach(game => game.destroy());
    games = [];
    let game = new DodgeFalling(['left', 'right']);
    games.push(game);

    let game1spawn = setTimeout(() => {
      let game3 = new Snapshot(['space']);
      games.push(game3);
    }, 10000);
    gameSpawns.push(game1spawn);

    let game2spawn = setTimeout(() => {
      let game2 = new StayBetween(['up', 'down']);
      games.push(game2);
    }, 20000);
    gameSpawns.push(game2spawn);
  }

  function onLoss() {
    console.log('You lose');
    alert('You lost, press G to restart');
    createjs.Ticker.setPaused(true);
    gameSpawns.forEach(spawn => clearTimeout(spawn));
  }

  function tick(event) {
    if (createjs.Ticker.getPaused()) return;
    games.forEach(game => game.tick(event));
  }
})();
