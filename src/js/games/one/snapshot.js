import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'dodge-falling';
const PLAYER_SPEED = 2;
const AABB = [0, 0, 500, 500];
const BALL_SIZE = 50;

export default class DodgeFalling extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME);
    this.key = keys[0];

    this.setupStage();
  }

  setupStage() {
    let ball = new Moveable(this.stage, {
      aabb: AABB,
      width: BALL_SIZE,
      height: BALL_SIZE,
      y: (AABB[3] - BALL_SIZE) / 2,
      dx: 1
    });
    this.ball = ball;
    ball.graphics.beginFill('#393').drawCircle(0, 0, ball.shape.width);

    let target = new createjs.Shape();
    target.graphics.setStrokeStyle(3).beginStroke('#369').drawCircle(250, 250, 150);
    this.stage.addChild(target);
    this.stage.update();
  }

  tick(event) {
    if (controls[this.key]) {
    }

    this.ball.move();
    this.stage.update();
  }
}
