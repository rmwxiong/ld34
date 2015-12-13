import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 2;
const AABB = [0, 0, 300, 300];
const OBJECT_HEIGHT = 20;

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
      width: AABB[2],
      height: OBJECT_HEIGHT,
      y: (AABB[3] - OBJECT_HEIGHT) / 2
    });
    this.player = player;
    player.graphics.beginFill('#369').drawRect(0, 0, player.shape.width, player.shape.height);
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
