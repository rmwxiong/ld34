/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	__webpack_require__(2);

	var _keyboardjs = __webpack_require__(6);

	var _keyboardjs2 = _interopRequireDefault(_keyboardjs);

	var _controls = __webpack_require__(11);

	var _gamesTwoDodgeFalling = __webpack_require__(13);

	var _gamesTwoDodgeFalling2 = _interopRequireDefault(_gamesTwoDodgeFalling);

	var _gamesTwoStayBetween = __webpack_require__(17);

	var _gamesTwoStayBetween2 = _interopRequireDefault(_gamesTwoStayBetween);

	var _gamesOneSnapshot = __webpack_require__(18);

	var _gamesOneSnapshot2 = _interopRequireDefault(_gamesOneSnapshot);

	(function () {
	  alert('hi');
	  createjs.Ticker.setFPS(60);
	  _controls.controls.init(_keyboardjs2['default']);
	  createjs.Ticker.addEventListener('tick', tick);
	  var games = [];
	  var gameSpawns = [];
	  document.addEventListener('lose', onLoss);

	  startGames();

	  _keyboardjs2['default'].bind('g', startGames);
	  function startGames() {
	    createjs.Ticker.setPaused(false);
	    games.forEach(function (game) {
	      return game.destroy();
	    });
	    games = [];
	    var game = new _gamesTwoDodgeFalling2['default'](['left', 'right']);
	    games.push(game);

	    var game1spawn = setTimeout(function () {
	      var game3 = new _gamesOneSnapshot2['default'](['space']);
	      games.push(game3);
	    }, 10000);
	    gameSpawns.push(game1spawn);

	    var game2spawn = setTimeout(function () {
	      var game2 = new _gamesTwoStayBetween2['default'](['up', 'down']);
	      games.push(game2);
	    }, 20000);
	    gameSpawns.push(game2spawn);
	  }

	  function onLoss() {
	    console.log('You lose');
	    alert('You lost, press G to restart');
	    createjs.Ticker.setPaused(true);
	    gameSpawns.forEach(function (spawn) {
	      return clearTimeout(spawn);
	    });
	  }

	  function tick(event) {
	    if (createjs.Ticker.getPaused()) return;
	    games.forEach(function (game) {
	      return game.tick(event);
	    });
	  }
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./style.styl", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/stylus-loader/index.js!./style.styl");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, "body {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: 1px solid #ffd700;\n  height: 600px;\n  width: 900px;\n  display: flex;\n  color: #555;\n  font-family: 'Average Sans', sans-serif;\n  background-color: #1e1d1f;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\ncanvas {\n  background-color: #222;\n}\n.key {\n  opacity: 0.3;\n  background: #d3cfcc;\n  border-color: #ece8e4 #dedad6 #c9c4c4;\n  width: 40px;\n  height: 45px;\n  margin: 2px;\n  border-width: 3px 7px 10px;\n  border-style: solid;\n  border-radius: 4px;\n  float: left;\n  animation: keyIn 1s;\n}\n.key.pressed {\n  opacity: 0.6;\n  -webkit-transform: scale(0.95, 0.95);\n  -moz-transform: scale(0.95, 0.95);\n  -ms-transform: scale(0.95, 0.95);\n  -o-transform: scale(0.95, 0.95);\n  transform: scale(0.95, 0.95);\n}\n.game-container {\n  display: flex;\n  position: relative;\n  animation: fadeIn 1s;\n}\n.keys {\n  position: absolute;\n  top: 5px;\n  left: 5px;\n  animation: keysIn 1s;\n}\n.keycap {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  height: 45px;\n  font-size: 18px;\n  line-height: 1;\n  background: #f5f3f1;\n  background: -webkit-linear-gradient(left, #e5e2e1, #f5f3f1, #e5e2e1);\n  background: -moz-linear-gradient(left, #e5e2e1, #f5f3f1, #e5e2e1);\n  background: -ms-linear-gradient(left, #e5e2e1, #f5f3f1, #e5e2e1);\n  background: -o-linear-gradient(left, #e5e2e1, #f5f3f1, #e5e2e1);\n  background: linear-gradient(left, #e5e2e1, #f5f3f1, #e5e2e1);\n  box-shadow: 0 0 10px rgba(0,0,0,0.15);\n  border-radius: 4px;\n  position: relative;\n}\n.arrow-down span {\n  transform: rotate(90deg);\n}\n.arrow-left span {\n  transform: rotate(180deg);\n}\n.arrow-up span {\n  transform: rotate(270deg);\n}\n@-moz-keyframes keyIn {\n  0% {\n    oapcity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.3;\n  }\n}\n@-webkit-keyframes keyIn {\n  0% {\n    oapcity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.3;\n  }\n}\n@-o-keyframes keyIn {\n  0% {\n    oapcity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.3;\n  }\n}\n@keyframes keyIn {\n  0% {\n    oapcity: 0;\n  }\n  50% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.3;\n  }\n}\n@-moz-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-o-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-moz-keyframes keysIn {\n  0% {\n    opacity: 0;\n    transform: translate(90px, 90px);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.2) translate(70px, 70px);\n  }\n}\n@-webkit-keyframes keysIn {\n  0% {\n    opacity: 0;\n    transform: translate(90px, 90px);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.2) translate(70px, 70px);\n  }\n}\n@-o-keyframes keysIn {\n  0% {\n    opacity: 0;\n    transform: translate(90px, 90px);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.2) translate(70px, 70px);\n  }\n}\n@keyframes keysIn {\n  0% {\n    opacity: 0;\n    transform: translate(90px, 90px);\n  }\n  50% {\n    opacity: 1;\n    transform: scale(1.2) translate(70px, 70px);\n  }\n}\n", ""]);

