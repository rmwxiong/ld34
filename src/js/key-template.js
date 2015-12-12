export default function(key) {
  if (key === 'left' || key === 'right' || key === 'up' || key === 'down') {
    return `<div class="key"><div class="arrow-${key} keycap"><span>&#10140;</span></div></div>`;
  } else {
    return `<div class="key"><div class="keycap">${key}</div></div>`;
  }
}
