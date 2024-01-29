import { Vec3 } from '@shared/types/util';

export const getEntityCoords = (entity: number): Vec3 => {
  const [x, y, z] = GetEntityCoords(entity, true);
  return { x, y, z };
};

export function radToDeg(rad: number): number;
export function radToDeg(rad: Vec3): Vec3;
export function radToDeg(rad: number | Vec3): number | Vec3 {
  if (typeof rad === 'number') {
    return (rad * 180) / Math.PI;
  }

  return {
    x: (rad.x * 180) / Math.PI,
    y: (rad.y * 180) / Math.PI,
    z: (rad.z * 180) / Math.PI,
  };
}

export function degToRad(deg: number): number;
export function degToRad(deg: Vec3): Vec3;
export function degToRad(deg: number | Vec3): number | Vec3 {
  if (typeof deg === 'number') {
    return (deg * Math.PI) / 180;
  }

  return {
    x: (deg.x * Math.PI) / 180,
    y: (deg.y * Math.PI) / 180,
    z: (deg.z * Math.PI) / 180,
  };
}
