class Point {
  x: number;
  y: number;

  constructor(x?: number, y?: number) {
      this.x = x || 0;
      this.y = y || 0;
  }

  public toString(): string {
      return `(${this.x}, ${this.y})`;
  }

  private calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
      const x = x1 - x2;
      const y = y1 - y2;
      const squaredSum = (x * x) + (y * y);
      return Math.sqrt(squaredSum);
  }

  public distance(): number;
  public distance(x?: number, y?: number): number;
  public distance(point: Point): number;
  public distance(xOrPoint?: number | Point, y?: number): number {
      let xValue = 0;
      let yValue = 0;
      if (xOrPoint instanceof Point) {
          return this.calculateDistance(this.x, this.y, xOrPoint.x, xOrPoint.y);
      }
      xValue = typeof xOrPoint === 'number' ? xOrPoint : 0;
      yValue = y || 0;
      return this.calculateDistance(this.x, this.y, xValue, yValue);
  }
}

type ArrayThreeOrMore<Type> = {
  0: Type
  1: Type
  2: Type
} & Array<Type>;

abstract class Shape {
  protected color: string;
  protected filled: boolean;
  protected points: ArrayThreeOrMore<Point>;

  constructor(points: ArrayThreeOrMore<Point>);
  constructor(points: ArrayThreeOrMore<Point>, filled?: boolean, color?: string);
  constructor(points: ArrayThreeOrMore<Point>, filled?: boolean, color?: string) {
    this.points = points;
    this.filled = !!filled;
    this.color = color || 'green';
  }

  public toString(): string {
    return `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'Not filled'}. 
    Points: ${this.points.map(point => (`(${point.x}, ${point.y})`))}.`
  }

  protected getSides(): number[] {
    let sides = [];
    this.points.forEach((point, index) => {
      if (index === (this.points.length - 1)) {
        sides.push(point.distance(this.points[0]));
      } else {
        sides.push(point.distance(this.points[index + 1]));
      }
    })
    return sides;
  }

  public getPerimeter(): number {
    const sides = this.getSides();
    return sides.reduce((previousValue, currentValue) => previousValue + currentValue);
  }

  abstract getType(): void;
}

class Triangle extends Shape {
  constructor(points: ArrayThreeOrMore<Point>);
  constructor(points: ArrayThreeOrMore<Point>, filled?: boolean, color?: string);
  constructor(points: ArrayThreeOrMore<Point>, filled?: boolean, color?: string) {
    super(points, filled, color);
  }

  public toString(): string {
    return `Triangle[${this.points.map((point, index) => `v${index + 1}=(${point.x}, ${point.y})`)}]`;
  }

  public getType(): string {
    const [side1, side2, side3] = this.getSides();
    if (side1 === side2 && side2 === side3) {
      return 'equilateral triangle';
    } else if (side1 === side2 || side2 === side3 || side3 === side1) {
      return 'isosceles triangle'; 
    }
    return 'scalene triangle';
  }
}

const p1 = new Point(1, 1);
const p2 = new Point(3, 5);
const p3 = new Point(5, 1);
const triangle = new Triangle([p1, p2, p3], true, '#000');
console.log(triangle.toString());
console.log(triangle.getType());
