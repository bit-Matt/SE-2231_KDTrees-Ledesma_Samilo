import Point2D from "./point2D";

class RectHV {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;

    public constructor(xmin: number, ymin: number, xmax: number, ymax: number) {
        if (xmin > xmax || ymin > ymax) {
            throw new Error("Illegal argument!");
        }

        this.xmin = xmin;
        this.xmax = xmax;
        this.ymin = ymin;
        this.ymax = ymax;
    }

    public contains(p: Point2D): boolean {
        return p.x >= this.xmin && p.x <= this.xmax && p.y >= this.ymin && p.y <= this.ymax;
    }

    public intersects(that: RectHV): boolean {
        // Check for intersection in x-axis
        if (this.xmax < that.xmin || that.xmax < this.xmin) {
            return false;
        }

        // Check for intersection in y-axis
        if (this.ymax < that.ymin || that.ymax < this.ymin) {
            return false;
        }
        // If both conditions are met, rectangles intersect
        return true;
    }

    public equals(that: RectHV): boolean {
        return this.xmax === that.xmax && this.ymax === that.ymax && this.xmin === that.xmin && this.ymin === that.ymin
    }

    public draw(p): void {
        p.rect(this.xmin, this.ymin, this.xmax - this.xmin, this.ymax - this.ymin);
    }

    public toString = (): string => {
        return `[${this.xmin}, ${this.xmax}] x [${this.ymin}, ${this.ymax}]`;
    }
}

export default RectHV;