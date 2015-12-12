'use strict';

require('../css/style.styl');
require('./blah.js');

let listener = new window.keypress.Listener();
listener.on = listener.simple_combo;

let stage = new createjs.Stage('demoCanvas');
let circle = new createjs.Shape();
circle.graphics.beginFill('red').drawCircle(0, 0, 40);
circle.x = circle.y = 50;
stage.addChild(circle);

let player = new createjs.Shape();

stage.addChild(player);
player.graphics.beginFill('#393').drawRect(0, 0, 50, 50);
player.x = player.y = 100;

createjs.Tween.get(player).to({x: 300}, 1000);

createjs.Tween.get(circle, {loop: true})
  .to({
    x: 400
  }, 1000, createjs.Ease.getPowInOut(4))
  .to({
    alpha: 0,
    y: 175
  }, 500, createjs.Ease.getPowInOut(2))
  .to({
    alpha: 0,
    y: 225
  }, 100)
  .to({
    alpha: 1,
    y: 200
  }, 500, createjs.Ease.getPowInOut(2))
  .to({
    x: 100
  }, 800, createjs.Ease.getPowInOut(2));

createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage);

listener.on('left', () => player.x--);
