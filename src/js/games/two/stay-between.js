import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'stay-between';
const PLAYER_SPEED = 1;
const AABB = [0, 0, 500, 500];
const LINE_HEIGHT = 10;
// const LINE_COUNT = 2;
const LINE_DISTANCE = AABB[3] / 4;

export default class StayBetween extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME);
    this.key1 = keys[0];
    this.key2 = keys[1];

    this.setupStage();
  }

  setupStage() {
    this.objects = [];
    let player = new Moveable(this.stage, {
      aabb: AABB,
      width: AABB[2],
      height: LINE_HEIGHT,
      y: (AABB[3] - LINE_HEIGHT) / 2
    });
    this.player = player;
    player.graphics.beginFill('#393').drawRect(0, 0, player.shape.width, player.shape.height);
    this.objects.push(player);

    this.lines = [];

    let line = new Moveable(this.stage, {
      aabb: AABB,
      width: 500,
      height: 10,
      y: this.player.shape.y - LINE_DISTANCE,
      dy: -2
    });
    this.lines.push(line);
    line.graphics.beginFill('#911').drawRect(0, 0, line.shape.width, line.shape.height);
    this.objects.push(line);

    let line2 = new Moveable(this.stage, {
      aabb: AABB,
      width: 500,
      height: 10,
      y: this.player.shape.y + LINE_DISTANCE,
      dy: -2
    });
    this.lines.push(line2);
    line2.graphics.beginFill('#911').drawRect(0, 0, line.shape.width, line.shape.height);
    this.objects.push(line2);
  }

  tick(event) {
    let player = this.player;

    this.lines.forEach(line => {
      if (isTouching(line, player)) {
        player.dy = 0;
        player.moveTo(0, AABB[3] / 2);
      }
    });

    // Add acceleration if pressed
    if (controls[this.key1]) {
      player.dy -= PLAYER_SPEED;
    } else if (controls[this.key2]) {
      player.dy += PLAYER_SPEED;
    }

    // Constantly slow
    player.dy *= 0.98;
    if (Math.abs(player.dy) < 0.001) player.dy = 0;

    this.objects.forEach(object => {
      // Check if wrapped screen
      if (object.shape.y < 0) {
        object.moveTo(0, AABB[3]);
      } else if (object.shape.y > AABB[3] - object.shape.height) {
        object.shape.y = AABB[3] - object.shape.height;
        if (object.dy > 0) object.dy = 0;
      }

      object.move(event.delta);
    });

    this.stage.update();
  }
}
