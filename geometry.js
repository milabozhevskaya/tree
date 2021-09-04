const halfPI = Math.PI / 2;

//функция нахождения конечной точки ветки
function getEndXY(x, y, length, angle) {
  return {
    x: x - Math.cos(Math.PI - angle) * length,
    y: y + Math.sin(Math.PI - angle) * length
  }
}

function getAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}


function getControlPoint(x1, y1, x2, y2, h) {
  const chord = Math.hypot(x1 - x2, y1 - y2);
  const angle = getAngle(x1, y1, x2, y2);
  const {x: px, y: py} = getEndXY(x1, y1, 1/3 * chord, angle);
  const {x: x, y: y} = getEndXY(px, py, h, angle - Math.PI / 2);
  return {x, y};
}

export { halfPI, getEndXY, getAngle };