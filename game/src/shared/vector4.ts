import { Vec3, Vec4 } from '@shared/types/util';

export class Vector4 implements Vec4 {
  public static create(v1: number | Vec4): Vector4 {
    if (typeof v1 === 'number') {
      return new Vector4(v1, v1, v1, v1);
    }
    return new Vector4(v1.x, v1.y, v1.z, v1.w);
  }

  public static createFromVec3(v1: Vec3, w: number): Vector4 {
    return new Vector4(v1.x, v1.y, v1.z, w);
  }

  public static clone(v1: Vec4): Vector4 {
    return Vector4.create(v1);
  }

  public static add(v1: Vec4, v2: number | Vec4): Vector4 {
    if (typeof v2 === 'number') {
      return new Vector4(v1.x + v2, v1.y + v2, v1.z + v2, v1.w + v2);
    }
    return new Vector4(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z, v1.w + v2.w);
  }

  public static subtract(v1: Vec4, v2: Vec4 | Vec3): Vector4 {
    return new Vector4(
      v1.x - v2.x,
      v1.y - v2.y,
      v1.z - v2.z,
      'w' in v2 ? v1.w - v2.w : 0
    );
  }

  public static multiply(v1: Vec4, v2: Vec4 | number): Vector4 {
    if (typeof v2 === 'number') {
      return new Vector4(v1.x * v2, v1.y * v2, v1.z * v2, v1.w * v2);
    }
    return new Vector4(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z, v1.w * v2.w);
  }

  public static divide(v1: Vec4, v2: Vec4 | number): Vector4 {
    if (typeof v2 === 'number') {
      return new Vector4(v1.x / v2, v1.y / v2, v1.z / v2, v1.w / v2);
    }
    return new Vector4(v1.x / v2.x, v1.y / v2.y, v1.z / v2.z, v1.w / v2.w);
  }

  public static dotProduct(v1: Vec4, v2: Vec4): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z + v1.w * v2.w;
  }

  public static normalize(v: Vector4): Vector4 {
    return Vector4.divide(v, v.Length);
  }

  public static isSame(v1: Vec4, v2: Vec4): boolean {
    return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z && v1.w === v2.w;
  }

  constructor(
    public x: number,
    public y: number,
    public z: number,
    public w: number
  ) {
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
    this.w = w ?? 0;
  }

  public clone(): Vector4 {
    return new Vector4(this.x, this.y, this.z, this.w);
  }

  /**
   * The product of the Euclidean magnitudes of this and another Vector4.
   *
   * @param v Vector4 to find Euclidean magnitude between.
   * @returns Euclidean magnitude with another vector.
   */
  public distanceSquared(v: Vec4 | Vec3): number {
    const w: Vector4 = this.subtract(v);
    return Vector4.dotProduct(w, w);
  }

  /**
   * The distance between two Vectors.
   *
   * @param v Vector4 to find distance between.
   * @returns Distance between this and another vector.
   */
  public distance(v: Vec4 | Vec3): number {
    return Math.sqrt(this.distanceSquared(v));
  }

  public get normalize(): Vector4 {
    return Vector4.normalize(this);
  }

  public dotProduct(v: Vec4): number {
    return Vector4.dotProduct(this, v);
  }

  public add(v: number | Vec4): Vec4 {
    return Vector4.add(this, v);
  }

  public subtract(v: Vec4 | Vec3): Vector4 {
    return Vector4.subtract(this, v);
  }

  public multiply(v: number | Vec4): Vector4 {
    return Vector4.multiply(this, v);
  }

  public divide(v: number | Vec4): Vec4 {
    return Vector4.divide(this, v);
  }

  public replace(v: Vec4): void {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    this.w = v.w;
  }

  public get Length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
}
