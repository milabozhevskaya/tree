import { makeTree } from "./makeTree.js";
import { rnd } from "../math.js";
import { halfPI } from "../geometry.js";
import { render } from "./handler.js";

const treeDescriptor = {
  x: 650,
  y: 950,
  branchingPotency: 2,
  angle: -halfPI,
  bendAngle: 0, // 1 - to right,  -1 - to left
  rosetteTotalAngle: Math.PI / 3,
  length: 180,
  width: 94,
  branchLengthRatio: 0.9,
  branchWidthRatio: 0.5,
  color: "#4D2323",
  maxDepth: 5,
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

// beginGrowth(tree, growth, 50000);

const POINT_SIZE = 10;

const pointColors = {
  normal: "black",
  control: "blue",
  normal_active: "red",
  control_active: "cyan",
};

render();

export { POINT_SIZE, structureTree };
