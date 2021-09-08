import { rnd } from "../math.js";
import { getControlPoint } from "../geometry.js";

function shapeTrapezoid() {
  const center = { x: canvas.width / 2, y: canvas.height / 2 };
  const x1 = rnd(0, center.x);
  const y1 = rnd(center.y, canvas.height);
  const x2 = rnd(0, center.x);
  const y2 = rnd(0, center.y);
  const x3 = rnd(center.x, canvas.width);
  const y3 = rnd(0, center.y);
  const x4 = rnd(center.x, canvas.width);
  const y4 = rnd(center.y, canvas.height);
  const trapezoid = createTrapezoid(x1, y1, x2, y2, x3, y3, x4, y4);
  return trapezoid;
}


function createTrapezoid(x1, y1, x2, y2, x3, y3, x4, y4) {
  const h =  (Math.hypot(x4 - x1, y4 - y1) + Math.hypot(x3 - x2, y3 - y2)) / 6;
  return {
    type: "trapezoid",
    points: [
      { x: x1, y: y1 },
      getControlPoint(x1, y1, x2, y2, -h),
      { x: x2, y: y2 },
      { x: x3, y: y3 },
      getControlPoint(x4, y4, x3, y3, h),
      { x: x4, y: y4 },
    ]
  }
}

export { shapeTrapezoid };