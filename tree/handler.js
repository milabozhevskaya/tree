import { points, POINT_SIZE, render2, moveBranch, structureTree } from "./app.js";
import { drawPoint, clear } from "../canvas.js";
 
let activePoint = null;

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
  render2();
}

canvas.onmousemove = (e) => {
  if (activePoint) {
    moveBranch(structureTree, activePoint, {x: e.layerX, y: e.layerY});
    // bringForward(activePoint);
    clear();
    render2();
  }
}

canvas.onmouseup = (e) => {
  if (activePoint) {
    activePoint.active = false;
    activePoint = null;
    clear();
    render2();
  }
}

function movePoint(point, {x, y}) {
  // if (point.type === "normal" || !point.type) {
  //   const normalPoints = point.shape.points.filter((point) => point.type === "normal" || !point.type);
  //   if (normalPoints.length === 1) {
  //     const pointsToMove = point.shape.points.filter((point) => !normalPoints.includes(point));
  //     const deltaX = x - point.x;
  //     const deltaY = y - point.y;
  //     pointsToMove.forEach((point) => {
  //       point.x += deltaX;
  //       point.y += deltaY;
  //     })
  //   }
  // }
  point.x = x;
  point.y = y;
}

function findPoint(x, y, points) {
  return points.find((point) => {
    const distance = Math.hypot(point.x - x, point.y - y);
    return distance < POINT_SIZE / 2;
  }) || null;
}


// function render() {
//   points.forEach(point => {
//     drawPoint({ point: point, pointSize: POINT_SIZE, pointColors: "red"})
//   });
//   render2();
// }

// export { render };