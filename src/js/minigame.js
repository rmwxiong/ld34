import {controls} from './controls';

export default class Minigame {
  constructor(keys, name) {
    this.id = name || Math.random().toString(36).substring(7);
    this.tick = this.tick.bind(this);
    this.initStage();
    keys.forEach(key => controls.setupKey(key, this.$container));
  }

  initStage() {
    let $canvas = $(`<canvas id=${this.id} width=300 height=300></canvas>`);
    let $container = $('<div class="game-container"></div>').append($canvas);
    $('.games').append($container);
    this.$canvas = $canvas;
    this.$container = $container;
    this.stage = new createjs.Stage($canvas[0]);
  }

  destroy() {
    this.stage.removeAllChildren();
    this.stage.update();
    this.$container.remove();
  }

  tick() {
    if (createjs.Ticker.getPaused()) return;
    this.stage.update();
  }
}
