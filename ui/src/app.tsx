import { NUIComms } from "@shared/types/nui-comms";
import { FC, useEffect, useState } from "react";
import { nuiComms } from "./lib/NuiComms";

import { useThree } from "@react-three/fiber";
import { Euler, MathUtils } from "three";
import { ROTATION_ORDER } from "./constants";
import { transformCoords } from "./lib/util";

export const App: FC = () => {
  const [isReady, setIsReady] = useState(false);
  const { camera } = useThree(s => ({ camera: s.camera }));

  if (!("isPerspectiveCamera" in camera)) {
    console.error("Main camera is not perspective camera");
    return null;
  }

  useEffect(() => {
    const handler = ({ data: event }: MessageEvent<NUIComms.EventBody>) => {
      switch (event.action) {
        case "init": {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.near = event.data.camera.near;
          camera.far = event.data.camera.far;
          camera.fov = event.data.camera.fov;
          camera.rotation.order = ROTATION_ORDER;
          camera.updateProjectionMatrix();
          break;
        }
        case "update": {
          const camPos = transformCoords(event.data.camera.position);
          camera.position.set(camPos.x, camPos.y, camPos.z);
          const camRot = event.data.camera.rotation;
          camera.rotation.set(
            MathUtils.degToRad(camRot.x),
            MathUtils.degToRad(Math.abs(camRot.y) > 90 ? -camRot.z : camRot.z),
            MathUtils.degToRad(camRot.y)
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

  return (
    <>
      <mesh
        position={[-1741.69, 12.93467, 2928.028]}
        rotation={new Euler(0, 0, 0, ROTATION_ORDER)}
        scale={[0.1, 0.1, 0.1]}
      >
        <boxGeometry />
        <meshBasicMaterial color='green' />
      </mesh>
    </>
  );
};
