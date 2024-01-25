import { useThree } from "@react-three/fiber";
import { FC } from "react";

export const CanvasContent: FC = () => {
  const { camera } = useThree(s => ({ camera: s.camera }));

  const handleClick = () => {
    camera.rotation.z += 0.1;
    camera.rotation.x += 0.1;
  };

  return (
    <>
      <mesh onClick={handleClick} scale={10}>
        <planeGeometry />
        <meshBasicMaterial color='black' />
      </mesh>
      <mesh onClick={handleClick}>
        <sphereGeometry />
        <meshBasicMaterial color='pink' />
      </mesh>
    </>
  );
};
