class Point2D {
    x: number;
    y: number;

    public constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public distanceTo(that: Point2D): number {
        return this.distanceSquaredTo(that) ** 0.5
    }

    public distanceSquaredTo(that: Point2D): number {
        return (that.y - this.y) ** 2 + (that.x - this.x) ** 2
    }

    public compareTo(that: Point2D): number {
        if (this.equals(that)) {
            return 0;
        }

        if (this.y < that.y) {
            return -1;
        }

        if (this.y > that.y) {
            return 1;
        }

        if (this.x < that.x) {
            return -1;
        }

        return 1;
    }

    public equals(that: Point2D): boolean {
        return this.x === that.x && this.y === that.y;
    }

    public draw(p): void {
        p.point(this.x, this.y);
    }

    public toString = (): string => {
        return `(${this.x}, ${this.y})`;
    }
}

export default Point2D;