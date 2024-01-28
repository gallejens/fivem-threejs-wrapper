import { camera } from './classes/Camera';
import { nuiComms } from './classes/NuiComms';
import { Raycast } from './classes/Raycast';

setImmediate(async () => {
  await nuiComms.init();

  camera.init();
  camera.startUpdateThread();
});

RegisterCommand(
  'raycast',
  () => {
    const raycast = new Raycast();
    if (!raycast.hit) return;

    console.log(raycast.coords, raycast.surfaceNormal);
  },
  false
);
