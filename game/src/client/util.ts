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
