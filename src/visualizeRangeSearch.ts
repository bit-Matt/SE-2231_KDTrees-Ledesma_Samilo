import p5 from "p5";
import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";
import PointSET from "./pointSET";
import KDTree from "./kdTree";

// load the points in a file
// i'll hardcode those myself

const brute = new PointSET();
const kdTree = new KDTree();

let x0 = 0.0,
  y0 = 0.0;
let x1 = 0.0,
  y1 = 0.0;
let dragging = false;

const width: number = 400;
const height: number = 400;
const padding: number = 25;

let sketch = function (p: p5) {
  p.setup = function () {
    p.createCanvas(width, height);
    p.createFileInput(handleFile);
  };

  //file read system

  function handleFile(file: p5.File) {
    if (file.type === "text") {
      const lines = file.data.split("\n");
      for (let line of lines) {
        const [x, y] = line.split(" ").map(Number);
        if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
          const point = new Point2D(x, y);
          brute.insert(point);
          kdTree.insert(point);
        } else {
          console.error(`Point (${x}, ${y}) is out of bounds`);
        }
      }
    }
  }

  p.mousePressed = function () {
    if (!dragging) {
      x0 = (p.mouseX - padding) / (width - padding - 5);
      y0 = (p.mouseY - padding) / (height - padding - 5);
    }
    x1 = x0;
    y1 = y0;
    dragging = true;
  };

  p.mouseDragged = function () {
    x1 = (p.mouseX - padding) / (width - padding - 5);
    y1 = (p.mouseY - padding) / (height - padding - 5);
  };

  p.mouseReleased = function () {
    dragging = false;
  };

  p.draw = function () {
    p.clear();
    p.strokeWeight(2);
    p.stroke("gray");
    p.rect(padding, padding, width - padding - 5, height - padding - 5);

    p.strokeWeight(4 / height);
    p.translate(padding, padding);
    p.scale(width - padding - 5, height - padding - 5);

    p.stroke("black");
    brute.draw(p);

    //how are the colors the hardest part

    const rect = new RectHV(
      Math.min(x0, x1),
      Math.min(y0, y1),
      Math.max(x0, x1),
      Math.max(y0, y1)
    );
    p.strokeWeight(2 / width);
    p.stroke("blue");
    rect.draw(p);

    p.fill("green");
    p.noStroke();
    for (let point of kdTree.range(rect)) {
      p.ellipse(point.x, point.y, 0.01, 0.01);
    }

    p.noFill();
    p.stroke("red");
    p.strokeWeight(0.003);
    for (let point of brute.range(rect)) {
      p.ellipse(point.x, point.y, 0.015, 0.015);
    }
  };
};

new p5(sketch);
