import { drawLine, drawCircle, drawQuadraticCurve } from "../canvas.js";

const draw = {
  triangle({points: [a, b, c]}) {
    drawLine({ beginX: a.x, beginY: a.y, endX: b.x, endY: b.y });
    drawLine({ beginX: b.x, beginY: b.y, endX: c.x, endY: c.y, begin: false });
    drawLine({ beginX: c.x, beginY: c.y, endX: a.x, endY: a.y, begin: false, fill: "orange" });
  },
  circle({points: [a, b]}) {
    if (a.type === "control") [a, b] = [b, a];
    const radius = Math.hypot(a.x - b.x, a.y - b.y);
    drawCircle({ x: a.x, y: a.y, radius: radius, fill: "gold" });
  },
  trapezoid({points: [a, b, c, d, e, f]}) {
    drawQuadraticCurve({ beginX: a.x, beginY: a.y, controlX: b.x, controlY: b.y, endX: c.x, endY: c.y });
    drawLine({ beginX: c.x, beginY: c.y, endX: d.x, endY: d.y, begin: false });
    drawQuadraticCurve({ beginX: d.x, beginY: d.y, controlX: e.x, controlY: e.y, endX: f.x, endY: f.y, begin: false });
    drawLine({ beginX: f.x, beginY: f.y, endX: a.x, endY: a.y, begin: false, fill: "yellow" });
  }
};

function drawShape(shape) {
  draw[shape.type](shape);
}
export { drawShape };

// const canvas = document.querySelector('#canvas');
// const ctx = canvas.getContext("2d");
// canvas.width = innerWidth;
// canvas.height = innerHeight;
// ctx.moveTo(50,50);
// ctx.quadraticCurveTo(0,50,50,400);
// ctx.lineTo(400,400);
// ctx.strokeStyle = "red";
// ctx.stroke();
// ctx.quadraticCurveTo(100,50,100,50);
// ctx.lineTo(50,50);

// ctx.fillStyle = "blue";
// ctx.fill()