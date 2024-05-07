import p5 from "p5";
import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";
import PointSET from "./pointSET";
import KDTree from "./kdTree";

// load the points in a file
// i'll hardcode those myself

const brute = new PointSET();
const kdTree = new KDTree();

const points = [
    new Point2D(0.372, 0.497),
    new Point2D(0.564, 0.413),
    new Point2D(0.226, 0.577),
    new Point2D(0.144, 0.179),
    new Point2D(0.083, 0.510),
    new Point2D(0.320, 0.708),
    new Point2D(0.417, 0.362),
    new Point2D(0.862, 0.825),
    new Point2D(0.785, 0.725),
    new Point2D(0.499, 0.208)
];

for (let point of points) {
    brute.insert(point);
    kdTree.insert(point);
}

let x0 = 0.0, y0 = 0.0;      // initial endpoint of rectangle
let x1 = 0.0, y1 = 0.0;      // current location of mouse
let dragging = false;

const width: number = 400;
const height: number = 400;
const padding: number = 25;

let sketch = function (p) {
  p.setup = function () {
    p.createCanvas(width, height);
  };

  p.mousePressed = function() {
    if (!dragging) {
        x0 = (p.mouseX - padding) / (height - padding - 5);
        y0 = (p.mouseY - height + padding - 20) / (-height + padding + 5);
    }
    x1 = (p.mouseX - padding) / (height - padding - 5);
    y1 = (p.mouseY - height + padding - 20) / (-height + padding + 5);
  }

  p.mouseDragged = function() {
    if (!dragging) {
        dragging = true;
    }
    x1 = (p.mouseX - padding) / (height - padding - 5);
    y1 = (p.mouseY - height + padding - 20) / (-height + padding + 5);
  }

  p.mouseReleased = function() {
    dragging = false;
  }

  p.draw = function () {
    console.log(x0,x1,y0,y1);
    p.clear();

    p.translate(0, 0)
    p.scale(1, 1);
    p.strokeWeight(2);
    p.stroke("gray");

    p.rect(padding, padding, width - padding - 5, height - padding - 5);

    p.strokeWeight(4 / height);
    p.translate(padding, height - padding + 20)
    p.scale(height - padding - 5, -(height - padding - 5));

    p.stroke("black");
    brute.draw(p);

    // // draw the rectangle
    const rect = new RectHV(Math.min(x0, x1), Math.min(y0, y1), Math.max(x0, x1), Math.max(y0, y1));
    p.strokeWeight(4 / height / 5);
    rect.draw(p);

    // draw the range search results for brute-force data structure in red
    // p.stroke("red");
    // p.strokeWeight(12 / height);
    // for (let point of brute.range(rect)) {
    //     point.draw(p);
    // }

    // draw the range search results for kd-tree in green
    p.strokeWeight(8 / height);
    p.stroke("green");
    for (let point of kdTree.range(rect)) {
        point.draw(p);
    }

    // StdDraw.pause(20);
  }
};

new p5(sketch);