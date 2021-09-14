import { makeTree } from "./makeTree.js";
import { buildTree } from "./buildTree.js";
import { drawTree } from "./draw.js";
import { beginGrowth } from "../grow.js";
import { rnd } from "../math.js";
import { halfPI } from "../geometry.js";

const branchesRules = {
  x: 450,
  y: 1050,
  branchNumber: 2,
  angle: -halfPI,
  roseAngle: 0, // 1 - to right,  -1 - to left
  roseTotalAngle: Math.PI / 3,
  length: 180,
  width: 94,
  branchingLength: 0.9,
  branchingWidth: 0.5,
  color: "#4D2323",
  depth: 6,
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

const structureTree = makeTree(branchesRules);
const tree = buildTree(structureTree);
// console.log(tree);
drawTree(tree);

// beginGrowth(tree, growth, 50000);