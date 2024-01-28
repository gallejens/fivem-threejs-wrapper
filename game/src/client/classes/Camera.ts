import { nuiComms } from './NuiComms';

class Camera {
  private updateThread: NodeJS.Timer | null;

  constructor() {
    this.updateThread = null;
  }

  public init() {
    nuiComms.send('init', {
      camera: {
        fov: GetFinalRenderedCamFov(),
        near: GetFinalRenderedCamNearClip(),
        far: GetFinalRenderedCamFarClip(),
      },
    });
  }

  public startUpdateThread() {
    if (this.updateThread) return;

    this.updateThread = setInterval(() => {
      const [posX, posY, posZ] = GetGameplayCamCoord();
      const [rotX, rotY, rotZ] = GetGameplayCamRot(1);
      nuiComms.send('update', {
        camera: {
          position: { x: posX, y: posY, z: posZ },
          rotation: { x: rotX, y: rotY, z: rotZ },
        },
      });
    }, 1);
  }
}

export const camera = new Camera();
