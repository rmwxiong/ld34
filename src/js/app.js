'use strict';

import '../css/style.styl';
import keyboard from 'keyboardjs';
import {controls} from './controls';
import Minigame from './minigame';

createjs.Ticker.setFPS(60);

controls.init(keyboard);
controls.setupKey('left');
controls.setupKey('right');

keyboard.bind('left', () => console.log('left press', controls.id));

let game = new Minigame(['left', 'right'], 'firstGame');

createjs.Ticker.addEventListener('tick', game.tick);
