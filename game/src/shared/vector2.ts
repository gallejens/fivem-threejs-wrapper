import { Vec2 } from '@shared/types/util';

export class Vector2 implements Vec2 {
  public static create(v1: number | Vec2 | number[]): Vector2 {
    if (typeof v1 === 'number') {
      return new Vector2(v1, v1);
    }
    if (Array.isArray(v1)) {
      return new Vector2(v1[0], v1[1]);
    }
    return new Vector2(v1.x, v1.y);
  }

  public static clone(v1: Vec2): Vector2 {
    return Vector2.create(v1);
  }

  public static add(v1: Vec2, v2: number | Vec2): Vector2 {
    if (typeof v2 === 'number') {
      return new Vector2(v1.x + v2, v1.y + v2);
    }
    return new Vector2(v1.x + v2.x, v1.y + v2.y);
  }

  public static subtract(v1: Vec2, v2: Vec2): Vector2 {
    return new Vector2(v1.x - v2.x, v1.y - v2.y);
  }

  public static multiply(v1: Vec2, v2: Vec2 | number): Vector2 {
    if (typeof v2 === 'number') {
      return new Vector2(v1.x * v2, v1.y * v2);
    }
    return new Vector2(v1.x * v2.x, v1.y * v2.y);
  }

  public static divide(v1: Vec2, v2: Vec2 | number): Vector2 {
    if (typeof v2 === 'number') {
      return new Vector2(v1.x / v2, v1.y / v2);
    }
    return new Vector2(v1.x / v2.x, v1.y / v2.y);
  }

  public static dotProduct(v1: Vec2, v2: Vec2): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  public static normalize(v: Vector2): Vector2 {
    return Vector2.divide(v, v.Length);
  }

  public static isSame(v1: Vec2, v2: Vec2): boolean {
    return v1.x === v2.x && v1.y === v2.y;
  }

  constructor(public x: number, public y: number) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  /**
   * The product of the Euclidean magnitudes of this and another Vector2.
   *
   * @param v Vector2 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  public distanceSquared(v: Vec2): number {
    const w: Vector2 = this.subtract(v);
    return Vector2.dotProduct(w, w);
  }

  /**
   * The distance between two Vectors.
   *
   * @param v Vector2 to find distance between.
   * @returns Distance between this and another vector.
   */
  public distance(v: Vec2): number {
    return Math.sqrt(this.distanceSquared(v));
  }

  public get normalize(): Vector2 {
    return Vector2.normalize(this);
  }

  public dotProduct(v: Vec2): number {
    return Vector2.dotProduct(this, v);
  }

  public add(v: number | Vec2): Vec2 {
    return Vector2.add(this, v);
  }

  public subtract(v: Vec2): Vector2 {
    return Vector2.subtract(this, v);
  }

  public multiply(v: number | Vec2): Vector2 {
    return Vector2.multiply(this, v);
  }

  public divide(v: number | Vec2): Vec2 {
    return Vector2.divide(this, v);
  }

  public replace(v: Vec2): void {
    this.x = v.x;
    this.y = v.y;
  }

  public get Length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}
