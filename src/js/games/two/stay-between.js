import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'stay-between';
const PLAYER_SPEED = 1;
const AABB = [0, 0, 300, 300];
const LINE_HEIGHT = 5;
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
    player.graphics.beginFill('#369').drawRect(0, 0, player.entity.width, player.entity.height);
    this.objects.push(player);

    this.lines = [];

    let line = new Moveable(this.stage, {
      aabb: AABB,
      width: AABB[2],
      height: 10,
      y: this.player.entity.y - LINE_DISTANCE,
      dy: -2
    });
    this.lines.push(line);
    line.graphics.beginFill('#911').drawRect(0, 0, line.entity.width, line.entity.height);
    this.objects.push(line);

    let line2 = new Moveable(this.stage, {
      aabb: AABB,
      width: AABB[2],
      height: 10,
      y: this.player.entity.y + LINE_DISTANCE,
      dy: -2
    });
    this.lines.push(line2);
    line2.graphics.beginFill('#911').drawRect(0, 0, line.entity.width, line.entity.height);
    this.objects.push(line2);
  }

  tick(event) {
    let player = this.player;

    this.lines.forEach(line => {
      if (isTouching(line, player)) {
        document.dispatchEvent(new Event('lose'));
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
      if (object.entity.y < 0) {
        object.moveTo(0, AABB[3]);
      } else if (object.entity.y > AABB[3] - object.entity.height) {
        object.entity.y = AABB[3] - object.entity.height;
        if (object.dy > 0) object.dy = 0;
      }

      object.move(event.delta);
    });

    super.tick();
  }
}
