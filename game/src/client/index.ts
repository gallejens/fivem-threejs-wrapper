import { camera } from './classes/Camera';
import { nuiComms } from './classes/NuiComms';
import { Raycast } from './classes/Raycast';
import { getEntityCoords } from './util';

setImmediate(async () => {
  await nuiComms.init();

  camera.startThread();
});

RegisterCommand(
  'raycast',
  async () => {
    const raycast = await new Promise<Raycast>(res => {
      const thread = setInterval(() => {
        const raycast = new Raycast();
        if (!raycast.hit || !raycast.coords || !raycast.surfaceNormal) return;

        const plyCoords = getEntityCoords(PlayerPedId());
        DrawLine(
          plyCoords.x,
          plyCoords.y,
          plyCoords.z,
          raycast.coords.x,
          raycast.coords.y,
          raycast.coords.z,
          0,
          0,
          255,
          255
        );
        DrawMarker(
          28,
          raycast.coords.x,
          raycast.coords.y,
          raycast.coords.z,
          0,
          0,
          0,
          0,
          0,
          0,
          0.05,
          0.05,
          0.05,
          0,
          0,
          255,
          255,
          false,
          true,
          2,
          false,
          //@ts-ignore
          null,
          null,
          false
        );
        if (IsControlJustPressed(0, 18)) {
          clearInterval(thread);
          res(raycast);
          return;
        }
      }, 0);
    });

    if (!raycast.hit || !raycast.coords || !raycast.surfaceNormal) return;

    const surfaceRotation = raycast.getSurfaceRotation();

    console.log(
      'Do not forget to transform these coords to threejs coordsystem'
    );
    console.log({ coords: raycast.coords, rotation: surfaceRotation });
  },
  false
);
