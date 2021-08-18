const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
// canvas.style.width = "100%";
// canvas.style.height = "100%";
// const canvasWidth = canvas.width;
// const canvasHeight = canvas.height;
const halfPI = Math.PI / 2;

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
  maxBranchDepth: 6,
  maxLengthRatio: 0.7,
  speed: 0.01,
};

const tree = makeTree({x: 250, y: 500, branchNumber: 4, length: 100, width: 2});

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

//написать функцию роста дерева
//написать функцию генерации углов
//написать функцию генерации длинны веток
//написать функцию генерации одиночных веток

//функция генерации детей
function addBranches(tree, count, length, width, iteration = 0) {
  if (!tree.branches) tree.branches = [];
  const leftBranchAngle = -Math.PI / 3;
  const betweenBranchAngle = Math.PI * 2 / 3 / (count - 1);
  for (let i = 0; i < count; i++) {
    const angle = leftBranchAngle + betweenBranchAngle * i;
    tree.branches[i] = makeBranch(tree, angle, length, width, "#4D2323", tree.depth + 1);
  }
  if (iteration !== 0) {
    tree.branches.forEach((branch) => {
      addBranches(branch, count, length, width, iteration - 1);
    });
  }
}

//функция генерации ветки
function makeBranch(tree, angle, length, width, color, depth) {
  return { tree, angle, length, width, color, depth };
}

//функция генерации экземпляра дерева
function makeTree ({x, y, branchNumber, length, width, iteration = 0}) {
  const tree = {
    x: x,
    y: y,
    angle: -halfPI,
    length: 100,
    width: 2,
    color: "#4D2323",
    depth: 0,
  };
  for (let i = 0; i < iteration; i++) {
    addBranches(tree, branchNumber, length, width, iteration);
  }
  return tree;
}

//функция роста
function grow(tree, time) {
  if (tree.length < growth.maxLength && (!tree.tree || tree.length < growth.maxLengthRatio * tree.tree.length)) {
    tree.length += time * growth.speed;
    // tree.length++;
  }
  if (!tree.branches && tree.length >= growth.branchingLength && tree.depth < growth.maxBranchDepth) {
    addBranches(tree, growth.branchingCount, 1, 1)
  }
  tree.branches?.forEach(branch => grow(branch, time));
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