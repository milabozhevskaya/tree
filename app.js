
// const tree = {
//   x: 250,
//   y: 500,
//   angle: -halfPI,
//   length: 120,
//   width: 40,
//   color: "#4D2323",
//   branches: [
      
//   ]
// };




/* 

 */









//функция генерация угла
//принимает максимальный угол в радианах
//возвращает рандомное значение в радианах
function makeAngle(maxAngle) {
  //перевод радиан в градусы
  const degreesFromRadians = maxAngle * 180 / Math.PI;
  const randomDegrees = randm(0, degreesFromRadians);
  return randomDegrees * Math.PI / 180;
}

function drawCurvedTrapezia(x1, y1, x2, y2, x3, y3, x4, y4) {
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.quadraticCurveTo(x1+100,y1, x2, y2)
  ctx.stroke();
  // drawLine(x1, y1, x2, y2);
  drawLine(x2, y2, x3, y3);
  drawLine(x3, y3, x4, y4);
  drawLine(x4, y4, x1, y1);
  
}
drawCurvedTrapezia(200,500,300,200,400,200,500,500);
//Формируется изначальное дерево, в котором забито кол-во детей 
//добавление остальных детей в функции growth











/*
PI * 2 / 3 === 120
2
PI / 3 
-PI / 3

3
-PI / 3
0
PI / 3

4
-PI / 3
-PI / 3 + PI * 2 / 9 
-PI / 3 + PI * 2 / 9 + PI * 2 / 9
-PI / 3 + PI * 2 / 9 + PI * 2 / 9 + PI * 2 / 9   ==> PI / 3

*/


/* function curve(x1,y1,x2,y2) {
  const height = (x2 - x1) * 0.2;
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  const cp1x = (x2 - x1) / 3 + x1;
  const cp1y = y1 - height;
  const cp2x = (x2 - x1) * 2 / 3 + x1;
  const cp2y = y1 - height;
  ctx.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x2,y2);
  ctx.stroke();
  }
  canvas.width = innerWidth - 20;
  curve(250,100,350,100) */

  
/*   drawLine(200,200, 100,100, 1, "black");
  drawArc(200,200, 100,100, 1, "black");
  drawArc(100,100,200,200, 1, "black")
  drawArc(100,100,300,300, 1, "black")
  drawArc(300,300, 100,100,1, "black")
  drawArc(100,100,100,200, 1, "black")
  drawArc(100,200, 100,100,1, "black")
  drawArc(100,100,200,100, 1, "black")
  drawArc(200,100, 100,100,1, "black")
  ctx.fillStyle = '#1a2edb'; // тёмно-синий цвет
  ctx.fill(); */
/* 
  var p2 = {x: 100   , y: 100   };
    p1 = {x: 111, y:  30.9};
    p3 = {x: 149.5 , y:  149.5};
    diffX = p1.x - p2.x;
    diffY = p1.y - p2.y;
    radius = Math.abs(Math.sqrt(diffX*diffX + diffY*diffY));
    startAngle = Math.atan2(diffY, diffX);
    endAngle   = Math.atan2(p3.y - p2.y, p3.x - p2.x);
    // ctx = document.querySelector("canvas").getContext("2d");

// arc
ctx.arc(p2.x, p2.y, radius, startAngle, endAngle, false);
ctx.stroke(); */
//r = h/2 + c** / 8h




//Красивый фильтр круг
// for(let i = 0; i < 1; i+=0.0001) {drawArc(200,100, 200,200,i,1, "black")}

// undefined
//    for(let i = 0; i < 1; i+=0.01) {drawArc(200,100, 200,200,i,1, "white")}

// undefined



// ctx.beginPath();
// ctx.moveTo(50,20);
// ctx.bezierCurveTo(230, 30, 150, 60, 50, 100);
// ctx.stroke();
/* 
ctx.fillStyle = 'blue';
// начальная точка
ctx.fillRect(50, 20, 10, 10);
// конечная точка
ctx.fillRect(50, 100, 10, 10);

ctx.fillStyle = 'red';
// первая контрольная точка
ctx.fillRect(230, 30, 10, 10);
// вторая контрольная точка
ctx.fillRect(150, 70, 10, 10); */