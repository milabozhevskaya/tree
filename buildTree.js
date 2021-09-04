import { halfPI } from "./geometry.js";

//функция генерации экземпляра дерева                                   
function makeTree({x, y, branchNumber, length, width, branchingTotalAngle, maxCurvature = 0, iteration = 0}) {
  const tree = {
    x: x,
    y: y,
    curvature: 0,
    angle: -halfPI,
    length: length,
    width: width,
    color: "#4D2323",
    depth: 0,
  };
  if (iteration !== 0) {
    addBranches(tree, branchNumber, length, width, branchingTotalAngle, 0, maxCurvature, iteration - 1);
  }
  return tree;
}

//функция генерации детей
function addBranches(tree, count, length, width, totalAngle, angle = 0, maxCurvature = 0, iteration = 0) {
  if (!tree.branches) tree.branches = [];
  const leftBranchAngle = -totalAngle / 2 + angle ;
  const betweenBranchAngle = totalAngle / (count - 1);
  for (let i = 0; i < count; i++) {

    const curvature = i === (count -1) / 2? 0 : i < (count - 1) / 2? maxCurvature : -maxCurvature;
    const branchAngle = leftBranchAngle + betweenBranchAngle * i;
    tree.branches[i] = makeBranch(tree, branchAngle, length, width, curvature, "#4D2323", tree.depth + 1);
  }
  if (iteration !== 0) {
    tree.branches.forEach((branch) => {
      addBranches(branch, count, length, width, totalAngle, 0, maxCurvature, iteration - 1);
    });
  }
}

//функция генерации ветки
function makeBranch(tree, angle, length, width, curvature, color, depth) {
  return { tree, angle, length, width, curvature, color, depth };
}

export { makeTree, addBranches };