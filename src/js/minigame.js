import {controls} from './controls';

export default class Minigame {
  constructor(keys, name) {
    this.id = name || Math.random().toString(36).substring(7);
    this.tick = this.tick.bind(this);
    this.initStage();
    keys.forEach(key => controls.setupKey(key, this.$container));
  }

  initStage() {
    let $canvas = $(`<canvas id=${this.id} width=500 height=500></canvas>`);
    let $container = $('<div class="game-container"></div>').append($canvas);
    $('body').append($container);
    this.$canvas = $canvas;
    this.$container = $container;
    this.stage = new createjs.Stage($canvas[0]);
  }

  tick() {}
}
