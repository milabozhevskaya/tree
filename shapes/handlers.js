import { shapes, points, POINT_SIZE } from "./script.js";
import { clear } from "../canvas.js";
import { render, updatePoints } from "./render.js";
import { shapeTrapezoid } from "./build.js";

let activePoint = null;

const buttonAddTrapezoid = document.querySelector(".btn-trapezoid");

buttonAddTrapezoid.addEventListener("click", addTrapezoid);

canvas.onmousedown = (e) => {
  if (activePoint) {
    activePoint.active = false;
    activePoint = null;
  }
  const point = findPoint(e.layerX, e.layerY, points);
  if (point) {
    point.active = true;
    activePoint = point;
    // console.log(point);
  }
  clear();
  render();
}

canvas.onmousemove = (e) => {
  if (activePoint) {
    movePoint(activePoint, {x: e.layerX, y: e.layerY});
    bringForward(activePoint);
    clear();
    render();
  }
}

canvas.onmouseup = (e) => {
  if (activePoint) {
    activePoint.active = false;
    activePoint = null;
    clear();
    render();
  }
}

function movePoint(point, {x, y}) {
  if (point.type === "normal" || !point.type) {
    const normalPoints = point.shape.points.filter((point) => point.type === "normal" || !point.type);
    if (normalPoints.length === 1) {
      const pointsToMove = point.shape.points.filter((point) => !normalPoints.includes(point));
      const deltaX = x - point.x;
      const deltaY = y - point.y;
      pointsToMove.forEach((point) => {
        point.x += deltaX;
        point.y += deltaY;
      })
    }
  }
  point.x = x;
  point.y = y;
}

function findPoint(x, y, points) {
  return points.find((point) => {
    const distance = Math.hypot(point.x - x, point.y - y);
    return distance < POINT_SIZE / 2;
  }) || null;
}

function findArc(x, y) {
  const arcs = shaapes.filter((shape) => {
    if (shape.type === "circle") {
      return shape;
    }
  });
  
  return arcs.find((arc) => {
    const distance = Math.hypot(arc.points[0].x - x, arc.points[0].y - y);
    return distance < arc.radius + 5 && distance > arc.radius - 5;
  })
}

function bringForward(point) {
  points.splice(0, points.length, ...points.filter(p => p != point), point);
}

function addTrapezoid() {
  const trapezoid = shapeTrapezoid();
  shapes.push(trapezoid);
  points.push(trapezoid.points);
  updatePoints();
  render();
}
