import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 4;
const AABB = [0, 0, 300, 300];

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
      width: 60,
      height: 60,
      x: 200
    });
    this.box = box;
    box.graphics.beginFill('#911').drawRect(0, 0, box.shape.width, box.shape.height);
    box.reset = function() {
      box.moveTo(Math.random() * (AABB[2] - box.shape.width), 0);
      box.dy = 0;
    };

    let player = new Moveable(this.stage, {
      aabb: AABB,
      width: 30,
      height: 60,
      x: 150,
      y: AABB[3] - 60,
      isBounded: true
    });
    this.player = player;
    player.graphics.beginFill('#369').drawRect(0, 0, player.shape.width, player.shape.height);
  }

  tick(event) {
    let box = this.box;
    let player = this.player;
    if (isTouching(box, player)) {
      document.dispatchEvent(new Event('lose'));
      player.moveTo(0);
      box.reset();
    }

    if (controls[this.key1]) {
      player.moveBy(-event.delta / 10 * PLAYER_SPEED);
    } else if (controls[this.key2]) {
      player.moveBy(event.delta / 10 * PLAYER_SPEED);
    }

    box.dy += 0.2;
    box.move(event.delta);

    if (box.shape.y >= box.aabb[3]) {
      box.reset();
    }

    super.tick();
  }
}
