import { NUIComms } from '@shared/types/nui-comms';
import { ObjEntries } from '@shared/types/util';
import { degToRad } from '../util';
import { nuiComms } from './NuiComms';

class Camera {
  private metadata: Required<NUIComms.Event['update']['camera']>['meta'];
  private thread: NodeJS.Timer | null;

  constructor() {
    this.metadata = {
      fov: 0,
      near: 0,
      far: 0,
    };
    this.thread = null;
  }

  public startThread() {
    if (this.thread) return;

    this.thread = setInterval(this.onFrame, 4);
  }

  private onFrame = () => {
    const newMetadata: typeof this.metadata = {
      fov: GetFinalRenderedCamFov(),
      near: GetFinalRenderedCamNearClip(),
      far: GetFinalRenderedCamFarClip(),
    };

    const metaChanged = (
      Object.entries(newMetadata) as ObjEntries<typeof newMetadata>
    ).some(([k, v]) => this.metadata[k] !== v);

    nuiComms.send('update', {
      camera: {
        position: this.getCameraPosition(),
        rotation: this.getCameraRotation(),
        meta: metaChanged ? newMetadata : undefined,
      },
    });

    this.metadata = newMetadata;
  };

  private getCameraPosition() {
    const [x, y, z] = GetFinalRenderedCamCoord();
    return { x, y, z };
  }

  private getCameraRotation() {
    const [x, y, z] = GetFinalRenderedCamRot(1);
    return degToRad({ x, y, z });
  }
}

export const camera = new Camera();