/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	
	var Keyboard = __webpack_require__(7);
	var Locale   = __webpack_require__(8);
	var KeyCombo = __webpack_require__(9);

	var keyboard = new Keyboard();

	keyboard.setLocale('us', __webpack_require__(10));

	exports          = module.exports = keyboard;
	exports.Keyboard = Keyboard;
	exports.Locale   = Locale;
	exports.KeyCombo = KeyCombo;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {
	var Locale = __webpack_require__(8);
	var KeyCombo = __webpack_require__(9);


	function Keyboard(targetWindow, targetElement, platform, userAgent) {
	  this._locale               = null;
	  this._currentContext       = null;
	  this._contexts             = {};
	  this._listeners            = [];
	  this._appliedListeners     = [];
	  this._locales              = {};
	  this._targetElement        = null;
	  this._targetWindow         = null;
	  this._targetPlatform       = '';
	  this._targetUserAgent      = '';
	  this._isModernBrowser      = false;
	  this._targetKeyDownBinding = null;
	  this._targetKeyUpBinding   = null;
	  this._targetResetBinding   = null;
	  this._paused               = false;

	  this.setContext('global');
	  this.watch(targetWindow, targetElement, platform, userAgent);
	}

	Keyboard.prototype.setLocale = function(localeName, localeBuilder) {
	  var locale = null;
	  if (typeof localeName === 'string') {

	    if (localeBuilder) {
	      locale = new Locale(localeName);
	      localeBuilder(locale, this._targetPlatform, this._targetUserAgent);
	    } else {
	      locale = this._locales[localeName] || null;
	    }
	  } else {
	    locale     = localeName;
	    localeName = locale._localeName;
	  }

	  this._locale              = locale;
	  this._locales[localeName] = locale;
	  if (locale) {
	    this._locale.pressedKeys = locale.pressedKeys;
	  }
	};

	Keyboard.prototype.getLocale = function(localName) {
	  localName || (localName = this._locale.localeName);
	  return this._locales[localName] || null;
	};

	Keyboard.prototype.bind = function(keyComboStr, pressHandler, releaseHandler, preventRepeatByDefault) {
	  if (keyComboStr === null || typeof keyComboStr === 'function') {
	    preventRepeatByDefault = releaseHandler;
	    releaseHandler         = pressHandler;
	    pressHandler           = keyComboStr;
	    keyComboStr            = null;
	  }

	  if (
	    keyComboStr &&
	    typeof keyComboStr === 'object' &&
	    typeof keyComboStr.length === 'number'
	  ) {
	    for (var i = 0; i < keyComboStr.length; i += 1) {
	      this.bind(keyComboStr[i], pressHandler, releaseHandler);
	    }
	    return;
	  }

	  this._listeners.push({
	    keyCombo               : keyComboStr ? new KeyCombo(keyComboStr) : null,
	    pressHandler           : pressHandler           || null,
	    releaseHandler         : releaseHandler         || null,
	    preventRepeat          : preventRepeatByDefault || false,
	    preventRepeatByDefault : preventRepeatByDefault || false
	  });
	};
	Keyboard.prototype.addListener = Keyboard.prototype.bind;
	Keyboard.prototype.on          = Keyboard.prototype.bind;

	Keyboard.prototype.unbind = function(keyComboStr, pressHandler, releaseHandler) {
	  if (keyComboStr === null || typeof keyComboStr === 'function') {
	    releaseHandler = pressHandler;
	    pressHandler   = keyComboStr;
	    keyComboStr = null;
	  }

	  if (
	    keyComboStr &&
	    typeof keyComboStr === 'object' &&
	    typeof keyComboStr.length === 'number'
	  ) {
	    for (var i = 0; i < keyComboStr.length; i += 1) {
	      this.unbind(keyComboStr[i], pressHandler, releaseHandler);
	    }
	    return;
	  }

	  for (var i = 0; i < this._listeners.length; i += 1) {
	    var listener = this._listeners[i];

	    var comboMatches          = !keyComboStr && !listener.keyCombo ||
	                                listener.keyCombo.isEqual(keyComboStr);
	    var pressHandlerMatches   = !pressHandler && !releaseHandler ||
	                                !pressHandler && !listener.pressHandler ||
	                                pressHandler === listener.pressHandler;
	    var releaseHandlerMatches = !pressHandler && !releaseHandler ||
	                                !releaseHandler && !listener.releaseHandler ||
	                                releaseHandler === listener.releaseHandler;

	    if (comboMatches && pressHandlerMatches && releaseHandlerMatches) {
	      this._listeners.splice(i, 1);
	      i -= 1;
	    }
	  }
	};
	Keyboard.prototype.removeListener = Keyboard.prototype.unbind;
	Keyboard.prototype.off            = Keyboard.prototype.unbind;

	Keyboard.prototype.setContext = function(contextName) {
	  if(this._locale) { this.releaseAllKeys(); }

	  if (!this._contexts[contextName]) {
	    this._contexts[contextName] = [];
	  }
	  this._listeners      = this._contexts[contextName];
	  this._currentContext = contextName;
	};

	Keyboard.prototype.getContext = function() {
	  return this._currentContext;
	};

	Keyboard.prototype.withContext = function(contextName, callback) {
	  var previousContextName = this.getContext();
	  this.setContext(contextName);

	  callback();

	  this.setContext(previousContextName);
	};

	Keyboard.prototype.watch = function(targetWindow, targetElement, targetPlatform, targetUserAgent) {
	  var _this = this;

	  this.stop();

	  targetWindow && targetWindow !== null || (targetWindow = global);

	  if (typeof targetWindow.nodeType === 'number') {
	    targetUserAgent = targetPlatform;
	    targetPlatform  = targetElement;
	    targetElement   = targetWindow;
	    targetWindow    = global;
	  }

	  var userAgent = targetWindow.navigator && targetWindow.navigator.userAgent || '';
	  var platform  = targetWindow.navigator && targetWindow.navigator.platform  || '';

	  targetElement   && targetElement   !== null || (targetElement   = targetWindow.document);
	  targetPlatform  && targetPlatform  !== null || (targetPlatform  = platform);
	  targetUserAgent && targetUserAgent !== null || (targetUserAgent = userAgent);

	  this._isModernBrowser = !!targetWindow.addEventListener;
	  this._targetKeyDownBinding = function(event) {
	    _this.pressKey(event.keyCode, event);
	  };
	  this._targetKeyUpBinding = function(event) {
	    _this.releaseKey(event.keyCode, event);
	  };
	  this._targetResetBinding = function(event) {
	    _this.releaseAllKeys(event)
	  };

	  this._bindEvent(targetElement, 'keydown', this._targetKeyDownBinding);
	  this._bindEvent(targetElement, 'keyup',   this._targetKeyUpBinding);
	  this._bindEvent(targetWindow,  'focus',   this._targetResetBinding);
	  this._bindEvent(targetWindow,  'blur',    this._targetResetBinding);

	  this._targetElement   = targetElement;
	  this._targetWindow    = targetWindow;
	  this._targetPlatform  = targetPlatform;
	  this._targetUserAgent = targetUserAgent;
	};

	Keyboard.prototype.stop = function() {
	  var _this = this;

	  if (!this._targetElement || !this._targetWindow) { return; }

	  this._unbindEvent(this._targetElement, 'keydown', this._targetKeyDownBinding);
	  this._unbindEvent(this._targetElement, 'keyup',   this._targetKeyUpBinding);
	  this._unbindEvent(this._targetWindow,  'focus',   this._targetResetBinding);
	  this._unbindEvent(this._targetWindow,  'blur',    this._targetResetBinding);

	  this._targetWindow  = null;
	  this._targetElement = null;
	};

	Keyboard.prototype.pressKey = function(keyCode, event) {
	  if (this._paused) { return; }
	  if (!this._locale) { throw new Error('Locale not set'); }

	  this._locale.pressKey(keyCode);
	  this._applyBindings(event);
	};

	Keyboard.prototype.releaseKey = function(keyCode, event) {
	  if (this._paused) { return; }
	  if (!this._locale) { throw new Error('Locale not set'); }

	  this._locale.releaseKey(keyCode);
	  this._clearBindings(event);
	};

	Keyboard.prototype.releaseAllKeys = function(event) {
	  if (this._paused) { return; }
	  if (!this._locale) { throw new Error('Locale not set'); }

	  this._locale.pressedKeys.length = 0;
	  this._clearBindings(event);
	};

	Keyboard.prototype.pause = function() {
	  if (this._paused) { return; }
	  if (this._locale) { this.releaseAllKeys(); }
	  this._paused = true;
	};

	Keyboard.prototype.resume = function() {
	  this._paused = false;
	};

	Keyboard.prototype.reset = function() {
	  this.releaseAllKeys();
	  this._listeners.length = 0;
	};

	Keyboard.prototype._bindEvent = function(targetElement, eventName, handler) {
	  return this._isModernBrowser ?
	    targetElement.addEventListener(eventName, handler, false) :
	    targetElement.attachEvent('on' + eventName, handler);
	};

	Keyboard.prototype._unbindEvent = function(targetElement, eventName, handler) {
	  return this._isModernBrowser ?
	    targetElement.removeEventListener(eventName, handler, false) :
	    targetElement.detachEvent('on' + eventName, handler);
	};

	Keyboard.prototype._getGroupedListeners = function() {
	  var listenerGroups   = [];
	  var listenerGroupMap = [];

	  var listeners = this._listeners;
	  if (this._currentContext !== 'global') {
	    listeners = [].concat(listeners, this._contexts.global);
	  }

	  listeners.sort(function(a, b) {
	    return a.keyCombo.keyNames.length < b.keyCombo.keyNames.length;
	  }).forEach(function(l) {
	    var mapIndex = -1;
	    for (var i = 0; i < listenerGroupMap.length; i += 1) {
	      if (listenerGroupMap[i].isEqual(l.keyCombo)) {
	        mapIndex = i;
	      }
	    }
	    if (mapIndex === -1) {
	      mapIndex = listenerGroupMap.length;
	      listenerGroupMap.push(l.keyCombo);
	    }
	    if (!listenerGroups[mapIndex]) {
	      listenerGroups[mapIndex] = [];
	    }
	    listenerGroups[mapIndex].push(l);
	  });
	  return listenerGroups;
	};

	Keyboard.prototype._applyBindings = function(event) {
	  var preventRepeat = false;

	  event || (event = {});
	  event.preventRepeat = function() { preventRepeat = true; };
	  event.pressedKeys   = this._locale.pressedKeys.slice(0);

	  var pressedKeys    = this._locale.pressedKeys.slice(0);
	  var listenerGroups = this._getGroupedListeners();


	  for (var i = 0; i < listenerGroups.length; i += 1) {
	    var listeners = listenerGroups[i];
	    var keyCombo  = listeners[0].keyCombo;

	    if (keyCombo === null || keyCombo.check(pressedKeys)) {
	      for (var j = 0; j < listeners.length; j += 1) {
	        var listener = listeners[j];

	        if (keyCombo === null) {
	          listener = {
	            keyCombo               : new KeyCombo(pressedKeys.join('+')),
	            pressHandler           : listener.pressHandler,
	            releaseHandler         : listener.releaseHandler,
	            preventRepeat          : listener.preventRepeat,
	            preventRepeatByDefault : listener.preventRepeatByDefault
	          };
	        }

	        if (listener.pressHandler && !listener.preventRepeat) {
	          listener.pressHandler.call(this, event);
	          if (preventRepeat) {
	            listener.preventRepeat = preventRepeat;
	            preventRepeat          = false;
	          }
	        }

	        if (listener.releaseHandler && this._appliedListeners.indexOf(listener) === -1) {
	          this._appliedListeners.push(listener);
	        }
	      }

	      if (keyCombo) {
	        for (var j = 0; j < keyCombo.keyNames.length; j += 1) {
	          var index = pressedKeys.indexOf(keyCombo.keyNames[j]);
	          if (index !== -1) {
	            pressedKeys.splice(index, 1);
	            j -= 1;
	          }
	        }
	      }
	    }
	  }
	};

	Keyboard.prototype._clearBindings = function(event) {
	  event || (event = {});

	  for (var i = 0; i < this._appliedListeners.length; i += 1) {
	    var listener = this._appliedListeners[i];
	    var keyCombo = listener.keyCombo;
	    if (keyCombo === null || !keyCombo.check(this._locale.pressedKeys)) {
	      listener.preventRepeat = listener.preventRepeatByDefault;
	      listener.releaseHandler.call(this, event);
	      this._appliedListeners.splice(i, 1);
	      i -= 1;
	    }
	  }
	};

	module.exports = Keyboard;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	var KeyCombo = __webpack_require__(9);


	function Locale(name) {
	  this.localeName     = name;
	  this.pressedKeys    = [];
	  this._appliedMacros = [];
	  this._keyMap        = {};
	  this._killKeyCodes  = [];
	  this._macros        = [];
	}

	Locale.prototype.bindKeyCode = function(keyCode, keyNames) {
	  if (typeof keyNames === 'string') {
	    keyNames = [keyNames];
	  }

	  this._keyMap[keyCode] = keyNames;
	};

	Locale.prototype.bindMacro = function(keyComboStr, keyNames) {
	  if (typeof keyNames === 'string') {
	    keyNames = [ keyNames ];
	  }

	  var handler = null;
	  if (typeof keyNames === 'function') {
	    handler = keyNames;
	    keyNames = null;
	  }

	  var macro = {
	    keyCombo : new KeyCombo(keyComboStr),
	    keyNames : keyNames,
	    handler  : handler
	  };

	  this._macros.push(macro);
	};

	Locale.prototype.getKeyCodes = function(keyName) {
	  var keyCodes = [];
	  for (var keyCode in this._keyMap) {
	    var index = this._keyMap[keyCode].indexOf(keyName);
	    if (index > -1) { keyCodes.push(keyCode|0); }
	  }
	  return keyCodes;
	};

	Locale.prototype.getKeyNames = function(keyCode) {
	  return this._keyMap[keyCode] || [];
	};

	Locale.prototype.setKillKey = function(keyCode) {
	  if (typeof keyCode === 'string') {
	    var keyCodes = this.getKeyCodes(keyCode);
	    for (var i = 0; i < keyCodes.length; i += 1) {
	      this.setKillKey(keyCodes[i]);
	    }
	    return;
	  }

	  this._killKeyCodes.push(keyCode);
	};

	Locale.prototype.pressKey = function(keyCode) {
	  if (typeof keyCode === 'string') {
	    var keyCodes = this.getKeyCodes(keyCode);
	    for (var i = 0; i < keyCodes.length; i += 1) {
	      this.pressKey(keyCodes[i]);
	    }
	    return;
	  }

	  var keyNames = this.getKeyNames(keyCode);
	  for (var i = 0; i < keyNames.length; i += 1) {
	    if (this.pressedKeys.indexOf(keyNames[i]) === -1) {
	      this.pressedKeys.push(keyNames[i]);
	    }
	  }

	  this._applyMacros();
	};

	Locale.prototype.releaseKey = function(keyCode) {
	  if (typeof keyCode === 'string') {
	    var keyCodes = this.getKeyCodes(keyCode);
	    for (var i = 0; i < keyCodes.length; i += 1) {
	      this.releaseKey(keyCodes[i]);
	    }
	  }

	  else {
	    var keyNames         = this.getKeyNames(keyCode);
	    var killKeyCodeIndex = this._killKeyCodes.indexOf(keyCode);
	    
	    if (killKeyCodeIndex > -1) {
	      this.pressedKeys.length = 0;
	    } else {
	      for (var i = 0; i < keyNames.length; i += 1) {
	        var index = this.pressedKeys.indexOf(keyNames[i]);
	        if (index > -1) {
	          this.pressedKeys.splice(index, 1);
	        }
	      }
	    }

	    this._clearMacros();
	  }
	};

	Locale.prototype._applyMacros = function() {
	  var macros = this._macros.slice(0);
	  for (var i = 0; i < macros.length; i += 1) {
	    var macro = macros[i];
	    if (macro.keyCombo.check(this.pressedKeys)) {
	      if (macro.handler) {
	        macro.keyNames = macro.handler(this.pressedKeys);
	      }
	      for (var j = 0; j < macro.keyNames.length; j += 1) {
	        if (this.pressedKeys.indexOf(macro.keyNames[j]) === -1) {
	          this.pressedKeys.push(macro.keyNames[j]);
	        }
	      }
	      this._appliedMacros.push(macro);
	    }
	  }
	};

	Locale.prototype._clearMacros = function() {
	  for (var i = 0; i < this._appliedMacros.length; i += 1) {
	    var macro = this._appliedMacros[i];
	    if (!macro.keyCombo.check(this.pressedKeys)) {
	      for (var j = 0; j < macro.keyNames.length; j += 1) {
	        var index = this.pressedKeys.indexOf(macro.keyNames[j]);
	        if (index > -1) {
	          this.pressedKeys.splice(index, 1);
	        }
	      }
	      if (macro.handler) {
	        macro.keyNames = null;
	      }
	      this._appliedMacros.splice(i, 1);
	      i -= 1;
	    }
	  }
	};


	module.exports = Locale;


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	function KeyCombo(keyComboStr) {
	  this.sourceStr = keyComboStr;
	  this.subCombos = KeyCombo.parseComboStr(keyComboStr);
	  this.keyNames  = this.subCombos.reduce(function(memo, nextSubCombo) {
	    return memo.concat(nextSubCombo);
	  });
	}

	// TODO: Add support for key combo sequences
	KeyCombo.sequenceDeliminator = '>>';
	KeyCombo.comboDeliminator    = '>';
	KeyCombo.keyDeliminator      = '+';

	KeyCombo.parseComboStr = function(keyComboStr) {
	  var subComboStrs = KeyCombo._splitStr(keyComboStr, KeyCombo.comboDeliminator);
	  var combo        = [];

	  for (var i = 0 ; i < subComboStrs.length; i += 1) {
	    combo.push(KeyCombo._splitStr(subComboStrs[i], KeyCombo.keyDeliminator));
	  }
	  return combo;
	};

	KeyCombo.prototype.check = function(pressedKeyNames) {
	  var startingKeyNameIndex = 0;
	  for (var i = 0; i < this.subCombos.length; i += 1) {
	    startingKeyNameIndex = this._checkSubCombo(
	      this.subCombos[i],
	      startingKeyNameIndex,
	      pressedKeyNames
	    );
	    if (startingKeyNameIndex === -1) { return false; }
	  }
	  return true;
	};

	KeyCombo.prototype.isEqual = function(otherKeyCombo) {
	  if (
	    !otherKeyCombo ||
	    typeof otherKeyCombo !== 'string' &&
	    typeof otherKeyCombo !== 'object'
	  ) { return false; }

	  if (typeof otherKeyCombo === 'string') {
	    otherKeyCombo = new KeyCombo(otherKeyCombo);
	  }

	  if (this.subCombos.length !== otherKeyCombo.subCombos.length) {
	    return false;
	  }
	  for (var i = 0; i < this.subCombos.length; i += 1) {
	    if (this.subCombos[i].length !== otherKeyCombo.subCombos[i].length) {
	      return false;
	    }
	  }

	  for (var i = 0; i < this.subCombos.length; i += 1) {
	    var subCombo      = this.subCombos[i];
	    var otherSubCombo = otherKeyCombo.subCombos[i].slice(0);

	    for (var j = 0; j < subCombo.length; j += 1) {
	      var keyName = subCombo[j];
	      var index   = otherSubCombo.indexOf(keyName);

	      if (index > -1) {
	        otherSubCombo.splice(index, 1);
	      }
	    }
	    if (otherSubCombo.length !== 0) {
	      return false;
	    }
	  }

	  return true;
	};

	KeyCombo._splitStr = function(str, deliminator) {
	  var s  = str;
	  var d  = deliminator;
	  var c  = '';
	  var ca = [];

	  for (var ci = 0; ci < s.length; ci += 1) {
	    if (ci > 0 && s[ci] === d && s[ci - 1] !== '\\') {
	      ca.push(c.trim());
	      c = '';
	      ci += 1;
	    }
	    c += s[ci];
	  }
	  if (c) { ca.push(c.trim()); }

	  return ca;
	};

	KeyCombo.prototype._checkSubCombo = function(subCombo, startingKeyNameIndex, pressedKeyNames) {
	  subCombo = subCombo.slice(0);
	  pressedKeyNames = pressedKeyNames.slice(startingKeyNameIndex);

	  var endIndex = startingKeyNameIndex;
	  for (var i = 0; i < subCombo.length; i += 1) {

	    var keyName = subCombo[i];
	    if (keyName[0] === '\\') {
	      var escapedKeyName = keyName.slice(1);
	      if (
	        escapedKeyName === KeyCombo.comboDeliminator ||
	        escapedKeyName === KeyCombo.keyDeliminator
	      ) {
	        keyName = escapedKeyName;
	      }
	    }

	    var index = pressedKeyNames.indexOf(keyName);
	    if (index > -1) {
	      subCombo.splice(i, 1);
	      i -= 1;
	      if (index > endIndex) {
	        endIndex = index;
	      }
	      if (subCombo.length === 0) {
	        return endIndex;
	      }
	    }
	  }
	  return -1;
	};


	module.exports = KeyCombo;


/***/ },
/* 10 */
/***/ function(module, exports) {

	
	module.exports = function(locale, platform, userAgent) {

	  // general
	  locale.bindKeyCode(3,   ['cancel']);
	  locale.bindKeyCode(8,   ['backspace']);
	  locale.bindKeyCode(9,   ['tab']);
	  locale.bindKeyCode(12,  ['clear']);
	  locale.bindKeyCode(13,  ['enter']);
	  locale.bindKeyCode(16,  ['shift']);
	  locale.bindKeyCode(17,  ['ctrl']);
	  locale.bindKeyCode(18,  ['alt', 'menu']);
	  locale.bindKeyCode(19,  ['pause', 'break']);
	  locale.bindKeyCode(20,  ['capslock']);
	  locale.bindKeyCode(27,  ['escape', 'esc']);
	  locale.bindKeyCode(32,  ['space', 'spacebar']);
	  locale.bindKeyCode(33,  ['pageup']);
	  locale.bindKeyCode(34,  ['pagedown']);
	  locale.bindKeyCode(35,  ['end']);
	  locale.bindKeyCode(36,  ['home']);
	  locale.bindKeyCode(37,  ['left']);
	  locale.bindKeyCode(38,  ['up']);
	  locale.bindKeyCode(39,  ['right']);
	  locale.bindKeyCode(40,  ['down']);
	  locale.bindKeyCode(41,  ['select']);
	  locale.bindKeyCode(42,  ['printscreen']);
	  locale.bindKeyCode(43,  ['execute']);
	  locale.bindKeyCode(44,  ['snapshot']);
	  locale.bindKeyCode(45,  ['insert', 'ins']);
	  locale.bindKeyCode(46,  ['delete', 'del']);
	  locale.bindKeyCode(47,  ['help']);
	  locale.bindKeyCode(145, ['scrolllock', 'scroll']);
	  locale.bindKeyCode(187, ['equal', 'equalsign', '=']);
	  locale.bindKeyCode(188, ['comma', ',']);
	  locale.bindKeyCode(190, ['period', '.']);
	  locale.bindKeyCode(191, ['slash', 'forwardslash', '/']);
	  locale.bindKeyCode(192, ['graveaccent', '`']);
	  locale.bindKeyCode(219, ['openbracket', '[']);
	  locale.bindKeyCode(220, ['backslash', '\\']);
	  locale.bindKeyCode(221, ['closebracket', ']']);
	  locale.bindKeyCode(222, ['apostrophe', '\'']);

	  // 0-9
	  locale.bindKeyCode(48, ['zero', '0']);
	  locale.bindKeyCode(49, ['one', '1']);
	  locale.bindKeyCode(50, ['two', '2']);
	  locale.bindKeyCode(51, ['three', '3']);
	  locale.bindKeyCode(52, ['four', '4']);
	  locale.bindKeyCode(53, ['five', '5']);
	  locale.bindKeyCode(54, ['six', '6']);
	  locale.bindKeyCode(55, ['seven', '7']);
	  locale.bindKeyCode(56, ['eight', '8']);
	  locale.bindKeyCode(57, ['nine', '9']);

	  // numpad
	  locale.bindKeyCode(96, ['numzero', 'num0']);
	  locale.bindKeyCode(97, ['numone', 'num1']);
	  locale.bindKeyCode(98, ['numtwo', 'num2']);
	  locale.bindKeyCode(99, ['numthree', 'num3']);
	  locale.bindKeyCode(100, ['numfour', 'num4']);
	  locale.bindKeyCode(101, ['numfive', 'num5']);
	  locale.bindKeyCode(102, ['numsix', 'num6']);
	  locale.bindKeyCode(103, ['numseven', 'num7']);
	  locale.bindKeyCode(104, ['numeight', 'num8']);
	  locale.bindKeyCode(105, ['numnine', 'num9']);
	  locale.bindKeyCode(106, ['nummultiply', 'num*']);
	  locale.bindKeyCode(107, ['numadd', 'num+']);
	  locale.bindKeyCode(108, ['numenter']);
	  locale.bindKeyCode(109, ['numsubtract', 'num-']);
	  locale.bindKeyCode(110, ['numdecimal', 'num.']);
	  locale.bindKeyCode(111, ['numdivide', 'num/']);
	  locale.bindKeyCode(144, ['numlock', 'num']);

	  // function keys
	  locale.bindKeyCode(112, ['f1']);
	  locale.bindKeyCode(113, ['f2']);
	  locale.bindKeyCode(114, ['f3']);
	  locale.bindKeyCode(115, ['f4']);
	  locale.bindKeyCode(116, ['f5']);
	  locale.bindKeyCode(117, ['f6']);
	  locale.bindKeyCode(118, ['f7']);
	  locale.bindKeyCode(119, ['f8']);
	  locale.bindKeyCode(120, ['f9']);
	  locale.bindKeyCode(121, ['f10']);
	  locale.bindKeyCode(122, ['f11']);
	  locale.bindKeyCode(123, ['f12']);

	  // secondary key symbols
	  locale.bindMacro('shift + `', ['tilde', '~']);
	  locale.bindMacro('shift + 1', ['exclamation', 'exclamationpoint', '!']);
	  locale.bindMacro('shift + 2', ['at', '@']);
	  locale.bindMacro('shift + 3', ['number', '#']);
	  locale.bindMacro('shift + 4', ['dollar', 'dollars', 'dollarsign', '$']);
	  locale.bindMacro('shift + 5', ['percent', '%']);
	  locale.bindMacro('shift + 6', ['caret', '^']);
	  locale.bindMacro('shift + 7', ['ampersand', 'and', '&']);
	  locale.bindMacro('shift + 8', ['asterisk', '*']);
	  locale.bindMacro('shift + 9', ['openparen', '(']);
	  locale.bindMacro('shift + 0', ['closeparen', ')']);
	  locale.bindMacro('shift + -', ['underscore', '_']);
	  locale.bindMacro('shift + =', ['plus', '+']);
	  locale.bindMacro('shift + [', ['opencurlybrace', 'opencurlybracket', '{']);
	  locale.bindMacro('shift + ]', ['closecurlybrace', 'closecurlybracket', '}']);
	  locale.bindMacro('shift + \\', ['verticalbar', '|']);
	  locale.bindMacro('shift + ;', ['colon', ':']);
	  locale.bindMacro('shift + \'', ['quotationmark', '\'']);
	  locale.bindMacro('shift + !,', ['openanglebracket', '<']);
	  locale.bindMacro('shift + .', ['closeanglebracket', '>']);
	  locale.bindMacro('shift + /', ['questionmark', '?']);

	  //a-z and A-Z
	  for (var keyCode = 65; keyCode <= 90; keyCode += 1) {
	    var keyName = String.fromCharCode(keyCode + 32);
	    var capitalKeyName = String.fromCharCode(keyCode);
	  	locale.bindKeyCode(keyCode, keyName);
	  	locale.bindMacro('shift + ' + keyName, capitalKeyName);
	  	locale.bindMacro('capslock + ' + keyName, capitalKeyName);
	  }

	  // browser caveats
	  var semicolonKeyCode = userAgent.match('Firefox') ? 59  : 186;
	  var dashKeyCode      = userAgent.match('Firefox') ? 173 : 189;
	  var leftCommandKeyCode;
	  var rightCommandKeyCode;
	  if (platform.match('Mac') && (userAgent.match('Safari') || userAgent.match('Chrome'))) {
	    leftCommandKeyCode  = 91;
	    rightCommandKeyCode = 93;
	  } else if(platform.match('Mac') && userAgent.match('Opera')) {
	    leftCommandKeyCode  = 17;
	    rightCommandKeyCode = 17;
	  } else if(platform.match('Mac') && userAgent.match('Firefox')) {
	    leftCommandKeyCode  = 224;
	    rightCommandKeyCode = 224;
	  }
	  locale.bindKeyCode(semicolonKeyCode,    ['semicolon', ';']);
	  locale.bindKeyCode(dashKeyCode,         ['dash', '-']);
	  locale.bindKeyCode(leftCommandKeyCode,  ['command', 'windows', 'win', 'super', 'leftcommand', 'leftwindows', 'leftwin', 'leftsuper']);
	  locale.bindKeyCode(rightCommandKeyCode, ['command', 'windows', 'win', 'super', 'rightcommand', 'rightwindows', 'rightwin', 'rightsuper']);

	  // kill keys
	  locale.setKillKey('command');
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _keyTemplate = __webpack_require__(12);

	var _keyTemplate2 = _interopRequireDefault(_keyTemplate);

	var Controls = (function () {
	  function Controls() {
	    _classCallCheck(this, Controls);

	    this.boundKeys = {};
	    this.id = Math.random().toString(36).substring(7);
	  }

	  _createClass(Controls, [{
	    key: 'setupKey',
	    value: function setupKey(key, element) {
	      var _this = this;

	      if (!this.boundKeys[key]) {
	        (function () {
	          var $element = $(element);
	          if (!$element.children('.keys')[0]) $element.append('<div class="keys"></div>');
	          var $keys = $element.children('.keys');
	          var keyDiv = $.parseHTML((0, _keyTemplate2['default'])(key));
	          $keys.append(keyDiv);
	          _this.keyboard.bind(key, function (e) {
	            e.preventDefault();
	            _this[key] = true;
	            $(keyDiv).addClass('pressed');
	          }, function () {
	            _this[key] = false;
	            $(keyDiv).removeClass('pressed');
	          });
	          _this.boundKeys[key] = true;
	        })();
	      }
	    }
	  }, {
	    key: 'init',
	    value: function init(keyboard) {
	      this.keyboard = keyboard;
	    }
	  }]);

	  return Controls;
	})();

	var instance = undefined;

	function createControls() {
	  if (!instance) {
	    instance = new Controls();
	  }
	  return instance;
	}

	exports['default'] = {
	  controls: createControls()
	};
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	exports['default'] = function (key) {
	  if (key === 'left' || key === 'right' || key === 'up' || key === 'down') {
	    return '<div class="key"><div class="arrow-' + key + ' keycap"><span>&#10140;</span></div></div>';
	  } else {
	    return '<div class="key"><div class="keycap">' + key.toUpperCase() + '</div></div>';
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _minigame = __webpack_require__(14);

	var _minigame2 = _interopRequireDefault(_minigame);

	var _controls = __webpack_require__(11);

	var _isTouching = __webpack_require__(15);

	var _isTouching2 = _interopRequireDefault(_isTouching);

	var _moveable = __webpack_require__(16);

	var _moveable2 = _interopRequireDefault(_moveable);

	var GAME_NAME = 'dodge-falling';
	var PLAYER_SPEED = 4;
	var AABB = [0, 0, 300, 300];

	var DodgeFalling = (function (_Minigame) {
	  _inherits(DodgeFalling, _Minigame);

	  function DodgeFalling(keys, name) {
	    _classCallCheck(this, DodgeFalling);

	    name = name || GAME_NAME;
	    _get(Object.getPrototypeOf(DodgeFalling.prototype), 'constructor', this).call(this, keys, GAME_NAME);
	    this.key1 = keys[0];
	    this.key2 = keys[1];

	    this.setupStage();
	  }

	  _createClass(DodgeFalling, [{
	    key: 'setupStage',
	    value: function setupStage() {
	      var box = new _moveable2['default'](this.stage, {
	        aabb: AABB,
	        width: 60,
	        height: 60,
	        x: 200
	      });
	      this.box = box;
	      box.graphics.beginFill('#911').drawRect(0, 0, box.shape.width, box.shape.height);
	      box.reset = function () {
	        box.moveTo(Math.random() * (AABB[2] - box.shape.width), 0);
	        box.dy = 0;
	      };

	      var player = new _moveable2['default'](this.stage, {
	        aabb: AABB,
	        width: 30,
	        height: 60,
	        x: 150,
	        y: AABB[3] - 60,
	        isBounded: true
	      });
	      this.player = player;
	      player.graphics.beginFill('#369').drawRect(0, 0, player.shape.width, player.shape.height);
	    }
	  }, {
	    key: 'tick',
	    value: function tick(event) {
	      var box = this.box;
	      var player = this.player;
	      if ((0, _isTouching2['default'])(box, player)) {
	        document.dispatchEvent(new Event('lose'));
	        player.moveTo(0);
	        box.reset();
	      }

	      if (_controls.controls[this.key1]) {
	        player.moveBy(-event.delta / 10 * PLAYER_SPEED);
	      } else if (_controls.controls[this.key2]) {
	        player.moveBy(event.delta / 10 * PLAYER_SPEED);
	      }

	      box.dy += 0.2;
	      box.move(event.delta);

	      if (box.shape.y >= box.aabb[3]) {
	        box.reset();
	      }

	      _get(Object.getPrototypeOf(DodgeFalling.prototype), 'tick', this).call(this);
	    }
	  }]);

	  return DodgeFalling;
	})(_minigame2['default']);

	exports['default'] = DodgeFalling;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _controls = __webpack_require__(11);

	var Minigame = (function () {
	  function Minigame(keys, name) {
	    var _this = this;

	    _classCallCheck(this, Minigame);

	    this.id = name || Math.random().toString(36).substring(7);
	    this.tick = this.tick.bind(this);
	    this.initStage();
	    keys.forEach(function (key) {
	      return _controls.controls.setupKey(key, _this.$container);
	    });
	  }

	  _createClass(Minigame, [{
	    key: 'initStage',
	    value: function initStage() {
	      var $canvas = $('<canvas id=' + this.id + ' width=300 height=300></canvas>');
	      var $container = $('<div class="game-container"></div>').append($canvas);
	      $('body').append($container);
	      this.$canvas = $canvas;
	      this.$container = $container;
	      this.stage = new createjs.Stage($canvas[0]);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.stage.removeAllChildren();
	      this.stage.update();
	      this.$container.remove();
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      if (createjs.Ticker.getPaused()) return;
	      this.stage.update();
	    }
	  }]);

	  return Minigame;
	})();

	exports['default'] = Minigame;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = isTouching;

	function isTouching(rect1, rect2) {
	  rect1 = rect1 && rect1.shape || rect1 || {};
	  rect2 = rect2 && rect2.shape || rect2 || {};
	  return !(rect1.x >= rect2.x + rect2.width || rect1.x + rect1.width <= rect2.x || rect1.y >= rect2.y + rect2.height || rect1.y + rect1.height <= rect2.y);
	}

	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Moveable = (function () {
	  function Moveable(stage, options) {
	    _classCallCheck(this, Moveable);

	    this.shape = new createjs.Shape();
	    this.shape.width = options.width || options.size;
	    this.shape.height = options.height || options.size;
	    if (options.x) this.shape.x = options.x;
	    if (options.y) this.shape.y = options.y;
	    this.dx = options.dx || 0;
	    this.dy = options.dy || 0;
	    this.aabb = options.aabb;
	    this.graphics = this.shape.graphics;
	    this.isBounded = options.isBounded;
	    stage.addChild(this.shape);
	  }

	  _createClass(Moveable, [{
	    key: "moveTo",
	    value: function moveTo(x, y) {
	      if (!isNaN(parseFloat(x)) && isFinite(x)) {
	        this.shape.x = x;
	      }
	      if (!isNaN(parseFloat(y)) && isFinite(y)) {
	        this.shape.y = y;
	      }
	    }
	  }, {
	    key: "moveBy",
	    value: function moveBy(x, y) {
	      if (x) {
	        this.shape.x += x;
	        if (this.isBounded) {
	          if (this.shape.x < this.aabb[0]) {
	            this.shape.x = this.aabb[0];
	          } else if (this.shape.x + this.shape.width > this.aabb[2]) {
	            this.shape.x = this.aabb[2] - this.shape.width;
	          }
	        }
	      }
	      if (y) {
	        this.shape.y += y;
	        if (this.isBounded) {
	          if (this.shape.y < this.aabb[1]) {
	            this.shape.x = this.aabb[1];
	          } else if (this.shape.y + this.shape.height > this.aabb[3]) {
	            this.shape.y = this.aabb[3] - this.shape.height;
	          }
	        }
	      }
	    }
	  }, {
	    key: "move",
	    value: function move(delta) {
	      delta = delta || 16;
	      this.moveBy(this.dx * delta / 100, this.dy * delta / 100);
	    }
	  }, {
	    key: "isOnBoundary",
	    value: function isOnBoundary() {
	      return this.shape.x <= this.aabb[0] || this.shape.x >= this.aabb[2] || this.shape.y <= this.aabb[1] || this.shape.y >= this.aabb[3];
	    }
	  }]);

	  return Moveable;
	})();

	exports["default"] = Moveable;
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _minigame = __webpack_require__(14);

	var _minigame2 = _interopRequireDefault(_minigame);

	var _controls = __webpack_require__(11);

	var _isTouching = __webpack_require__(15);

	var _isTouching2 = _interopRequireDefault(_isTouching);

	var _moveable = __webpack_require__(16);

	var _moveable2 = _interopRequireDefault(_moveable);

	var GAME_NAME = 'stay-between';
	var PLAYER_SPEED = 1;
	var AABB = [0, 0, 300, 300];
	var LINE_HEIGHT = 5;
	// const LINE_COUNT = 2;
	var LINE_DISTANCE = AABB[3] / 4;

	var StayBetween = (function (_Minigame) {
	  _inherits(StayBetween, _Minigame);

	  function StayBetween(keys, name) {
	    _classCallCheck(this, StayBetween);

	    name = name || GAME_NAME;
	    _get(Object.getPrototypeOf(StayBetween.prototype), 'constructor', this).call(this, keys, GAME_NAME);
	    this.key1 = keys[0];
	    this.key2 = keys[1];

	    this.setupStage();
	  }

	  _createClass(StayBetween, [{
	    key: 'setupStage',
	    value: function setupStage() {
	      this.objects = [];
	      var player = new _moveable2['default'](this.stage, {
	        aabb: AABB,
	        width: AABB[2],
	        height: LINE_HEIGHT,
	        y: (AABB[3] - LINE_HEIGHT) / 2
	      });
	      this.player = player;
	      player.graphics.beginFill('#369').drawRect(0, 0, player.shape.width, player.shape.height);
	      this.objects.push(player);

	      this.lines = [];

	      var line = new _moveable2['default'](this.stage, {
	        aabb: AABB,
	        width: AABB[2],
	        height: 10,
	        y: this.player.shape.y - LINE_DISTANCE,
	        dy: -2
	      });
	      this.lines.push(line);
	      line.graphics.beginFill('#911').drawRect(0, 0, line.shape.width, line.shape.height);
	      this.objects.push(line);

	      var line2 = new _moveable2['default'](this.stage, {
	        aabb: AABB,
	        width: AABB[2],
	        height: 10,
	        y: this.player.shape.y + LINE_DISTANCE,
	        dy: -2
	      });
	      this.lines.push(line2);
	      line2.graphics.beginFill('#911').drawRect(0, 0, line.shape.width, line.shape.height);
	      this.objects.push(line2);
	    }
	  }, {
	    key: 'tick',
	    value: function tick(event) {
	      var player = this.player;

	      this.lines.forEach(function (line) {
	        if ((0, _isTouching2['default'])(line, player)) {
	          document.dispatchEvent(new Event('lose'));
	          player.dy = 0;
	          player.moveTo(0, AABB[3] / 2);
	        }
	      });

	      // Add acceleration if pressed
	      if (_controls.controls[this.key1]) {
	        player.dy -= PLAYER_SPEED;
	      } else if (_controls.controls[this.key2]) {
	        player.dy += PLAYER_SPEED;
	      }

	      // Constantly slow
	      player.dy *= 0.98;
	      if (Math.abs(player.dy) < 0.001) player.dy = 0;

	      this.objects.forEach(function (object) {
	        // Check if wrapped screen
	        if (object.shape.y < 0) {
	          object.moveTo(0, AABB[3]);
	        } else if (object.shape.y > AABB[3] - object.shape.height) {
	          object.shape.y = AABB[3] - object.shape.height;
	          if (object.dy > 0) object.dy = 0;
	        }

	        object.move(event.delta);
	      });

	      _get(Object.getPrototypeOf(StayBetween.prototype), 'tick', this).call(this);
	    }
	  }]);

	  return StayBetween;
	})(_minigame2['default']);

	exports['default'] = StayBetween;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _minigame = __webpack_require__(14);

	var _minigame2 = _interopRequireDefault(_minigame);

	var _controls = __webpack_require__(11);

	var _isTouching = __webpack_require__(15);

	var _isTouching2 = _interopRequireDefault(_isTouching);

	var _moveable = __webpack_require__(16);

	var _moveable2 = _interopRequireDefault(_moveable);

	var GAME_NAME = 'dodge-falling';
	var AABB = [0, 0, 300, 300];
	var BALL_SIZE = 25;

	var DodgeFalling = (function (_Minigame) {
	  _inherits(DodgeFalling, _Minigame);

	  function DodgeFalling(keys, name) {
	    _classCallCheck(this, DodgeFalling);

	    name = name || GAME_NAME;
	    _get(Object.getPrototypeOf(DodgeFalling.prototype), 'constructor', this).call(this, keys, GAME_NAME);
	    this.key = keys[0];

	    this.setupStage();
	  }

	  _createClass(DodgeFalling, [{
	    key: 'setupStage',
	    value: function setupStage() {
	      var ball = new _moveable2['default'](this.stage, {
	        aabb: AABB,
	        width: BALL_SIZE,
	        height: BALL_SIZE,
	        y: AABB[3] / 2,
	        x: -300,
	        dx: 10
	      });
	      this.ball = ball;
	      ball.graphics.beginFill('#393').drawCircle(0, 0, ball.shape.width);

	      var target = new createjs.Container();
	      target.x = AABB[2] / 2;
	      target.y = AABB[3] / 2;
	      target.readyToFire = true;
	      target.charge = 1;
	      this.target = target;

	      var ring = new createjs.Shape();
	      target.ring = ring;
	      target.r = ring.r = AABB[2] / 25;
	      ring.graphics.setStrokeStyle(3);
	      ring.drawArc = function (charge) {
	        ring.graphics.clear();
	        ring.graphics.setStrokeStyle(3).beginStroke('#369').arc(0, 0, ring.r, -0.5 * Math.PI, (charge - 0.25) * 2 * Math.PI);
	      };
	      ring.drawArc(1);
	      target.updateCharge = function (delta) {
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
	  }, {
	    key: 'tick',
	    value: function tick(event) {
	      var target = this.target;
	      var ball = this.ball;
	      if (_controls.controls[this.key]) {
	        if (target.readyToFire) {
	          target.ring.graphics.beginFill('#69b').drawCircle(0, 0, target.r);
	          target.readyToFire = false;
	          target.charge = 0;
	          if (ball.shape.x - ball.shape.width < target.x + target.r && ball.shape.x + ball.shape.width > target.x - target.r) {
	            createjs.Tween.get(ball.shape).to({ alpha: 0, y: ball.shape.y - 50 }, 500, createjs.Ease.quadOut).call(function () {
	              ball.moveTo(Math.random() * -2 * AABB[3], AABB[3] / 2);
	              ball.shape.alpha = 1;
	            });
	          }
	        }
	      }

	      if (target.readyToFire === false) {
	        target.updateCharge(event.delta);
	      }

	      this.ball.move();
	      if (ball.shape.x + ball.shape.width > AABB[3]) {
	        document.dispatchEvent(new Event('lose'));
	        ball.moveTo(Math.random() * -2 * AABB[3], AABB[3] / 2);
	      }
	      _get(Object.getPrototypeOf(DodgeFalling.prototype), 'tick', this).call(this);
	    }
	  }]);

	  return DodgeFalling;
	})(_minigame2['default']);

	exports['default'] = DodgeFalling;
	module.exports = exports['default'];

/***/ }
/******/ ]);