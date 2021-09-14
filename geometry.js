import { rnd } from "./math.js";

const halfPI = Math.PI / 2;

//функция нахождения конечной точки ветки
function getEndXY( x, y, length, angle = -halfPI ) {
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
function getControlPoint({ x1, y1, x2, y2, h, levelCurvature = 5 / 6 }) {
  const chord = Math.hypot(x1 - x2, y1 - y2);
  const angle = getAngle(x1, y1, x2, y2);
  const {x: px, y: py} = getEndXY(x1, y1, levelCurvature * chord, angle);
  const {x: x, y: y} = getEndXY(px, py, h, angle - Math.PI / 2);
  return {x, y, type: "control"};
}

function getHeightCurvature({ x1, y1, x2, y2, pointX, pointY, pointAngle, levelCurvature = 25 / 30 }) {
  // console.log(- Math.PI - pointAngle - getAngle(x1, y1, x2, y2), "Math.PI");
  // console.log(Math.PI);
  // console.log("pointAngle", Math.PI + pointAngle);
  // console.log("angleC", getAngle(x1, y1, x2, y2));

  const angleB = Math.PI - (Math.PI + pointAngle) + getAngle(x1, y1, x2, y2);
  // console.log("angleB", angleB);
  const angleA = Math.PI - Math.PI / 2 - angleB;
  const catetA = Math.hypot(x1 - x2, y1 - y2) * levelCurvature;
  return  catetA / Math.tan(angleA);
}

function getEndPointsBranch({ x, y, angle = - halfPI, roseTotalAngle, roseAngle, length, width, leftCurvature = 0, rightCurvature = 0 }) {
  const endLeftAngle = roseAngle - (Math.PI - roseTotalAngle) / 2;
  const endRightAngle = roseTotalAngle + roseAngle + (Math.PI - roseTotalAngle) / 2;
  const { x: endX, y: endY } = getEndXY(x, y, length, angle);
  const { x: leftUpX, y: leftUpY } = getEndXY(endX, endY, width / 2, endLeftAngle);
  // const { x: leftUpX, y: leftUpY } = getEndXY(endX, endY, width / 2, angle - halfPI);
  const { x: rightUpX, y: rightUpY } = getEndXY(endX, endY, width / 2, endRightAngle);
  // const { x: rightUpX, y: rightUpY } = getEndXY(endX, endY, width / 2, angle + halfPI);
  return { leftUpX: leftUpX, leftUpY: leftUpY, rightUpX: rightUpX, rightUpY: rightUpY };
}
function getUpPointsBranch({ x, y, angle = -halfPI, length, width, leftCurvature = 0, rightCurvature = 0 }) {
  // console.log("get", width);
  const { x: endX, y: endY } = getEndXY(x, y, length, angle);
  const { x: leftUpX, y: leftUpY } = getEndXY(endX, endY, width / 2, angle - halfPI);
  const { x: rightUpX, y: rightUpY } = getEndXY(endX, endY, width / 2, angle + halfPI);
  return { leftUpX: leftUpX, leftUpY: leftUpY, rightUpX: rightUpX, rightUpY: rightUpY };
}

function getBetweenBranchAngles(roseTotalAngle,branchNumber) {
  let betweenBranchAngles = [];
  betweenBranchAngles[0] = roseTotalAngle;
  for (let i = 1; i < branchNumber - 1; i++) {
    betweenBranchAngles[i] = rnd(0, roseTotalAngle);
  }
  betweenBranchAngles.push(0);
  betweenBranchAngles.sort();
  return betweenBranchAngles;
}

export { halfPI, getEndXY, getAngle, getControlPoint, getEndPointsBranch, getUpPointsBranch, getCenterXY, getHeightCurvature, getBetweenBranchAngles };