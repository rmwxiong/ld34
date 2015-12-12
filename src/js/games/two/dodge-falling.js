import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 4;
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
    let box = new Moveable(this.stage, {
      aabb: AABB,
      width: 50,
      height: 50,
      x: 300
    });
    this.box = box;
    box.graphics.beginFill('#369').drawRect(0, 0, 50, 50);

    let player = new Moveable(this.stage, {
      aabb: AABB,
      width: 50,
      height: 50,
      x: 225,
      y: 450,
      isBounded: true
    });
    this.player = player;
    player.graphics.beginFill('#393').drawRect(0, 0, 50, 50);
  }

  tick(event) {
    let box = this.box;
    let player = this.player;
    if (isTouching(box, player)) {
      player.moveTo(0);
      box.moveTo(undefined, 0);
      box.dy = 0;
    }

    if (controls[this.key1]) {
      player.moveBy(-event.delta / 10 * PLAYER_SPEED);
    } else if (controls[this.key2]) {
      player.moveBy(event.delta / 10 * PLAYER_SPEED);
    }

    box.dy += 0.05;
    box.move();

    if (box.shape.y >= box.aabb[3]) {
      box.moveTo(undefined, 0);
      box.dy = 0;
    }

    this.stage.update();
  }
}
