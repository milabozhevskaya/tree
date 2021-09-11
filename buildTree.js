import { halfPI, getUpPointsBranch, getEndPointsBranch, getCenterXY, getHeightCurvature } from "./geometry.js";
import { rnd } from "./math.js";

//функция генерации экземпляра дерева                                   
function makeTree({x, y, branchNumber, angle = -halfPI, length, branchingLength, width, branchingWidth, branchingTotalAngle, maxCurvature = 0, iteration = 0}) {
  
  const totalAngle = (rnd(0, 1.001) < 0.5 ? -1 : 1) * (branchingTotalAngle / 5) + branchingTotalAngle;
  const roseAngle = angle - (rnd(0, 1.001) < 0.5 ? -1 : 1) * (totalAngle / 4) - totalAngle / 2;
  const { leftUpX: leftUpX, leftUpY: leftUpY, rightUpX: rightUpX, rightUpY: rightUpY } = getEndPointsBranch({ x: x, y: y, angle, roseTotalAngle: totalAngle, roseAngle: roseAngle, length: length, width: width * branchingWidth });
  // const { leftUpX: leftUpX, leftUpY: leftUpY, rightUpX: rightUpX, rightUpY: rightUpY } = getUpPointsBranch({ x: x, y: y, length: length, width: width * branchingWidth });

  const tree = {
    x: x,
    y: y, 
    leftDownX: x - width / 2,
    leftDownY: y,
    rightDownX: x + width / 2,
    rightDownY: y,
    leftUpX: leftUpX, 
    leftUpY: leftUpY,
    rightUpX: rightUpX,
    rightUpY: rightUpY,
    curvature: 0,
    angle: angle,
    roseAngle: roseAngle,
    roseTotalAngle: totalAngle,
    length: length,
    width: width,
    endWidth: width * branchingWidth,
    color: "#4D2323",
    depth: 0,
  };
  
  if (iteration !== 0) {
    addBranches({ tree: tree, count: branchNumber, branchingLength: branchingLength, branchingWidth: branchingWidth, iteration: iteration - 1 });
  }
  return tree;
}

//функция генерации детей
function addBranches({ tree, count, branchingLength, branchingWidth, maxCurvature = 0, iteration = 0 }) {

  if (!tree.branches) tree.branches = [];
  
  let betweenBranchAngles = [];
  betweenBranchAngles[0] = tree.roseTotalAngle;
  for (let i = 1; i < count - 1; i++) {
    betweenBranchAngles[i] = rnd(0, tree.roseTotalAngle);
  }
  betweenBranchAngles.push(0);
  betweenBranchAngles.sort();

  const length = tree.length * branchingLength;
  const width = tree.width * branchingWidth;
  const heightCurvature = (tree.width - width) / 7;
  const heightCurvatureLeft = heightCurvature;
  const heightCurvatureRight = heightCurvature;

  const { x: centerX, y: centerY} = getCenterXY(tree.leftUpX, tree.leftUpY, tree.rightUpX, tree.rightUpY);

  for (let i = 0; i < count; i++) {
    const curvature = i === (count -1) / 2? 0 : i < (count - 1) / 2? maxCurvature : -maxCurvature;
    let branchAngle = tree.roseAngle + betweenBranchAngles[i];

    //для данной ветки расчитываем общий угол розетки его детей
    const roseTotalAngle = (rnd(0, 1.001) < 0.5 ? -1 : 1) * (tree.roseTotalAngle / 4) + tree.roseTotalAngle;
    
    //для данной ветки расчитываем угол поворота розетки ее детей
    const roseAngle = branchAngle - roseTotalAngle / 2 + (rnd(0, 1.001) < 0.5 ? -1 : 1) * (roseTotalAngle / 5);
    // const roseAngle = branchAngle - (rnd(0, 1.001) < 0.5 ? -1 : 1) * (roseTotalAngle / 4) - roseTotalAngle / 2;
    
    const { leftUpX: leftUpX, leftUpY: leftUpY, rightUpX: rightUpX, rightUpY: rightUpY } = getEndPointsBranch({ x: centerX, y: centerY, angle: branchAngle, roseTotalAngle: roseTotalAngle, roseAngle: roseAngle, length: length, width: width * branchingWidth });

    // const heightCurvatureLeft = getHeightCurvature({ x1: tree.leftUpX, y1: tree.leftUpY, x2: leftUpX, y2: leftUpY, pointAngle: branchAngle });
    // const heightCurvatureRight = getHeightCurvature({ x1: tree.rightDownX, y1: tree.rightDownY, x2: rightUpX, y2: tree.rightUpY, pointX: centerX + width * branchingWidth / 2, pointY: centerY, pointAngle: branchAngle }) * -1;

    tree.branches[i] = makeBranch(tree, leftUpX, leftUpY, rightUpX, rightUpY, branchAngle, roseAngle, roseTotalAngle, length, width, heightCurvatureLeft, heightCurvatureRight, curvature, "#4D2323", tree.depth + 1);
  }
  if (iteration !== 0) {
    tree.branches.forEach((branch) => {
      addBranches({ tree: branch, count: count, branchingLength: branchingLength, branchingWidth: branchingWidth, maxCurvature: maxCurvature, iteration: iteration - 1 });
    });
  }
}

//функция генерации ветки
function makeBranch(tree, leftUpX, leftUpY, rightUpX, rightUpY, angle, roseAngle, roseTotalAngle, length, width, heightCurvatureLeft, heightCurvatureRight, curvature, color, depth) {
  return { 
    leftDownX: tree.leftUpX,
    leftDownY: tree.leftUpY,
    rightDownX: tree.rightUpX,
    rightDownY: tree.rightUpY,
    leftUpX: leftUpX, 
    leftUpY: leftUpY,
    rightUpX: rightUpX,
    rightUpY: rightUpY,
    heightCurvatureLeft: heightCurvatureLeft, 
    heightCurvatureRight: heightCurvatureRight,
    curvature: 0,
    angle: angle,
    roseAngle: roseAngle,
    roseTotalAngle: roseTotalAngle,
    length: length,
    width: width,
    color: color,
    depth: depth,
    // tree, angle, length, width, curvature, color, depth 
  };
}

export { makeTree, addBranches };