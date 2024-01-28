import { NUIComms } from "@shared/types/nui-comms";
import { FC, useEffect, useState } from "react";
import { nuiComms } from "./lib/NuiComms";

import { useThree } from "@react-three/fiber";
import { DoubleSide, Euler } from "three";
import { ROTATION_ORDER } from "./constants";
import { transformCoords, transformRotation } from "./lib/util";

export const App: FC = () => {
  const [isReady, setIsReady] = useState(false);
  const { camera } = useThree(s => ({
    camera: s.camera,
    scene: s.scene,
  }));

  if (!("isPerspectiveCamera" in camera)) {
    console.error("Main camera is not perspective camera");
    return null;
  }

  useEffect(() => {
    const handler = ({ data: event }: MessageEvent<NUIComms.EventBody>) => {
      switch (event.action) {
        case "update": {
          if (event.data.camera.meta) {
            camera.near = event.data.camera.meta.near;
            camera.far = event.data.camera.meta.far;
            camera.fov = event.data.camera.meta.fov;
            camera.rotation.order = ROTATION_ORDER;
            camera.updateProjectionMatrix();
          }

          const camPos = transformCoords(event.data.camera.position);
          camera.position.set(camPos.x, camPos.y, camPos.z);

          const camRot = transformRotation(event.data.camera.rotation);
          camera.rotation.set(camRot.x, camRot.y, camRot.z);
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
        position={[-117.36372375488281, 31.976551055908203, -6357.12255859375]}
        rotation={
          new Euler(
            0.0010449246678478808,
            2.3554334428580637,
            0,
            ROTATION_ORDER
          )
        }
        scale={[2, 2, 2]}
      >
        <planeGeometry />
        <meshBasicMaterial color='green' side={DoubleSide} />
      </mesh>
      <mesh
        position={[-133.39816284179688, 31.443492889404297, -6331.47509765625]}
        rotation={
          new Euler(
            -0.00001827436309791915,
            2.358800016765025,
            0,
            ROTATION_ORDER
          )
        }
        scale={[0.05, 0.05, 0.05]}
      >
        <sphereGeometry />
        <meshBasicMaterial color='blue' />
      </mesh>
    </>
  );
};
