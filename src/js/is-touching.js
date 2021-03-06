export default function isTouching(rect1, rect2) {
  rect1 = (rect1 && rect1.shape) || (rect1 && rect1.entity) || rect1 || {};
  rect2 = (rect2 && rect2.shape) || (rect2 && rect2.entity) || rect2 || {};
  return !(rect1.x >= rect2.x + rect2.width ||
    rect1.x + rect1.width <= rect2.x ||
    rect1.y >= rect2.y + rect2.height ||
    rect1.y + rect1.height <= rect2.y);
}
