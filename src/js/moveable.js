export default class Moveable {
  constructor(options) {
    this.shape = new createjs.Shape();
    this.shape.width = options.width || options.size;
    this.shape.height = options.height || options.size;
    this.shape.x = options.x;
    this.shape.y = options.y;
    this.graphics = this.shape.graphics;
  }
}
