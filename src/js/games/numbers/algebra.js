import Minigame from '../../minigame';
import {controls} from '../../controls';
import Moveable from '../../moveable';
import _ from 'lodash';

const GAME_NAME = 'algebra';
const PLAYER_SPEED = 2;
const AABB = [0, 0, 300, 300];
const COLLECT_TIME = 8;
const ANSWER_TIME = 10000;

export default class Algebra extends Minigame {
  constructor(keys, name) {
    name = name || GAME_NAME;
    super(keys, GAME_NAME, {noShow: true});
    this.key1 = keys[0];
    this.key2 = keys[1];
    this.key3 = keys[2];
    this.key4 = keys[3];
    this.key5 = keys[4];
    this.key6 = keys[5];
    this.key7 = keys[6];
    this.key8 = keys[7];
    this.key9 = keys[8];
    this.key0 = keys[9];
    this.numKey1 = keys[10];
    this.numKey2 = keys[11];
    this.numKey3 = keys[12];
    this.numKey4 = keys[13];
    this.numKey5 = keys[14];
    this.numKey6 = keys[15];
    this.numKey7 = keys[16];
    this.numKey8 = keys[17];
    this.numKey9 = keys[18];
    this.numKey0 = keys[19];

    this.setupStage();

    this.firstNum = 0;
    this.timeLeft = 10000;
  }

  setupStage() {
    let textContainer = new createjs.Container();

    let questionNode = new createjs.Text('?', '48px Average Sans', '#369');
    questionNode.textBaseline = 'middle';
    questionNode.textAlign = 'center';
    questionNode.x = AABB[2] / 2;
    questionNode.y = AABB[3] / 2;
    textContainer.addChild(questionNode);
    this.questionNode = questionNode;

    let firstNumNode = new createjs.Text('116 + ', '48px Average Sans', '#ddd');
    firstNumNode.textBaseline = 'middle';
    firstNumNode.x = questionNode.x - firstNumNode.getMeasuredWidth() - 10;
    firstNumNode.y = AABB[3] / 2;
    textContainer.addChild(firstNumNode);
    this.firstNumNode = firstNumNode;

    let resultNode = new createjs.Text(' = 121', '48px Average Sans', '#ddd');
    resultNode.textBaseline = 'middle';
    resultNode.x = questionNode.x + 10;
    resultNode.y = AABB[3] / 2;
    textContainer.addChild(resultNode);
    this.resultNode = resultNode;

    this.stage.addChild(textContainer);

    let timeBar = new Moveable(this.stage, {
      aabb: AABB,
      width: AABB[2],
      height: 20,
      y: AABB[3] - 20
    });
    this.stage.addChild(timeBar.entity);
    timeBar.graphics.beginFill('#393').drawRect(0, 0, timeBar.entity.width, timeBar.entity.height);
    this.timeBar = timeBar;

    this.createNewQuestion();
  }

  createNewQuestion() {
    this.firstNum = Math.floor(Math.random() * 10);
    this.answer = Math.floor(Math.random() * 10);
    this.result = this.firstNum + this.answer;

    this.questionNode.color = '#369';
    this.questionNode.text = '?';
    this.firstNumNode.text = this.firstNum + ' + ';
    this.firstNumNode.x = this.questionNode.x - this.firstNumNode.getMeasuredWidth() - 10;
    this.resultNode.text = ' = ' + this.result;
  }

  tick(event) {
    this.timeLeft -= event.delta;
    let timeLeft = this.timeLeft;
    let timeBar = this.timeBar;
    timeBar.graphics.clear();
    timeBar.graphics.beginFill('#393').drawRect(0, 0, timeBar.entity.width * (timeLeft / ANSWER_TIME), timeBar.entity.height);

    if (timeLeft <= 0) {
      document.dispatchEvent(new Event('lose'));
    }

    let guess;
    if (controls[this.key1] || controls[this.numKey1]) {
      guess = 1;
    } else if (controls[this.key2] || controls[this.numKey2]) {
      guess = 2;
    } else if (controls[this.key3] || controls[this.numKey3]) {
      guess = 3;
    } else if (controls[this.key4] || controls[this.numKey4]) {
      guess = 4;
    } else if (controls[this.key5] || controls[this.numKey5]) {
      guess = 5;
    } else if (controls[this.key6] || controls[this.numKey6]) {
      guess = 6;
    } else if (controls[this.key7] || controls[this.numKey7]) {
      guess = 7;
    } else if (controls[this.key8] || controls[this.numKey8]) {
      guess = 8;
    } else if (controls[this.key9] || controls[this.numKey9]) {
      guess = 9;
    } else if (controls[this.key0] || controls[this.numKey0]) {
      guess = 0;
    }

    let hasGuess = !isNaN(parseFloat(guess)) && isFinite(guess);
    if (hasGuess && !this.wrongTime) {
      if (guess == this.answer) {
        this.questionNode.color = '#393';
        this.timeLeft = ANSWER_TIME + 500;
        this.wrongTime = ANSWER_TIME + 1500;
      } else {
        this.questionNode.color = '#911';
        this.wrongTime = timeLeft;
      }

      this.questionNode.text = guess;
    }

    if (this.wrongTime && this.wrongTime > this.timeLeft + 1500) {
      this.createNewQuestion();
      this.wrongTime = 0;
    }

    super.tick();
  }
}
