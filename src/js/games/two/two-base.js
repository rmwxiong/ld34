import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 2;
const AABB = [0, 0, 500, 500];

export default class DodgeFalling extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME);
    this.key1 = keys[0];
    this.key2 = keys[1];

    this.setupStage();
  }

  setupStage() {
    let player = new Moveable(this.stage, {
      aabb: AABB,
      width: 50,
      height: 80,
      x: 225,
      y: AABB[3] - 80,
      isBounded: true
    });
    this.player = player;
    player.graphics.beginFill('#393').drawRect(0, 0, player.shape.width, player.shape.height);
  }

  tick(event) {
    let player = this.player;

    if (controls[this.key1]) {
      player.moveBy(-event.delta / 10 * PLAYER_SPEED);
    } else if (controls[this.key2]) {
      player.moveBy(event.delta / 10 * PLAYER_SPEED);
    }

    this.stage.update();
  }
}
