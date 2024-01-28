import { Vec3 } from '@shared/types/util';
import { Vector3 } from '../shared/vector3';

export const getClosestNPC = (maxDistance = 2) => {
  const ownPed = PlayerPedId();
  const ownCoords = Vector3.create(getEntityCoords(ownPed));
  const peds: number[] = GetGamePool('CPed');

  let distance = maxDistance;
  let closestPed: number | null = null;

  for (const ped of peds) {
    if (ped === ownPed || IsPedAPlayer(ped)) continue;

    const pedCoords = getEntityCoords(ped);
    const pedDistance = ownCoords.distance(pedCoords);
    if (pedDistance > distance) continue;

    distance = pedDistance;
    closestPed = ped;
  }

  return closestPed;
};

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
