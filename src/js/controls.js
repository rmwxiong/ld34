class Controls {
  constructor() {
    this.id = Math.random().toString(36).substring(7);
  }

  setupKey(key) {
    this.keyboard.bind(key, () => this[key] = true, () => this[key] = false);
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
