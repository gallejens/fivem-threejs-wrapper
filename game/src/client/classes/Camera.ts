import { NUIComms } from '@shared/types/nui-comms';
import { Vec3 } from '@shared/types/util';
import { Vector3 } from '../../shared/vector3';
import { nuiComms } from './NuiComms';

class Camera {
  private updateThread: NodeJS.Timer | null;

  constructor() {
    this.updateThread = null;
  }

  public init() {
    const camData = this.getCameraData();
    nuiComms.send('init', {
      camera: {
        ...camData,
      },
    });
  }

  public startUpdateThread() {
    if (this.updateThread) return;

    this.updateThread = setInterval(() => {
      const cameraCoords = this.getCameraCoords();
      const cameraRotation = this.getCameraRotation();
      nuiComms.send('update', {
        camera: {
          position: cameraCoords,
          rotation: cameraRotation,
        },
      });
    }, 1);
  }

  private getCameraCoords(): Vec3 {
    const [x, y, z] = GetFinalRenderedCamCoord();
    return { x, y, z };
  }

  // TODO: Currently uses lookAt dir, change to just rotation
  private getCameraRotation(): Vec3 {
    const rotDeg = Vector3.create(GetFinalRenderedCamRot(2));
    const rotRad = rotDeg.multiply(Math.PI / 180);
    return {
      x: -1 * Math.sin(rotRad.z) * Math.cos(rotRad.x),
      y: Math.cos(rotRad.z) * Math.cos(rotRad.x),
      z: Math.sin(rotRad.x),
    };
  }

  private getCameraData(): NUIComms.Event['init']['camera'] {
    return {
      fov: GetFinalRenderedCamFov(),
      near: GetFinalRenderedCamNearClip(),
      far: GetFinalRenderedCamFarClip(),
    };
  }
}

export const camera = new Camera();
