import { drawBranch } from "../tree/draw.js";
import "./handlers.js";
import { load, save } from "./ls.js";
import { render, updatePoints } from "./render.js";

const POINT_SIZE = 10;

let defaultShapes = [
  {
    type: "triangle",
    points: [
      { x: 100, y: 200 },
      { x: 400, y: 300 },
      { x: 400, y: 100 },
    ],
  },
  {
    type: "circle",
    points: [
      { x: 260, y: 120 },
      { x: 200, y: 100, type: "control" },
    ],
  },
  {
    type: "trapezoid",
    points: [
      { x: 110, y: 410 },
      // { x: 482, y: 70, type: "control" },
      getControlPoint(110, 410, 400, 170, -40),
      { x: 400, y: 170 },
      { x: 410, y: 170 },
      // { x: 271, y: 165, type: "control" },
      getControlPoint(370, 410, 410, 170, 40),
      { x: 370, y: 410 },
    ]
  },
]

// {
//   type: "trapezoid",
//   points: [
//     { x: 110, y: 410 },
//     // { x: 482, y: 70, type: "control" },
//     getControlPoint(110, 410, 400, 170, -40),
//     { x: 400, y: 170 },
//     { x: 410, y: 170 },
//     // { x: 271, y: 165, type: "control" },
//     getControlPoint(370, 410, 410, 170, 40),
//     { x: 370, y: 410 },
//   ]
// },
// createTrapezoid(110, 410, 400, 170, 410, 170, 370, 410),
// ];

let shapes = [];
const points = [];

const pointColors = {
  normal: "black",
  control: "blue",
  normal_active: "red",
  control_active: "cyan",
};

load();
updatePoints();
render();
drawBranch();
export { defaultShapes, shapes, points, POINT_SIZE, pointColors };
