import { useEffect } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { RigidBody } from "@react-three/rapier";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
const Floor = () => {
  const texture = useLoader(TextureLoader, "./concrete.jpg");
  texture.repeat.x = 19;
  texture.repeat.y = 19;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return (
    <RigidBody
      type="fixed"
      position-y={0}
      rotation={[-Math.PI / 2, 0, 0]}
      colliders={"cuboid"}
    >
      <mesh receiveShadow>
        <boxGeometry args={[400, 400, 1]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
