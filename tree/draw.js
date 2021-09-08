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
  drawLine({ beginX: tree.leftDownX, beginY: tree.leftDownY, endX: tree.leftUpX, endY: tree.leftUpY });
  drawLine({ beginX: tree.leftUpX, beginY: tree.leftUpY, endX: tree.rightUpX, endY: tree.rightUpY, begin: false })
  drawLine({ beginX: tree.rightUpX, beginY: tree.rightUpY, endX: tree.rightDownX, endY: tree.rightDownY, begin: false })
  drawLine({ beginX: tree.rightDownX, beginY: tree.rightDownY, endX: tree.leftDownX, endY: tree.leftDownY, begin: false, fill: "#4D2323" })

  tree.branches?.forEach((branch) => {
    drawBranch(branch);
  });
}
function drawBranch(tree) {
  const { x: controlLeftX, y: controlLeftY } = getControlPoint(tree.leftDownX, tree.leftDownY, tree.leftUpX, tree.leftUpY, -10);
  const { x: controlRightX, y: controlRightY } = getControlPoint(tree.rightUpX, tree.rightUpY, tree.rightDownX, tree.rightDownY, 10);
  drawQuadraticCurve({ beginX: tree.leftDownX, beginY: tree.leftDownY, controlX: controlLeftX, controlY: controlLeftY, endX: tree.leftUpX, endY: tree.leftUpY });
  drawLine({ beginX: tree.leftUpX, beginY: tree.leftUpY, endX: tree.rightUpX, endY: tree.rightUpY, begin: false })
  drawQuadraticCurve({ beginX: tree.rightUpX, beginY: tree.rightUpY, controlX: controlRightX, controlY: controlRightY, endX: tree.rightDownX, endY: tree.rightDownY, begin: false });
  drawLine({ beginX: tree.rightDownX, beginY: tree.rightDownY, endX: tree.leftDownX, endY: tree.leftDownY, begin: false, fill: "#4D2323" });
  tree.branches?.forEach((branch) => {
    drawBranch(branch);
  });
}

export { drawTreeLine, drawTree, drawBranch };