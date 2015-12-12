import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 4;

export default class DodgeFalling extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME);

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
