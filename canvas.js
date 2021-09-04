import { getAngle, getEndXY } from "./geometry.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// curve(450,100,350,100);

function curve(x1,y1,x2,y2) {
  const height = (x2 - x1) * 0.2;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  const cp1x = (x2 - x1) / 3 + x1;
  const cp1y = y1 - height;
  const cp2x = (x2 - x1) * 2 / 3 + x1;
  const cp2y = y1 - height;
  ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x2,y2);
  ctx.stroke();
}



function drawArc(beginX, beginY, endX, endY, curvature, lineWidth, color, lineCap = "round") {
  if (curvature < 0) {
    curvature = -curvature;
    [beginX, beginY, endX, endY] = [endX, endY, beginX, beginY];
  } else if (Math.abs(curvature) < 0.0001) {
    drawLine(beginX, beginY, endX, endY, lineWidth, color, lineCap);
    return;
  }
  const angle = getAngle(beginX, beginY, endX, endY);
  const chordLength = Math.hypot((endX - beginX),(endY - beginY));
  const height = chordLength * curvature;
  const radius = height/2 + chordLength**2 / 8 * 1/height;
  const middleX = (endX + beginX) / 2;
  const middleY = (endY + beginY) / 2;
  const {x, y} = getEndXY(middleX, middleY, radius - height, angle + Math.PI / 2);
  const startAngle = getAngle(x, y, beginX, beginY);
  const endAngle = getAngle(x, y, endX, endY); 
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  ctx.lineWidth = lineWidth; 
  ctx.strokeStyle = color;
  ctx.lineCap = lineCap;
  ctx.stroke();
}

function drawQuadraticCurve(beginX, beginY, controlX, controlY, endX, endY, lineWidth = 1, color = "black") {
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.quadraticCurveTo(controlX, controlY, endX, endY);
  ctx.lineWidth = lineWidth; 
  ctx.strokeStyle = color;
  ctx.stroke();
}

//функция прорисовки линии
function drawLine(beginX, beginY, endX, endY, lineWidth = 1, color = "black", lineCap = "round") {
  ctx.beginPath();
  ctx.moveTo(beginX,beginY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = lineWidth; 
  ctx.strokeStyle = color;
  ctx.lineCap = lineCap;
  ctx.stroke();
}

function drawPoint({ x, y, active = false, type = "normal" }) {
  ctx.beginPath();
  ctx.arc(x, y, POINT_SIZE / 2, 0, 7);
  const key = `${type}${active ? '_active' : ''}`;
  ctx.fillStyle = pointColors[key];
  ctx.fill();
}

export { drawArc, drawLine, curve, clear };