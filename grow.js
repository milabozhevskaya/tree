import { rnd } from "./math.js";
import { clear } from "./canvas.js";
import { drawTree } from "./tree/draw.js";
import { addBranches } from "./buildTree.js";


let lastStamp = 0;
let frame = 0;

function beginGrowth(tree, growth, duration) {

  frame = requestAnimationFrame(makeAnimate(tree, growth));
  
  setTimeout(() => cancelAnimationFrame(frame), duration);
  
}

function makeAnimate(tree, growth) {
  return function animate(timeStamp) {
    clear();
    drawTree(tree);
    const timePassed = timeStamp - lastStamp;
    lastStamp = timeStamp;
    grow(tree, growth, timePassed);
    frame = requestAnimationFrame(animate);
  }
}



//функция роста
function grow(tree, growth, time) {
  if (tree.length < growth.maxLength && (!tree.tree || tree.length < growth.maxLengthRatio * tree.tree.length)) {
    tree.length += time * growth.speed;
    // tree.length++;
  }
  if (!tree.branches && tree.length >= growth.branchingLength && tree.depth < growth.maxBranchDepth) {
    // const betweenBranchAngle = Math.PI * 2 / 3 / (growth.branchingCount - 1);
    // console.log(betweenBranchAngle);
    addBranches(tree, growth.branchingCount, 1, 1, growth.branchingTotalAngle, 0);
  }
  tree.branches?.forEach(branch => grow(branch, growth, time));
}

export { beginGrowth };