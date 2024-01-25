import { Vector2 } from '../shared/vector2';
import { nuiComms } from './classes/NuiComms';
import { getClosestNPC, getEntityCoords } from './util';

setImmediate(() => {
  nuiComms.init();
});

let thread: NodeJS.Timer | null = null;
RegisterCommand(
  'npc',
  () => {
    if (thread) {
      clearInterval(thread);
      thread = null;
      return;
    }

    const ped = getClosestNPC(200);
    if (!ped) throw new Error('No ped found');

    FreezeEntityPosition(ped, true);
    SetEntityInvincible(ped, true);
    ClearPedTasksImmediately(ped);

    // to own ped to target
    const pedCoords = getEntityCoords(ped);
    SetEntityCoords(
      PlayerPedId(),
      pedCoords.x,
      pedCoords.y + 2,
      pedCoords.z,
      false,
      false,
      false,
      false
    );

    thread = setInterval(() => {
      const [isVisible, ...posArr] = GetScreenCoordFromWorldCoord(
        pedCoords.x,
        pedCoords.y,
        pedCoords.z
      );

      if (!isVisible) return;

      const vec = Vector2.create(posArr);
      nuiComms.send('pos', vec);
    }, 4);
  },
  false
);
