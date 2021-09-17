import { halfPI, getBranchingPoints, getControlPoint, getHeightCurvature } from "../geometry.js";
import { rnd } from "../math.js";

function prepareTree(tree) {
  const rosetteTotalAngle = tree.branches? (tree.branches.length > 1? (-tree.branches[0].angle + tree.branches[tree.branches.length - 1].angle) : -tree.branches[0].angle) : halfPI;

  const roseAngle = tree.branches? tree.branches[0].angle : tree.angle;

  const x1 = tree.x - tree.width / 2;

  const x4 = tree.x + tree.width / 2

  const endWidth = tree.branches? tree.branches[0].width : tree.endWidth;

  const { leftUpX: x2, leftUpY: y2, rightUpX: x3, rightUpY: y3 } = getBranchingPoints({ x: tree.x, y: tree.y, angle: tree.angle, rosetteTotalAngle: rosetteTotalAngle, roseAngle: roseAngle, length: tree.length, width: endWidth });

  const heightCurvature = (tree.width - endWidth) * 20 / 2 + 300;

  const { x: x12, y: y12 } = getControlPoint({ x1: x1, y1: tree.y, x2: x2, y2: y2, h: -heightCurvature });
  const { x: x34, y: y34 } = getControlPoint({ x1: x3, y1: y3, x2: x4, y2: tree.y, h: heightCurvature });

  const treeRenderable = {
    x1: x1,
    y1: tree.y,
    x2: x2,
    y2: y2,
    x12: x12,
    y12: y12,
    x3: x3,
    y3: y3,
    x4: x4,
    y4: tree.y,
    x34: x34,
    y34: y34,
    color: tree.color,
    depth: 0,
  }
  if (tree.branches !== 0) {
    buildBranches(treeRenderable, tree);
  }
  return treeRenderable;
}

//Функция вызывается при условии, что у ветки tree есть дети
function buildBranches(treeRenderable, tree) {
  
  if (!treeRenderable.branches) treeRenderable.branches = [];

  for (let i = 0; i < tree.branches.length; i++) {

    const branch = tree.branches[i];

    //чтоб найти конечные точки этой ветки, надо найти угол поворота розетки ее детей и угол розетки

    const rosetteTotalAngle = branch.branches.length !== 0? (branch.branches.length > 1? (-branch.branches[0].angle + branch.branches[branch.branches.length - 1].angle) : -branch.branches[0].angle) : (branch.angle + (rnd(0, 1.001) < 0.5 ? -1 : 1) * (branch.angle / 4));

    const roseAngle = branch.branches.length !== 0? branch.branches[0].angle : branch.angle;
    
    console.log(branch.branches.length !== 0? branch.branches[0].width : branch.endWidth, "before", branch.depth);

    const endWidth = branch.branches.length !== 0? branch.branches[0].width : branch.endWidth;

    const { leftUpX: x2, leftUpY: y2, rightUpX: x3, rightUpY: y3 } = getBranchingPoints({ x: branch.x, y: branch.y, angle: branch.angle, rosetteTotalAngle: rosetteTotalAngle, roseAngle: roseAngle, length: branch.length, width: endWidth });

    // const heightCurvature = (branch.width - endWidth) / 7;
    const heightCurvatureLeft = getHeightCurvature({ x1: treeRenderable.x2, y1: treeRenderable.y2, x2: x2, y2: y2, pointAngle: branch.angle });
    const heightCurvatureRight = getHeightCurvature({ x1: treeRenderable.x3, y1: treeRenderable.y3, x2: x3, y2: y3,  pointAngle: branch.angle }) * -1;

    const { x: x12, y: y12 } = getControlPoint({ x1: treeRenderable.x2, y1: treeRenderable.y2, x2: x2, y2: y2, h: -heightCurvatureLeft });

    const { x: x34, y: y34 } = getControlPoint({ x1: x3, y1: y3, x2: treeRenderable.x3, y2: treeRenderable.y3, h: -heightCurvatureRight });

    // точки ребенка
    treeRenderable.branches[i] = {
      x1: treeRenderable.x2,
      y1: treeRenderable.y2,
      x2: x2,
      y2: y2,
      x12: x12,
      y12: y12,
      x3: x3,
      y3: y3,
      x4: treeRenderable.x3,
      y4: treeRenderable.y3,
      x34: x34,
      y34: y34,
      color: treeRenderable.color,
      depth: branch.depth,
    };

    //Если у ребенка есть дети, то вызвать buildBranches и передать ей ребенка
    if (branch.branches !== 0) {
      for (let k = 0; k < branch.branches.length; k++) {
        buildBranches(treeRenderable.branches[i], branch);
      };
    } 
  }
}

export { prepareTree };