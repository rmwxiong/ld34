import {controls} from './controls';

export default class Minigame {
  constructor(keys, name) {
    this.id = name || Math.random().toString(36).substring(7);
    this.tick = this.tick.bind(this);
    keys.forEach(key => controls.setupKey(key));

    this.initStage();
  }

  initStage() {
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 500;
    canvas.id = this.id;
    document.querySelector('body').appendChild(canvas);
    this.stage = new createjs.Stage(canvas);
  }

  tick() {}
}
