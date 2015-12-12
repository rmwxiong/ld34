import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

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
    box.dy = 0;

    let player = new Moveable({
      aabb: [0, 0, 500, 500],
      width: 50,
      height: 50,
      x: 225,
      y: 450
    });
    this.player = player;
    this.stage.addChild(player.shape);
    player.graphics.beginFill('#393').drawRect(0, 0, 50, 50);
  }

  tick(event) {
    let box = this.box;
    let player = this.player.shape;
    if (isTouching(box, player)) {
      player.x = 0;
      box.y = 0;
      box.dy = 0;
    }

    if (controls.left) {
      player.x -= event.delta / 10 * PLAYER_SPEED;
    } else if (controls.right) {
      player.x += event.delta / 10 * PLAYER_SPEED;
    }

    box.dy += 0.2;
    box.y += box.dy;

    if (box.y > 500) {
      box.y = box.dy = 0;
    }

    this.stage.update();
  }
}
