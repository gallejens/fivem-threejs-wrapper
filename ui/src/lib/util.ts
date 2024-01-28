import { Vec3 } from '@shared/types/util';

export const transformCoords = (gtaCoords: Vec3) => {
  const { x, y, z } = gtaCoords;
  return {
    x,
    y: z,
    z: y * -1,
  };
};

export const transformRotation = (gtaRotation: Vec3) => {
  return {
    x: gtaRotation.x,
    y: Math.abs(gtaRotation.y) > Math.PI / 4 ? -gtaRotation.z : gtaRotation.z,
    z: gtaRotation.y,
  };
};
