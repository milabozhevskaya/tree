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
function getCenterXY(x1, y1, x2, y2) {
  return {
    x: x1 + (x2 - x1) / 2,
    y: y1 + (y2 - y1) / 2,
  }
}
//control point for Bezier curve (one control)
function getControlPoint(x1, y1, x2, y2, h) {
  const chord = Math.hypot(x1 - x2, y1 - y2);
  const angle = getAngle(x1, y1, x2, y2);
  const {x: px, y: py} = getEndXY(x1, y1, 1/3 * chord, angle);
  const {x: x, y: y} = getEndXY(px, py, h, angle - Math.PI / 2);
  return {x, y, type: "control"};
}

function getUpPointsBranch({ x, y, angle = -halfPI, length, width, leftCurvature = 0, rightCurvature = 0 }) {
  // console.log("get", width);
  const { x: endX, y: endY } = getEndXY(x, y, length, angle);
  const { x: leftUpX, y: leftUpY } = getEndXY(endX, endY, width / 2, angle - halfPI);
  const { x: rightUpX, y: rightUpY } = getEndXY(endX, endY, width / 2, angle + halfPI);
  return { leftUpX: leftUpX, leftUpY: leftUpY, rightUpX: rightUpX, rightUpY: rightUpY };
}

export { halfPI, getEndXY, getAngle, getControlPoint, getUpPointsBranch, getCenterXY };