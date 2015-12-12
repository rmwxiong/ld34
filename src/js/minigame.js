import isTouching from './is-touching';
import {controls} from './controls';

const PLAYER_SPEED = 4;

export default class Minigame {
  constructor(keys, name) {
    name = name || Math.random().toString(36).substring(7);
    this.tick = this.tick.bind(this);
    keys.forEach(function(key) {
      controls.setupKey(key);
    });

    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 500;
    canvas.id = name;
    this.name = name;
    document.querySelector('body').appendChild(canvas);
    this.stage = new createjs.Stage(name);
    this.setupStage();
  }

  setupStage() {
    let box = new createjs.Shape();
    this.box = box;
    this.stage.addChild(box);
    box.graphics.beginFill('#369').drawRect(0, 0, 50, 50);
    box.width = box.height = 50;
    box.x = 300;
    box.y = 100;

    let player = new createjs.Shape();
    this.player = player;
    this.stage.addChild(player);
    player.graphics.beginFill('#393').drawRect(0, 0, 50, 50);
    player.width = player.height = 50;
    player.x = 225;
    player.y = 450;
  }

  tick(event) {
    let box = this.box;
    let player = this.player;
    if (isTouching(box, player)) {
      player.x = 0;
    }
    if (controls.left) {
      player.x -= event.delta / 10 * PLAYER_SPEED;
    } else if (controls.right) {
      player.x += event.delta / 10 * PLAYER_SPEED;
    }

    this.stage.update();
  }

}
