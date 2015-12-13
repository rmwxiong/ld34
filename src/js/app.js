'use strict';

import '../css/style.styl';
import keyboard from 'keyboardjs';
import {controls} from './controls';
import DodgeFalling from './games/two/dodge-falling';
import StayBetween from './games/two/stay-between';
import Snapshot from './games/one/snapshot';
import bgm from 'file!../ld34bgm.mp3';

(function() {
  createjs.Ticker.setFPS(60);
  controls.init(keyboard);
  createjs.Ticker.addEventListener('tick', tick);
  let games = [];
  let gameSpawns = [];
  document.addEventListener('lose', onLoss);

  let highScore = localStorage.getItem('highScore') || 0;
  let score = 0;
  let startTime = Date.now();

  setupSounds();
  startGames();

  keyboard.bind('g', startGames);
  function setupSounds() {
    let sounds = [{
      id: 'bgm',
      src: bgm.substring(1)
    }];
    createjs.Sound.addEventListener('fileload', event => {
      createjs.Sound.play(event.src);
    });
    createjs.Sound.registerSounds(sounds, '/');
  }

  function startGames() {
    startTime = Date.now();
    score = 0;
    createjs.Ticker.setPaused(false);
    games.forEach(game => game.destroy());
    games = [];
    let game = new DodgeFalling(['left', 'right']);
    games.push(game);

    let game1spawn = setTimeout(() => {
      let game3 = new Snapshot(['space']);
      games.push(game3);
    }, 13710);
    gameSpawns.push(game1spawn);

    let game2spawn = setTimeout(() => {
      let game2 = new StayBetween(['up', 'down']);
      games.push(game2);
    }, 27420);
    gameSpawns.push(game2spawn);
  }

  function onLoss() {
    console.log('You lose');
    if (score > highScore) {
      console.log('New high score!');
      localStorage.setItem('highScore', score);
      highScore = score;
    }
    // alert('You lost, press G to restart');
    createjs.Ticker.setPaused(true);
    gameSpawns.forEach(spawn => clearTimeout(spawn));
  }

  function tick(event) {
    if (createjs.Ticker.getPaused()) return;
    games.forEach(game => game.tick(event));
    score = Math.floor((Date.now() - startTime) / 1000);
    $('.score').html(score);
  }
})();
