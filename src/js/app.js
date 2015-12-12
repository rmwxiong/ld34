'use strict';

require('../css/style.styl');
require('./blah.js');

let stage = new createjs.Stage('demoCanvas');
let circle = new createjs.Shape();
circle.graphics.beginFill('red').drawCircle(0, 0, 40);
circle.x = circle.y = 50;
stage.addChild(circle);

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

let listener = new window.keypress.Listener();
listener.on = listener.simple_combo;
listener.on('b', () => console.log('you pressed' + JSON.stringify(arguments)));

listener.counting_combo('a', function(e, count) {
  console.log("You've pressed this " + count + ' times.');
});
