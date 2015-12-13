import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';

const GAME_NAME = 'dodge-falling';
const AABB = [0, 0, 300, 300];
const BALL_SIZE = 25;

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
      y: (AABB[3] / 2),
      x: -300,
      dx: 10
    });
    this.ball = ball;
    ball.graphics.beginFill('#393').drawCircle(0, 0, ball.entity.width);

    let target = new createjs.Container();
    target.x = AABB[2] / 2;
    target.y = AABB[3] / 2;
    target.readyToFire = true;
    target.charge = 1;
    this.target = target;

    let ring = new createjs.Shape();
    target.ring = ring;
    target.r = ring.r = AABB[2] / 25;
    ring.graphics.setStrokeStyle(3);
    ring.drawArc = function(charge) {
      ring.graphics.clear();
      ring.graphics
        .setStrokeStyle(3)
        .beginStroke('#369')
        .arc(0, 0, ring.r, -0.5 * Math.PI, (charge - 0.25) * 2 * Math.PI);
    };
    ring.drawArc(1);
    target.updateCharge = function(delta) {
      target.charge += delta / 1500;
      if (target.charge < 1) {
        ring.alpha = target.charge;
        ring.drawArc(target.charge);
      } else {
        ring.drawArc(1);
        target.readyToFire = true;
      }
    };

    target.addChild(ring);
    this.stage.addChild(target);
    this.stage.update();
  }

  tick(event) {
    let target = this.target;
    let ball = this.ball;
    if (controls[this.key]) {
      if (target.readyToFire) {
        target.ring.graphics.beginFill('#69b')
          .drawCircle(0, 0, target.r);
        target.readyToFire = false;
        target.charge = 0;
        if (ball.entity.x - ball.entity.width < target.x + target.r &&
            ball.entity.x + ball.entity.width > target.x - target.r) {
          createjs.Tween.get(ball.entity)
            .to({alpha: 0, y: ball.entity.y - 50}, 500, createjs.Ease.quadOut)
            .call(() => {
              ball.moveTo(Math.random() * -2 * AABB[3], (AABB[3] / 2));
              ball.entity.alpha = 1;
            });
        }
      }
    }

    if (target.readyToFire === false) {
      target.updateCharge(event.delta);
    }

    this.ball.move();
    if (ball.entity.x + ball.entity.width > AABB[3]) {
      document.dispatchEvent(new Event('lose'));
      ball.moveTo(Math.random() * -2 * AABB[3], (AABB[3] / 2));
    }
    super.tick();
  }
}
