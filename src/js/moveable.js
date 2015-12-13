export default class Moveable {
  constructor(stage, options) {
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

  moveTo(x, y) {
    if (!isNaN(parseFloat(x)) && isFinite(x)) {
      this.shape.x = x;
    }
    if (!isNaN(parseFloat(y)) && isFinite(y)) {
      this.shape.y = y;
    }
  }

  moveBy(x, y) {
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

  move(delta) {
    delta = delta || 16;
    this.moveBy(this.dx * delta / 100, this.dy * delta / 100);
  }

  isOnBoundary() {
    return (this.shape.x <= this.aabb[0] ||
      this.shape.x >= this.aabb[2] ||
      this.shape.y <= this.aabb[1] ||
      this.shape.y >= this.aabb[3]);
  }
}
