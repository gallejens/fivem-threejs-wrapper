import { NUIComms } from "@shared/types/nui-comms";
import { useRenderCount } from "@uidotdev/usehooks";
import { FC, useEffect, useState } from "react";
import { nuiComms } from "./lib/NuiComms";

import { useThree } from "@react-three/fiber";
import { PerspectiveCamera, Vector3 } from "three";
import { transformCoords } from "./lib/util";

export const App: FC = () => {
  const [isReady, setIsReady] = useState(false);
  const renderCount = useRenderCount();
  const { camera } = useThree(s => ({ camera: s.camera as PerspectiveCamera }));

  useEffect(() => {
    const handler = ({ data: event }: MessageEvent<NUIComms.EventBody>) => {
      switch (event.action) {
        case "init": {
          camera.near = event.data.camera.near;
          camera.far = event.data.camera.far;
          camera.fov = event.data.camera.fov;
          camera.rotation.order = "YZX";
          camera.updateProjectionMatrix();
          break;
        }
        case "update": {
          const cameraPosition = transformCoords(event.data.camera.position);
          camera.position.set(
            cameraPosition.x,
            cameraPosition.y,
            cameraPosition.z
          );
          camera.lookAt(
            cameraPosition.add(transformCoords(event.data.camera.rotation))
          );
        }
      }
    };

    window.addEventListener("message", handler);
    setIsReady(true);

    return () => {
      window.removeEventListener("message", handler);
    };
  }, [camera]);

  // send ready event on first ready
  useEffect(() => {
    if (!isReady) return;

    nuiComms.request("ready");
  }, [isReady]);

  useEffect(() => {
    console.log(`Rendercount: ${renderCount}`);
  }, [renderCount]);

  return (
    <mesh position={[-1656.0, 13.4, 3148.0]}>
      <boxGeometry />
      <meshBasicMaterial color='green' />
    </mesh>
  );
};
