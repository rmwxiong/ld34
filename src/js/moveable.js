export default class Moveable {
  constructor(options) {
    this.shape = new createjs.Shape();
    this.shape.width = options.width || options.size;
    this.shape.height = options.height || options.size;
    this.shape.x = options.x;
    this.shape.y = options.y;
    this.aabb = options.aabb;
    this.graphics = this.shape.graphics;
  }

  move(x, y) {
    if (x) {
      this.shape.x += x;
      if (this.shape.x < this.aabb[0]) {
        this.shape.x = this.aabb[0];
      } else if (this.shape.x + this.shape.width > this.aabb[2]) {
        this.shape.x = this.aabb[2] - this.shape.width;
      }
    }
    if (y) {
      this.shape.y -= y;
      if (this.shape.y < this.aabb[1]) {
        this.shape.x = this.aabb[1];
      } else if (this.shape.y + this.shape.height > this.aabb[3]) {
        this.shape.y = this.aabb[3];
      }
    }
  }
}
