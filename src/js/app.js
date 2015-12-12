'use strict';

require('../css/style.styl');
require('./blah.js');
import keyboard from 'keyboardjs';

const PLAYER_SPEED = 2;

class Controls {
  constructor(keyboard) {
    this.keyboard = keyboard;
  }

  setupKey(key) {
    this.keyboard.bind(key, () => this[key] = true, () => this[key] = false);
  }
}

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', tick);
let stage = new createjs.Stage('demoCanvas');

let controls = new Controls(keyboard);
controls.setupKey('left');
controls.setupKey('right');

let box = new createjs.Shape();
stage.addChild(box);
box.graphics.beginFill('#369').drawRect(0, 0, 50, 50);
box.width = box.height = 50;
box.x = 300;
box.y = 100;

let player = new createjs.Shape();
stage.addChild(player);
player.graphics.beginFill('#393').drawRect(0, 0, 50, 50);
player.width = player.height = 50;
player.x = 225;
player.y = 450;

function isTouching(rect1, rect2) {
  return !(rect1.x >= rect2.x + rect2.width ||
    rect1.x + rect1.width <= rect2.x ||
    rect1.y >= rect2.y + rect2.height ||
    rect1.y + rect1.height <= rect2.y);
}

function tick(event) {
  if (isTouching(box, player)) {
    player.x = 0;
  }
  if (controls.left) {
    player.x -= event.delta / 10 * PLAYER_SPEED;
  } else if (controls.right) {
    player.x += event.delta / 10 * PLAYER_SPEED;
  }

  stage.update();
}
