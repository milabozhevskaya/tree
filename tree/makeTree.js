// Строится структура дерева за правилами

import { getBetweenBranchAngles, getEndXY } from "../geometry.js";
import { rnd } from "../math.js";


function makeTree(rules) {

  const treeTemplate = {
    x: rules.x,
    y: rules.y,
    angle: rules.angle,
    length: rules.length,
    width: rules.width,  //начальная
    branches: [
      // {
      //   trunk: treeTemplate,
      //   x: x,
      //   y: y,
      //   angle: 0,
      //   length,
      //   width,
      //   branches: [],
      //   color,
      //   depth: 1,
      // } 
    ],
    color: rules.color,
    depth: 0,
  };
  const rulesTemplate = {
    branchNumber: rules.branchNumber,
    roseAngle: rules.roseAngle,
    roseTotalAngle: rules.roseTotalAngle,
    branchingLength: rules.branchingLength, 
    branchingWidth: rules.branchingWidth,
    depth: rules.depth,
  }
  if (treeTemplate.depth < rulesTemplate.depth) {
    addBranches({ tree: treeTemplate, branchRules: rulesTemplate});
  }
  return treeTemplate;
};

function addBranches({ tree, branchRules }) {

  const valueBranches = (tree.depth+1) === branchRules.depth? Math.floor(rnd(0, branchRules.branchNumber) ) : branchRules.branchNumber;
  
  const totalAngle = branchRules.roseTotalAngle + (rnd(0, 1.001) < 0.5 ? -1 : 1) * (branchRules.roseTotalAngle / 4);

  const roseAngle = tree.angle - totalAngle / 2 + (rnd(0, 1.001) < 0.5 ? -1 : 1) * (totalAngle / 5);

  let betweenBranchAngles = getBetweenBranchAngles(branchRules.roseTotalAngle, valueBranches);

  const { x: x, y: y } = getEndXY(tree.x, tree.y,  tree.length, tree.angle );
  
  for (let i = 0; i < valueBranches; i++) {
    
    const length = tree.length * branchRules.branchingLength + (rnd(0, 1.001) < 0.8 ? -1 : 1) * (tree.length * branchRules.branchingLength / 10);

    const width = tree.width * branchRules.branchingWidth + (rnd(0, 1.001) < 0.5 ? -1 : 1) * (tree.width * branchRules.branchingWidth / 10);

    let branchAngle = roseAngle + betweenBranchAngles[i];
    
    if (!tree.branches) tree.branches = [];

    tree.branches[i] = makeBranch(tree, x, y, branchAngle, length, width, tree.color, tree.depth + 1);
    
    if (tree.depth === branchRules.depth) {
      tree.branches[i].widthEnd = width * branchRules.branchingWidth + (rnd(0, 1.001) < 0.5 ? -1 : 1) * (width * branchRules.branchingWidth / 10);
    }
  }
  if (tree.depth < branchRules.depth - 1) {
    tree.branches?.forEach((branch) => {
      addBranches({ tree: branch, branchRules: {  
        branchNumber: branchRules.branchNumber,
        roseAngle: roseAngle,
        roseTotalAngle: totalAngle,
        branchingLength: branchRules.branchingLength, 
        branchingWidth: branchRules.branchingWidth,
        depth: branchRules.depth,
        },
      });
    });
  }
}

//функция генерации ветки
function makeBranch(tree, x, y, branchAngle, length, width, color, depth) {
  return { 
    trunk: tree,
    x: x,
    y: y,
    angle: branchAngle,
    length: length,
    width: width,
    color: color,
    depth: depth,
  };
}

export { makeTree };