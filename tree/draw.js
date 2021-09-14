import { getControlPoint, getEndXY } from "../geometry.js";
import { drawArc, drawLine, drawQuadraticCurve } from "../canvas.js";

//функция прорисовки дерева (line)
function drawTreeLine(tree, x, y, angle = 0) {
  const {x: endX, y: endY} = getEndXY(tree.x ?? x, tree.y ?? y, tree.length, tree.angle + angle);
  drawArc({ beginX: tree.x ?? x, beginY: tree.y ?? y, endX: endX, endY: endY, curvature: tree.curvature, lineWidth: tree.width, stroke : tree.color });

  tree.branches?.forEach((branch) => {
    drawTreeLine(branch, endX, endY, tree.angle + angle);
  });
}

//функция прорисовки дерева (line)
function drawTree(tree) {
  drawLine({ beginX: tree.x1, beginY: tree.y1, endX: tree.x2, endY: tree.y2 });
  drawLine({ beginX: tree.x2, beginY: tree.y2, endX: tree.x3, endY: tree.y3, begin: false })
  drawLine({ beginX: tree.x3, beginY: tree.y3, endX: tree.x4, endY: tree.y4, begin: false })
  drawLine({ beginX: tree.x4, beginY: tree.y4, endX: tree.x1, endY: tree.y1, begin: false, fill: tree.color })

  tree.branches?.forEach((branch) => {
    drawBranch(branch);
  });
}
function drawBranch(tree) {
  
  drawQuadraticCurve({ beginX: tree.x1, beginY: tree.y1, controlX: tree.x12, controlY: tree.y12, endX: tree.x2, endY: tree.y2 });
  drawLine({ beginX: tree.x2, beginY: tree.y2, endX: tree.x3, endY: tree.y3, begin: false })
  drawQuadraticCurve({ beginX: tree.x3, beginY: tree.y3, controlX: tree.x34, controlY: tree.y34, endX: tree.x4, endY: tree.y4, begin: false });
  drawLine({ beginX: tree.x4, beginY: tree.y4, endX: tree.x1, endY: tree.y1, begin: false, fill: tree.color });
  tree.branches?.forEach((branch) => {
    drawBranch(branch);
  });
}

export { drawTreeLine, drawTree, drawBranch };