import { shapes, defaultShapes } from "./script.js";

function load() {
  shapes.splice(0, shapes.length, ...localStorage.shapes? JSON.parse(localStorage.shapes) : defaultShapes);
}

function save(shapes) {
  const data = shapes.map((shape) => {
    const clone = {};
    for( const key in shape) {
      if (key === "points") clone.points = shape.points.map(({shape, ...point }) => point);
      else clone[key] = shape[key];
    }
    return clone;
  });
  localStorage.shapes = JSON.stringify(data);
}

export { load, save };