import Point2D from "./doNotTouch/point2D";
import RectHV from "./doNotTouch/rectHV";

class PointSET {
    public constructor() {} // construct an empty set of points
    public isEmpty(): boolean {} // is the set empty?
    public size(): number {} // number of points in the set
    public insert(p: Point2D): void {} // add the point to the set (if it is not already in the set)
    public contains(p: Point2D): boolean {} // does the set contain point p?
    public draw(p): void {} // draw all points to p5
    public range(rect: RectHV): Point2D[] {} // all points that are inside the rectangle (or on the boundary)
}

export default PointSET;