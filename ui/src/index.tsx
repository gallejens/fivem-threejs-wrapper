import { Html } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { NUIComms } from "@shared/types/nui-comms";
import { FC, useEffect, useState } from "react";
import { Euler } from "three";
import { UI } from "./components/ui";
import { ROTATION_ORDER } from "./constants";
import { nuiComms } from "./lib/NuiComms";
import { transformCoords, transformRotation } from "./lib/util";

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
        position={[450.0543518066406, 30.75804328918457, 986.4019775390625]}
        rotation={new Euler(0, 1.570796314870016 - Math.PI, 0, ROTATION_ORDER)}
      >
        <Html transform occlude scale={0.05}>
          <UI />
        </Html>
      </mesh>
    </>
  );
};
