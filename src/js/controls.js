import renderKey from './key-template';

class Controls {
  constructor() {
    this.boundKeys = {};
    this.id = Math.random().toString(36).substring(7);
  }

  setupKey(key, element) {
    if (!this.boundKeys[key]) {
      let $element = $(element);
      if (!$element.children('.keys')[0]) $element.append('<div class="keys"></div>');
      let $keys = $element.children('.keys');
      console.log($keys);
      let keyDiv = $.parseHTML(renderKey(key));
      $keys.append(keyDiv);
      this.keyboard.bind(key, e => {
        e.preventDefault();
        this[key] = true;
        $(keyDiv).addClass('pressed');
      }, () => {
        this[key] = false;
        $(keyDiv).removeClass('pressed');
      });
      this.boundKeys[key] = true;
    }
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
