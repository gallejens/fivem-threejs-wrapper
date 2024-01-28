import { Vec3 } from '@shared/types/util';
import { Vector3 } from 'three';

export const transformCoords = (gtaCoords: Vec3) => {
  const { x, y, z } = gtaCoords;
  return new Vector3(x, z, y * -1);
};
