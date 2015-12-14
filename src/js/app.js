'use strict';

import '../css/style.styl';
import keyboard from 'keyboardjs';
import {controls} from './controls';
import {menuController} from './menu-controller';
import DodgeFalling from './games/two/dodge-falling';
import StayBetween from './games/two/stay-between';
import Snapshot from './games/one/snapshot';
import Collect from './games/four/collect';
import Algebra from './games/numbers/algebra';
import ShapeMatching from './games/many/shape-matching';
import bgm from 'file!../ld34bgm.mp3';

const GAME_THRESHOLDS = [0, 14, 28, 41, 55, 69];

(function() {
  $('.body').show();
  setupSounds();
  createjs.Ticker.setFPS(60);
  createjs.Ticker.setPaused(true);
  controls.init(keyboard);
  createjs.Ticker.addEventListener('tick', tick);
  let games = [];
  let gameSpawns = [];
  let playBgm = () => createjs.Sound.play('bgm', {loop: 100});
  let realInstructionsShown = false;
  document.addEventListener('lose', onLoss);

  let highScore = localStorage.getItem('highScore') || 0;
  $('.high-score-value').html(highScore);
  let score = 0;
  let startTime = Date.now();
  let gameCount = 0;

  menuController.init(startGames);

  GAME_THRESHOLDS.forEach((threshold, index) => {
    let n = index + 1;
    if (highScore >= threshold) {
      if (n === 2) {
        menuController.showRealInstructions();
        realInstructionsShown = true;
      }
      menuController.unlockGame(n);
    }
  });
  if (highScore > 70) {
    menuController.unlockHard();
  }
  // startGames();

  let isHard = false;

  keyboard.bind('right', menuController.menuRight);
  keyboard.bind('left', menuController.menuLeft);
  keyboard.bind('down', menuController.startHard);

  function setupSounds() {
    let sounds = [{
      id: 'bgm',
      src: bgm.substring(1)
    }];
    createjs.Sound.addEventListener('fileload', event => {
      $('.loading').hide();
      $('.main-menu').show();
      playBgm = () => createjs.Sound.play(event.src, {loop: 100});
    });
    createjs.Sound.registerSounds(sounds, '/');
  }

  function addGame(Game, controls, time) {
    let gameSpawn = setTimeout(() => {
      let game = new Game(controls, undefined);
      games.push(game);
      gameCount++;
      $('.games').attr('class', 'games with-' + gameCount);
      if (gameCount > 1 && !realInstructionsShown) {
        menuController.showRealInstructions();
      }
      if (realInstructionsShown) {
        menuController.unlockGame(gameCount);
      }
    }, time);
    gameSpawns.push(gameSpawn);
  }

  function startGames(hardMode) {
    isHard = hardMode;
    $('.games').removeClass('lost');
    $('.score').show();
    gameCount = 0;
    menuController.hide();
    controls.reset();
    startTime = Date.now();
    score = hardMode ? 70 : 0;
    createjs.Ticker.setPaused(false);
    gameSpawns.forEach(spawn => clearTimeout(spawn));
    games.forEach(game => game.destroy());
    games = [];
    // let game = new Collect(['w', 'a', 's', 'd']);\
    playBgm();
    addGame(DodgeFalling, ['left', 'right'], 0);
    addGame(Snapshot, ['space'], hardMode ? 0 : 13710);
    addGame(StayBetween, ['up', 'down'], hardMode ? 0 : 27420);
    addGame(Collect, ['w', 'a', 's', 'd'], hardMode ? 0 : 41140);
    addGame(Algebra, ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
                      'num1', 'num2', 'num3', 'num4', 'num5', 'num6', 'num7', 'num8', 'num9', 'num0'
                      ], hardMode ? 0 : 54850);
    addGame(ShapeMatching, ['u', 'i', 'o', 'j', 'k', 'l', 'm', ',', '.'], hardMode ? 0 : 68570);
  }

  function anyKey() {
    $('.score').hide();
    $('.continue').hide();
    $(document).off('keydown', anyKey);
    $('.games').addClass('lost');
    menuController.showMenu();
    keyboard.bind('right', menuController.menuRight);
    keyboard.bind('left', menuController.menuLeft);
    keyboard.bind('down', menuController.startHard);
  }

  function onLoss() {
    controls.reset();
    createjs.Sound.stop('bgm');
    console.log('You lose');
    if (score > highScore) {
      console.log('New high score!');
      localStorage.setItem('highScore', score);
      highScore = score;
      $('.high-score-value').html(highScore);
    }

    if (highScore > 70) {
      menuController.unlockHard();
    }

    $('.last-score-value').html(score);
    createjs.Ticker.setPaused(true);
    gameSpawns.forEach(spawn => clearTimeout(spawn));

    // Set timeout add any key continue
    setTimeout(() => {
      $('.continue').show();
      $(document).on('keydown', anyKey);
    }, 500);
  }

  function tick(event) {
    if (createjs.Ticker.getPaused()) return;
    games.forEach(game => game.tick(event));
    console.log(score);
    score = Math.floor((Date.now() - startTime) / 1000);
    if (isHard) score += 70;
    $('.score').html(score);
  }
})();
