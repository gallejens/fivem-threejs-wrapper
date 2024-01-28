import { FC } from "react";
import { Vector3 } from "three";

export const Sphere: FC<{ position: Vector3 }> = props => {
  return (
    <mesh position={props.position}>
      <sphereGeometry />
      <meshBasicMaterial color='green' />
    </mesh>
  );
};
