import Minigame from '../../minigame';
import {controls} from '../../controls';
import isTouching from '../../is-touching';
import Moveable from '../../moveable';
import renderKey from '../../key-template';
import _ from 'lodash';
import keyboard from 'keyboardjs';

const GAME_NAME = 'stay-between';
const PLAYER_SPEED = 1;
const AABB = [0, 0, 300, 300];
const LINE_HEIGHT = 5;
// const LINE_COUNT = 2;
const LINE_DISTANCE = AABB[3] / 4;
const MATCH_TIME = 20000;

export default class StayBetween extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME, {noShow: true});
    this.key0 = keys[0];
    this.key1 = keys[1];
    this.key2 = keys[2];
    this.key3 = keys[3];
    this.key4 = keys[4];
    this.key5 = keys[5];
    this.key6 = keys[6];
    this.key7 = keys[7];
    this.key8 = keys[8];

    this.setupStage();
    this.setupOverlay();
  }

  setupOverlay() {
    this.$container.append($('#brick-overlay-template').html());

    let $bricks = $('.brick');
    let KEYS = ['u', 'i', 'o', 'j', 'k', 'l', 'm', ',', '.'];
    _.forEach($bricks, (brickDiv, index) => {
      let key = KEYS[index];
      let keyDiv = $.parseHTML(renderKey(key));
      $(brickDiv).append(keyDiv);
      keyboard.bind(key, e => {
        $(keyDiv).addClass('pressed');
      }, () => {
        $(keyDiv).removeClass('pressed');
      });
    });
  }

  setupStage() {
    this.objects = [];
    this.timeLeft = MATCH_TIME;
    let brickContainer = new createjs.Container();
    this.bricks = [];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let brick = new createjs.Shape();
        brick.width = 100;
        brick.height = 100;
        brick.x = 100 * j;
        brick.y = 100 * i;
        brickContainer.addChild(brick);
        brick.graphics
          .setStrokeStyle(3)
          // .beginStroke('#369')
          .drawRect(0, 0, 100, 100);
        this.bricks.push(brick);
      }
    }

    this.bricks[0].graphics.beginFill('#393').drawRect(0, 0, 100, 100);

    this.stage.addChild(brickContainer);
    this.createPattern(2);
  }

  createPattern(count) {
    count = count || Math.floor(Math.random() * 3 + 1);

    let availableNums = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let randomNums = [];
    for (let i = 0; i < count; i++) {
      let randomNum = availableNums[Math.floor(Math.random() * availableNums.length)];
      availableNums.splice(availableNums.indexOf(randomNum), 1);
      randomNums.push(randomNum);
    }

    this.bricks.forEach((brick, index) => {
      brick.graphics.clear();
      brick.inPattern = (randomNums.indexOf(index) > -1);
      console.log(brick.inPattern);
    });

    console.log(this.bricks);
  }

  tick(event) {
    this.timeLeft -= event.delta;

    let matched = true;
    this.bricks.forEach((brick, index) => {
      if (brick.inPattern) {
        brick.graphics.clear();
        let proportionLeft = this.timeLeft / MATCH_TIME;
        let startPos = (50 - 50 * proportionLeft);
        let endPos = (100 * proportionLeft);
        brick.graphics.beginFill('#393').drawRect(startPos, startPos, endPos, endPos);
        if (!controls[this['key' + index]]) matched = false;
      } else if (controls[this['key' + index]]) {
        matched = false;
      }
    });

    if (matched) {
      this.timeLeft = MATCH_TIME;
      this.createPattern();
    }

    if (this.timeLeft <= 0) {
      document.dispatchEvent(new Event('lose'));
    }

    super.tick();
  }
}
