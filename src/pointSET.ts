import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
  private points: Set<Point2D>;

  public constructor() {
    this.points = new Set();
  }

  public isEmpty(): boolean {
    return this.points.size === 0;
  }

  public size(): number {
    return this.points.size;
  }

  public insert(p: Point2D): void {
    if (p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1) {
      this.points.add(p);
    }
  }

  public contains(p: Point2D): boolean {
    for (let point of this.points) {
      if (point.equals(p)) {
        return true;
      }
    }
    return false;
  }

  public draw(p): void {
    p.stroke(0);
    p.strokeWeight(0.01);
    this.points.forEach((point) => {
      point.draw(p);
    });
  }

  public range(rect: RectHV): Point2D[] {
    let inRange: Point2D[] = [];
    for (let point of this.points) {
      if (rect.contains(point)) {
        inRange.push(point);
      }
    }
    return inRange;
  }
}

export default PointSET;
