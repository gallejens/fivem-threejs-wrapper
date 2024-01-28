import { camera } from './classes/Camera';
import { nuiComms } from './classes/NuiComms';

setImmediate(async () => {
  await nuiComms.init();

  camera.init();
  camera.startUpdateThread();
});
