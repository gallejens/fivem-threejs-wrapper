export type Vec2 = { x: number; y: number };
export type Vec3 = Vec2 & { z: number };
export type Vec4 = Vec3 & { w: number };

export type ObjEntries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ObjKeys<T> = (keyof T)[];

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
