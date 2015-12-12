class Controls {
  constructor() {
    this.boundKeys = {};
    this.id = Math.random().toString(36).substring(7);
  }

  setupKey(key) {
    if (!this.boundKeys[key]) {
      this.keyboard.bind(key, () => this[key] = true, () => this[key] = false);
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
