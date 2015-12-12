'use strict';

import '../css/style.styl';
import keyboard from 'keyboardjs';
import {controls} from './controls';
import DodgeFalling from './games/two/dodge-falling';

createjs.Ticker.setFPS(60);
controls.init(keyboard);

let game = new DodgeFalling(['left', 'right'], 'firstGame');

createjs.Ticker.addEventListener('tick', tick);

function tick(event) {
  game.tick(event);
}
