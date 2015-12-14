import renderKey from './key-template';

class Controls {
  constructor() {
    this.boundKeys = {};
    this.id = Math.random().toString(36).substring(7);
  }

  setupKey(key, element, noShow) {
    if (!this.boundKeys[key]) {
      let $element = $(element);
      if (!$element.children('.keys')[0]) $element.append('<div class="keys"></div>');
      let $keys = $element.children('.keys');
      let keyDiv;
      if (!noShow) {
        keyDiv = $.parseHTML(renderKey(key));
        $keys.append(keyDiv);
      }
      this.keyboard.bind(key, e => {
        e.preventDefault();
        this[key] = true;
        if (!noShow) $(keyDiv).addClass('pressed');
      }, () => {
        this[key] = false;
        if (!noShow) $(keyDiv).removeClass('pressed');
      });
      this.boundKeys[key] = true;
    }
  }

  reset() {
    this.boundKeys = {};
    this.keyboard.reset();
  }

  init(keyboard) {
    this.keyboard = keyboard;
  }
}

let instance;

function createControls() {
  if (!instance) {
    instance = new Controls();
  }
  return instance;
}

export default {
  controls: createControls()
};
