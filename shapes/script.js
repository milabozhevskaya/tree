const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");


const POINT_SIZE = 10;

let shapesDefault = [
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
];

let shapes = [];
const points = [];




let activePoint = null;

const pointColors = {
  normal: "black",
  control: "blue",
  normal_active: "red",
  control_active: "cyan",
};

const draw = {
  triangle({points: [a, b, c]}) {
    drawLine(a.x, a.y, b.x, b.y);
    drawLine(b.x, b.y, c.x, c.y);
    drawLine(c.x, c.y, a.x, a.y);
  },
  circle({points: [a, b]}) {
    if (a.type === "control") [a, b] = [b, a];
    const radius = Math.hypot(a.x - b.x, a.y - b.y);
    drawCircle(a.x, a.y, radius);
  },
  trapezoid({points: [a, b, c, d, e, f]}) {
    drawQuadraticCurve(a.x, a.y, b.x, b.y, c.x, c.y);
    drawLine(c.x, c.y, d.x, d.y);
    drawQuadraticCurve(d.x, d.y, e.x, e.y, f.x, f.y);
    drawLine(f.x, f.y, a.x, a.y);
  }
}


canvas.onmousedown = (e) => {
  if (activePoint) {
    activePoint.active = false;
    activePoint = null;
  }
  const point = findPoint(e.layerX, e.layerY);
  if (point) {
    point.active = true;
    activePoint = point;
    console.log(point);
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

load();

addTrapezoid();

updatePoints();

render();

function load() {
  if (localStorage.shapes) {
    shapes = JSON.parse(localStorage.shapes);
  } else {
    shapes = shapesDefault;
  }
}

function save() {
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




function drawCircle(x, y, radius, lineWidth = 1, color = "black") {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 7);
  ctx.lineWidth = lineWidth; 
  ctx.strokeStyle = color;
  ctx.stroke();
}





function drawShape(shape) {
  draw[shape.type](shape);
}



function render() {
  shapes.forEach(drawShape);
  points.forEach(drawPoint);
  save();
}

function findPoint(x, y) {
  return points.find((point) => {
    const distance = Math.hypot(point.x - x, point.y - y);
    return distance < POINT_SIZE / 2;
  }) || null;
}

function findArc(x, y) {
  const arcs = shapes.filter((shape) => {
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

function addTrapezoid() {
  const center = { x: canvas.width / 2, y: canvas.height / 2 };
  // const x1 = rnd(0, center.x);
  // const y1 = rnd(center.y, canvas.height);
  // const x2 = rnd(0, center.x);
  // const y2 = rnd(0, center.y);
  // const x3 = rnd(center.x, canvas.width);
  // const y3 = rnd(0, center.y);
  // const x4 = rnd(center.x, canvas.width);
  // const y4 = rnd(center.y, canvas.height);
  const trapezoid = createTrapezoid(x1, y1, x2, y2, x3, y3, x4, y4);
  shapes.push(trapezoid);
  points.push(trapezoid.points);
}

function updatePoints() {
  shapes.forEach((shape) => shape.points.forEach((point) => point.shape = shape));
  points.splice(0, points.lentgth, ...shapes.flatMap(({points}) => points));
}















/* function bringForward(point) {
  const { points } = point.shape;
  points.splice(0, points.length, ...points.filter(p => p != point), point);
  shapes.splice(0, shapes.length, ...shapes.filter(shape => shape != point.shape), point.shape);
} */


















