import { makeTree } from "../buildTree.js";
import { drawTree } from "../draw.js";
import { beginGrowth } from "../grow.js";
import { rnd } from "../math.js";

const branchingTotalAngle = Math.PI * 2 / 6;
const treeProperties = {
  x: 250,
  y: 500,
  branchNumber: 2, 
  length: 100, 
  width: 4, 
  branchingTotalAngle, 
  maxCurvature: 0.1, 
  iteration: 0,
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

const tree = makeTree(treeProperties);

// drawTree(tree);

beginGrowth(tree, growth, 50000);