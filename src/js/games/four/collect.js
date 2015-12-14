import Minigame from '../../minigame';
import {controls} from '../../controls';
import Moveable from '../../moveable';
import _ from 'lodash';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 2;
const AABB = [0, 0, 300, 300];
const COLLECT_TIME = 8;

export default class Collect extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME);
    this.key1 = keys[0];
    this.key2 = keys[1];
    this.key3 = keys[2];
    this.key4 = keys[3];
    this.collectables = [];
    this.timeToNextSpawn = 10000;

    this.setupStage();
  }

  Collectable(stage, options) {
    let collectable = new Moveable(stage, options);
    collectable.id = Math.random().toString(36).substring(7);
    collectable.charge = 1;
    collectable.ring = new createjs.Shape();
    collectable.drawArc = function(charge) {
      charge = charge || collectable.charge;
      collectable.ring.graphics.clear();
      collectable.ring.graphics
        .setStrokeStyle(collectable.r)
        .beginStroke('#393')
        .arc(0, 0, collectable.r / 2, -0.50001 * Math.PI, ((1 - charge) - 0.25) * 2 * Math.PI, true);
      collectable.ring.graphics
        .setStrokeStyle(3).drawCircle(0, 0, collectable.r);
    };
    collectable.drawArc();
    collectable.entity.addChild(collectable.ring);
    return collectable;
  }

  setupStage() {
    let player = new Moveable(this.stage, {
      aabb: AABB,
      r: 30,
      x: AABB[2] / 2,
      y: AABB[3] / 2,
      isCircleBounded: true
    });
    player.r = 30;
    this.player = player;
    player.graphics.beginFill('#369').drawCircle(0, 0, player.r);

    this.spawnCollectable();
  }

  getSpawnPosition() {
    let r = AABB[2] / 25;
    let potential = {
      r: r,
      x: Math.random() * (AABB[2] - 2 * r) + r,
      y: Math.random() * (AABB[2] - 2 * r) + r
    };

    if (this.isColliding(potential, this.player.entity)) {
      potential = this.getSpawnPosition();
    }

    return potential;
  }

  spawnCollectable(x, y) {
    let r = AABB[2] / 25;
    let spawnPos = this.getSpawnPosition();
    let collectable = new this.Collectable(this.stage, {
      aabb: AABB,
      r: r,
      x: x || spawnPos.x,
      y: y || spawnPos.y,
      isContainer: true,
      isCircleBounded: true
    });
    this.collectables.push(collectable);
  }

  movePlayer(event) {
    let xMove = 0;
    let yMove = 0;
    if (controls[this.key2]) {
      xMove = -event.delta / 10 * PLAYER_SPEED;
    } else if (controls[this.key4]) {
      xMove = event.delta / 10 * PLAYER_SPEED;
    }

    if (controls[this.key1]) {
      yMove = -event.delta / 10 * PLAYER_SPEED;
    } else if (controls[this.key3]) {
      yMove = event.delta / 10 * PLAYER_SPEED;
    }

    if (xMove || yMove) {
      this.player.moveBy(xMove, yMove);
    }
  }

  checkAndSpawn() {
    if (this.timeToNextSpawn <= 0) {
      this.timeToNextSpawn = 1000 * (COLLECT_TIME / 4) + 1000 * Math.random() * (COLLECT_TIME / 2);
      this.spawnCollectable();
    }
  }

  isColliding(circ1, circ2) {
    let dx = circ1.x - circ2.x;
    let dy = circ1.y - circ2.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    return (distance < circ1.r + circ2.r);
  }

  tick(event) {
    this.timeToNextSpawn -= event.delta;
    this.checkAndSpawn();

    let player = this.player;
    this.movePlayer(event);

    let thingsToRemove = [];
    this.collectables.forEach(collectable => {
      collectable.charge -= event.delta / (COLLECT_TIME * 1000);
      if (collectable.charge <= 0) {
        collectable.ring.graphics.clear();
        collectable.ring.graphics
          .setStrokeStyle(3).beginStroke('#911').drawCircle(0, 0, collectable.r);
        this.stage.update();
        document.dispatchEvent(new Event('lose', this.stage));
      } else {
        collectable.drawArc();
      }

      if (this.isColliding(collectable.entity, player.entity)) {
        thingsToRemove.push(collectable);
      }
    });

    thingsToRemove.forEach(thing => {
      this.stage.removeChild(thing.entity);
      _.remove(this.collectables, collectable => collectable === thing);
      if (this.collectables.length === 0) this.timeToNextSpawn *= 0.25;
    });

    super.tick();
  }
}
