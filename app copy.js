//написать функцию генерации углов
//написать функцию генерации одиночных веток

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
// canvas.style.width = "100%";
// canvas.style.height = "100%";
// const canvasWidth = canvas.width;
// const canvasHeight = canvas.height;

function randm(min, max) {
  return Math.random() * (max - min) + min;
}

// const tree = {
//   x: 250,
//   y: 500,
//   angle: -halfPI,
//   length: 120,
//   width: 40,
//   color: "#4D2323",
//   branches: [
      
//   ]
// };

const growth = {
  maxLength: 150,
  branchingLength: 25,
  branchingCount: 3,
  branchingTotalAngle: Math.PI * 2 / 3 + randm(-1, 1),
  maxBranchDepth: 6,
  maxLengthRatio: 0.7,
  speed: 0.01,
};
const branchingTotalAngle = Math.PI * 2 / 3;
const tree = makeTree({x: 250, y: 500, branchNumber: 4, length: 100, width: 4, branchingTotalAngle, iteration: 2});
drawTree(tree);

/* 
let lastStamp = 0;
let frame = requestAnimationFrame(animate);

setTimeout(() => cancelAnimationFrame(frame), 50000);

function animate(timeStamp) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(tree);
  const timePassed = timeStamp - lastStamp;
  lastStamp = timeStamp;
  grow(tree, timePassed);
  frame = requestAnimationFrame(animate);
}
 */

//функция роста
function grow(tree, time) {
  if (tree.length < growth.maxLength && (!tree.tree || tree.length < growth.maxLengthRatio * tree.tree.length)) {
    tree.length += time * growth.speed;
    // tree.length++;
  }
  if (!tree.branches && tree.length >= growth.branchingLength && tree.depth < growth.maxBranchDepth) {
    // const betweenBranchAngle = Math.PI * 2 / 3 / (growth.branchingCount - 1);
    // console.log(betweenBranchAngle);
    addBranches(tree, growth.branchingCount, 1, 1, growth.branchingTotalAngle, randm(-2, 1))
  }
  tree.branches?.forEach(branch => grow(branch, time));
}



//функция генерации детей
function addBranches(tree, count, length, width, totalAngle, angle = 0, iteration = 0) {
  if (!tree.branches) tree.branches = [];
  console.log(angle);
  const leftBranchAngle = -totalAngle / 2 + angle ;
  const betweenBranchAngle = totalAngle / (count - 1);
  for (let i = 0; i < count; i++) {
    const branchAngle = leftBranchAngle + betweenBranchAngle * i;
    tree.branches[i] = makeBranch(tree, branchAngle, length, width, "#4D2323", tree.depth + 1);
  }
  if (iteration !== 0) {
    tree.branches.forEach((branch) => {
      addBranches(branch, count, length, width, totalAngle, randm(-1, 1), iteration - 1);
    });
  }
}

//функция генерации ветки
function makeBranch(tree, angle, length, width, color, depth) {
  return { tree, angle, length, width, color, depth };
}

//функция генерация угла
//принимает максимальный угол в радианах
//возвращает рандомное значение в радианах
function makeAngle(maxAngle) {
  //перевод радиан в градусы
  const degreesFromRadians = maxAngle * 180 / Math.PI;
  const randomDegrees = randm(0, degreesFromRadians);
  return randomDegrees * Math.PI / 180;
}


//Формируется изначальное дерево, в котором забито кол-во детей 
//добавление остальных детей в функции growth

//функция генерации экземпляра дерева                                   
function makeTree ({x, y, branchNumber, length, width, branchingTotalAngle, iteration = 0}) {
  const tree = {
    x: x,
    y: y,
    angle: -halfPI,
    length: length,
    width: width,
    color: "#4D2323",
    depth: 0,
  };

  addBranches(tree, branchNumber, length, width, branchingTotalAngle, 0, iteration);
  return tree;
}


//функция прорисовки дерева
function drawTree(tree, x, y, angle = 0) {
  const {x: endX, y: endY} = getEndXY(tree.x ?? x, tree.y ?? y, tree.length, tree.angle + angle);
  drawLine(tree.x ?? x, tree.y ?? y, endX, endY, tree.width, tree.color);

  tree.branches?.forEach((branch) => {
    drawTree(branch, endX, endY, tree.angle + angle);
  });
}

//функция прорисовки линии
function drawLine(beginX, beginY, endX, endY, lineWidth, color, lineCap = "round") {
  ctx.beginPath();
  ctx.moveTo(beginX,beginY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = lineWidth; 
  ctx.strokeStyle = color;
  ctx.lineCap = lineCap;
  ctx.stroke();
}

//функция нахождения конечной точки ветки
function getEndXY(x, y, length, angle) {
  return {
    x: x - Math.cos(Math.PI - angle) * length,
    y: y + Math.sin(Math.PI - angle) * length
  }
}

/*
PI * 2 / 3 === 120
2
PI / 3 
-PI / 3

3
-PI / 3
0
PI / 3

4
-PI / 3
-PI / 3 + PI * 2 / 9 
-PI / 3 + PI * 2 / 9 + PI * 2 / 9
-PI / 3 + PI * 2 / 9 + PI * 2 / 9 + PI * 2 / 9   ==> PI / 3

*/


/* function curve(x1,y1,x2,y2) {
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
  canvas.width = innerWidth - 20;
  curve(250,100,350,100) */

//   var p2 = {x: 100   , y: 100   },
//     p1 = {x: 111, y:  30.9},
//     p3 = {x: 149.5 , y:  149.5},
//     diffX = p1.x - p2.x,
//     diffY = p1.y - p2.y,
//     radius = Math.abs(Math.sqrt(diffX*diffX + diffY*diffY)),
//     startAngle = Math.atan2(diffY, diffX),
//     endAngle   = Math.atan2(p3.y - p2.y, p3.x - p2.x),
//     ctx = document.querySelector("canvas").getContext("2d");

// // arc
// ctx.arc(p2.x, p2.y, radius, startAngle, endAngle, false);
// ctx.stroke();