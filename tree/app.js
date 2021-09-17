import { makeTree } from "./makeTree.js";
import { prepareTree } from "./buildTree.js";
import { drawTree } from "./draw.js";
import { beginGrowth } from "../grow.js";
import { rnd } from "../math.js";
import { halfPI } from "../geometry.js";

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
console.log(structureTree);
const tree = prepareTree(structureTree);
console.log(tree);
drawTree(tree);

// beginGrowth(tree, growth, 50000);

const points = [];

const pointColors = {
  normal: "black",
  control: "blue",
  normal_active: "red",
  control_active: "cyan",
};

function updatePoints(tree) {
  const br1 = {
    x1: tree.x1,
    y1: tree.y1,
    x12: tree.x12,
    y12: tree.y12,
    x2: tree.x2,
    y2: tree.y2,
  }
  points.push(br1);
console.log(points);

  if (tree.branches){
    for (let i = 0; i < tree.branches.length; i++) {
      updatePoints(tree.branches[i]);
    }
  }
  const br2 = {
    x3: tree.x3,
    y3: tree.y3,
    x34: tree.x34,
    y34: tree.x34,
    x4: tree.x4,
    y4: tree.y4,
  }
  points.push(br2);
  // tree.forEach((branch) => shape.points.forEach((point) => point.shape = shape));
  // points.splice(0, points.lentgth, ...shapes.flatMap(({points}) => points));
}
// updatePoints(tree);