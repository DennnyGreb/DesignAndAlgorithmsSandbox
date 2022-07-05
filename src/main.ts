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

  public distance(x?: number, y?: number): number;
  public distance(x?: number, y?: number, other?: Point): number {
      if (other) {
          return this.calculateDistance(this.x, this.y, other.x, other.y);
      }
      let xValue = x || 0;
      let yValue = y || 0;
      return this.calculateDistance(this.x, this.y, xValue, yValue);
  }
}
