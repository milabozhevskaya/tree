import { getAngle, getEndXY } from "./geometry.js";

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let treePath = [];

function findPath(x, y) {
  let id = '';
  treePath.forEach(path => {
    if (ctx.isPointInPath(path, x, y)) {
      id = path.id;
    }
  });

  return id;
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// curve(450,100,350,100);

function drawCircle({ x, y, begin = true, radius, lineWidth = 1, stroke, fill }) {
  if (begin) ctx.beginPath();
  ctx.arc(x, y, radius, 0, 7);
  if (stroke) {
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

//кривая Безье
function curve(x1,y1,x2,y2, begin = true) {
  const height = (x2 - x1) * 0.2;
  if (begin) {
    ctx.beginPath();
    ctx.moveTo(x1,y1);
  }
  const cp1x = (x2 - x1) / 3 + x1;
  const cp1y = y1 - height;
  const cp2x = (x2 - x1) * 2 / 3 + x1;
  const cp2y = y1 - height;
  ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x2,y2);
  ctx.stroke();
}

//дуга
function drawArc({ beginX, beginY, endX, endY, begin = true, curvature, lineWidth, stroke, fill, lineCap = "round" }) {
  if (curvature < 0) {
    curvature = -curvature;
    [beginX, beginY, endX, endY] = [endX, endY, beginX, beginY];
  } else if (Math.abs(curvature) < 0.0001) {
    drawLine({ beginX: beginX, beginY: beginY, endX: endX, endY: endY, lineWidth: lineWidth, stroke: stroke, lineCap: lineCap } );
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
  if (begin) ctx.beginPath();
  ctx.arc(x, y, radius, startAngle, endAngle);
  if (stroke) {
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

//кривая Безье с одной контрольной
function drawQuadraticCurve({ beginX, beginY, controlX, controlY, endX, endY, begin = true, lineWidth = 1, stroke, fill }) {
  if (begin) {
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
  }
  ctx.quadraticCurveTo(controlX, controlY, endX, endY);
  if (stroke) {
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

//функция прорисовки линии
function drawLine({ beginX, beginY, endX, endY, begin = true, lineWidth = 1, stroke, lineCap = "round", fill }) {
  if (begin) {
    ctx.beginPath();
    ctx.moveTo(beginX,beginY);
  }
  ctx.lineTo(endX, endY);
  if (stroke) {
    ctx.lineWidth = lineWidth; 
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
}

//переделана для отрисовки ствола
function createPath(paths, trunk = false) {
  if (trunk) treePath = [];
  const branch = new Path2D();
  if (trunk) {
    paths.forEach((path, i) => {
      if (i === 0) {
        branch.moveTo(path.beginX, path.beginY);
      }
      branch.lineTo(path.endX, path.endY);
    });
  } else {
    paths.forEach((path, i) => {
      if (i === 0) {
        branch.moveTo(path.beginX, path.beginY);
        branch.quadraticCurveTo(path.controlX, path.controlY, path.endX, path.endY)
      } else if (i === 1 || i === 3) {
        branch.lineTo(path.endX, path.endY);
      } else if (i === 2) {
        branch.quadraticCurveTo(path.controlX, path.controlY, path.endX, path.endY)
      }
    });
  }
  branch.closePath();
  branch.id = paths[0].id;
  branch.fill = paths[0].fill;
  treePath.push(branch);
}
function drawPath () {

  treePath.forEach(path => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = path.fill;
    ctx.fillStyle = path.fill;
    ctx.stroke(path);
    ctx.fill(path);
  
  })
}

function drawPoint({ point: { x, y, active = false, type = "normal" }, pointSize, pointColors }) {
  ctx.beginPath();
  ctx.arc(x, y, pointSize / 2, 0, 7);
  const key = `${type}${active ? '_active' : ''}`;
  ctx.fillStyle = pointColors;
  // ctx.fillStyle = pointColors[key];
  ctx.fill();
}

export { drawArc, drawLine, curve, drawCircle, drawQuadraticCurve, drawPoint, clear, createPath, drawPath, findPath };