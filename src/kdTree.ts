import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";
interface KDNode {
  point: Point2D;
  rect: RectHV;
  left: KDNode | null;
  right: KDNode | null;
}

class KDTree {
  private root: KDNode | null = null;
  private count: number = 0;

  public constructor() {}

  public isEmpty(): boolean {
    return this.root === null;
  }

  public size(): number {
    return this.count;
  }

  public insert(p: Point2D): void {
    this.root = this.insertNode(this.root, p, true, 0, 0, 1, 1);
  }

  private insertNode(
    node: KDNode | null,
    p: Point2D,
    isX: boolean,
    xmin: number,
    ymin: number,
    xmax: number,
    ymax: number
  ): KDNode {
    if (node === null) {
      this.count++;
      return {
        point: p,
        rect: new RectHV(xmin, ymin, xmax, ymax),
        left: null,
        right: null,
      };
    }

    if (isX) {
      if (p.x < node.point.x) {
        node.left = this.insertNode(
          node.left,
          p,
          !isX,
          xmin,
          ymin,
          node.point.x,
          ymax
        );
      } else {
        node.right = this.insertNode(
          node.right,
          p,
          !isX,
          node.point.x,
          ymin,
          xmax,
          ymax
        );
      }
    } else {
      if (p.y < node.point.y) {
        node.left = this.insertNode(
          node.left,
          p,
          !isX,
          xmin,
          ymin,
          xmax,
          node.point.y
        );
      } else {
        node.right = this.insertNode(
          node.right,
          p,
          !isX,
          xmin,
          node.point.y,
          xmax,
          ymax
        );
      }
    }

    return node;
  }

  public contains(p: Point2D): boolean {
    return this.search(this.root, p, true) !== null;
  }

  private search(node: KDNode | null, p: Point2D, isX: boolean): KDNode | null {
    if (node === null) return null;

    if (node.point.equals(p)) return node;

    if (isX) {
      return this.search(p.x < node.point.x ? node.left : node.right, p, !isX);
    } else {
      return this.search(p.y < node.point.y ? node.left : node.right, p, !isX);
    }
  }

  public range(rect: RectHV): Point2D[] {
    const results: Point2D[] = [];
    this.rangeSearch(this.root, rect, results);
    return results;
  }

  private rangeSearch(
    node: KDNode | null,
    rect: RectHV,
    results: Point2D[]
  ): void {
    if (node === null || !rect.intersects(node.rect)) return;

    if (rect.contains(node.point)) results.push(node.point);

    this.rangeSearch(node.left, rect, results);
    this.rangeSearch(node.right, rect, results);
  }
}

export default KDTree;
