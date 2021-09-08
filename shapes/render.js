import { shapes, points, POINT_SIZE, pointColors } from "./script.js";
import { drawShape } from "./draw.js";
import { drawPoint } from "../canvas.js";
import { save } from "./ls.js";

function render() {
  shapes.forEach(drawShape);
  points.forEach(point => drawPoint({ point: point, pointSize: POINT_SIZE, pointColors: pointColors}));
  save(shapes);
}

function updatePoints() {
  shapes.forEach((shape) => shape.points.forEach((point) => point.shape = shape));
  points.splice(0, points.lentgth, ...shapes.flatMap(({points}) => points));
}

export { render, updatePoints };