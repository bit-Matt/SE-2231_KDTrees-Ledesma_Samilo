import p5 from "p5";
import Point2D from "./doNotTouch/point2D";

const width: number = 400;
const height: number = 400;
const padding: number = 25;

let sketch = function (p) {
  

  p.setup = function () {
    p.createCanvas(width, height);

    p.strokeWeight(2);
    p.stroke("gray");

    p.rect(padding, padding, width - padding - 5, height - padding - 5);

    p.strokeWeight(4 / height);
    p.translate(padding, height - padding + 20)
    p.scale(height - padding - 5, -(height - padding - 5));


    p.stroke("black");
    // Make your points here:
    const point1 = new Point2D(0.3, 0.4);
    const point2 = new Point2D(0.5, 0.7);

    // Draw them here:
    point1.draw(p);
    point2.draw(p);
  };
};

new p5(sketch);
