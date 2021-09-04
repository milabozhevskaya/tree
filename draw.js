import { getEndXY } from "./geometry.js";
import { drawArc, drawLine } from "./canvas.js";

//функция прорисовки дерева
function drawTree(tree, x, y, angle = 0) {
  const {x: endX, y: endY} = getEndXY(tree.x ?? x, tree.y ?? y, tree.length, tree.angle + angle);
  drawArc(tree.x ?? x, tree.y ?? y, endX, endY, tree.curvature, tree.width, tree.color);

  tree.branches?.forEach((branch) => {
    drawTree(branch, endX, endY, tree.angle + angle);
  });
}


export { drawTree };