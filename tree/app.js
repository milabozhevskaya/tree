import { makeTree } from "./makeTree.js";
import { prepareTree } from "./buildTree.js";
import { drawTree } from "./draw.js";
import { beginGrowth } from "../grow.js";
import { rnd } from "../math.js";
import { halfPI } from "../geometry.js";
import "./handler.js";
// import { render } from "./handler.js";
import { drawPoint } from "../canvas.js";

const treeDescriptor = {
  x: 650,
  y: 1050,
  branchingPotency: 2,
  angle: -halfPI,
  bendAngle: 0, // 1 - to right,  -1 - to left
  rosetteTotalAngle: Math.PI / 3,
  length: 180,
  width: 94,
  branchLengthRatio: 0.9,
  branchWidthRatio: 0.5,
  color: "#4D2323",
  maxDepth: 6,
};

const growth = {
  maxLength: 150,
  branchingLength: 25,
  branchingCount: 3,
  branchingTotalAngle: Math.PI * 2 / 3 + rnd(-1, 1),
  maxBranchDepth: 2,
  maxLengthRatio: 0.7,
  speed: 0.01,
};

const structureTree = makeTree(treeDescriptor);

let points = getTreePoints(structureTree);

// const tree = prepareTree(structureTree);


// beginGrowth(tree, growth, 50000);

const POINT_SIZE = 10;

const pointColors = {
  normal: "black",
  control: "blue",
  normal_active: "red",
  control_active: "cyan",
};

function getTreePoints(structureTree, points = []) {

  points.push({ x: structureTree.x, y: structureTree.y, id: structureTree.id });

  if (structureTree.branches !== 0) {

    points.push({ x: structureTree.branches[0].x, y: structureTree.branches[0].y, id: structureTree.id });

    points = getBranchesPoints(structureTree, points);
  }
  return points;
};

function getBranchesPoints(tree, points) {
 
  for (let i = 0; i < tree.branches.length; i++) {
 
    const branch = tree.branches[i];

    points.push({ x: (branch.branches.length !== 0? branch.branches[0].x : branch.endX), y: (branch.branches.length !== 0? branch.branches[0].y : branch.endY), id: branch.id });
    
    if (branch.branches.length !== 0) {
      getBranchesPoints(branch, points);
    } 
    // else {
    //   points.push({ x: tree.branches[i].x, y: tree.branches[i].y, id: tree.branches[i].id });

    // }
  }
  return points;
}
render2(structureTree, points);


function render2() {
  const tree = prepareTree(structureTree);
  // console.log(tree);
  drawTree(tree);

  points.forEach(point => {
    drawPoint({ point: point, pointSize: POINT_SIZE, pointColors: "red"})
  });
  
}

function moveBranch(structureTree, activePoint, coord) {
  for (let i = 0; i < structureTree.branches.length; i++) {
    if (structureTree.branches[i].id === activePoint.id) {
      // structureTree.branches[i].length = Math.
      structureTree.branches[i].length = 20;
     
    } else if (structureTree.branches[i].branches.length !== 0) {
      // console.log(structureTree.branches[i].branches.length);
      moveBranch(structureTree.branches[i], activePoint, coord);
    }
  }
}


// export { render };

export { points, POINT_SIZE, render2, moveBranch, structureTree };