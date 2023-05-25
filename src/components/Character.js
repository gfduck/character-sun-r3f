import { RigidBody } from "@react-three/rapier";
import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
const Character = () => {
  const refCharacter = useRef(null);
  const refMoveForward = useRef(false);
  const refMoveLeft = useRef(false);
  const refMoveRight = useRef(false);
  const rotationQuaternion = new THREE.Quaternion();
  const axisY = new THREE.Vector3(0, 0.17, 0);
  let worldVelocity = new THREE.Vector3();
  let localVelocity = new THREE.Vector3();
  const refLocalVelocity = useRef(localVelocity);
  const refWorldVelocity = useRef(worldVelocity);
  const refMoveBase = useRef(400);
  const refMoveDistance = useRef(refMoveBase.current * 1);
  const refGroup = useRef(null);

  const { camera } = useThree();
  useFrame(() => {
    if (!refCharacter.current) return;
    const rotation = refCharacter.current.rotation();
    const position = refCharacter.current.translation();
    const rotateAngle = Math.PI * 2 * 0.016;
    if (refMoveLeft.current) {
      rotationQuaternion.setFromAxisAngle(axisY, rotateAngle);
      let temporal1 = rotationQuaternion.multiply(rotation);

      refCharacter.current.setRotation(
        {
          w: temporal1.w,
          x: temporal1.x,
          y: temporal1.y,
          z: temporal1.z,
        },
        true
      );
    } else if (refMoveRight.current) {
      rotationQuaternion.setFromAxisAngle(axisY, -rotateAngle);

      let temporal1 = rotationQuaternion.multiply(rotation);

      refCharacter.current.setRotation(
        {
          w: temporal1.w,
          x: temporal1.x,
          y: temporal1.y,
          z: temporal1.z,
        },
        true
      );
    }
    let moveDistance = refMoveDistance.current * 0.016;

    refLocalVelocity.current.set(0, 0, moveDistance * 4);

    refWorldVelocity.current = refLocalVelocity.current;
    refWorldVelocity.current.applyQuaternion(rotation);

    refWorldVelocity.current.applyQuaternion(rotation);

    if (refMoveForward.current) {
      refCharacter.current.setLinvel(
        {
          x: -refWorldVelocity.current.x,
          y: -2,
          z: -refWorldVelocity.current.z,
        },
        false
      );
    }
    const relativeCameraOffset = new THREE.Vector3(0, 6, 4);

    const cameraOffset = relativeCameraOffset.applyMatrix4(
      refGroup.current.matrixWorld
    );
    camera.lookAt(position.x, position.y + 1.5, position.z);

    camera.updateProjectionMatrix();

    camera.position.lerp(
      new THREE.Vector3(cameraOffset.x, cameraOffset.y, cameraOffset.z),
      0.125
    );
  });
  useEffect(() => {
    const keyDown = (e) => {
      const key = e.key.toLowerCase();

      if (key === "w") {
        // if (!refPersonajePiso.current) return;
        refMoveForward.current = true;
      }
      if (key === "a") {
        refMoveLeft.current = true;
      } else if (key === "d") {
        refMoveRight.current = true;
      }
    };
    const keyUp = (e) => {
      const key = e.key.toLowerCase();

      if (key === "w") {
        refMoveForward.current = false;
      }
      if (key === "a") {
        refMoveLeft.current = false;
      } else if (key === "d") {
        refMoveRight.current = false;
      }
    };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, []);
  return (
    <>
      <RigidBody
        type="dynamic"
        position-y={10}
        rotation={[-Math.PI / 2, 0, 0]}
        colliders={"cuboid"}
        ref={refCharacter}
        friction={4}
        enabledRotations={["x", "z"]}
      >
        <mesh ref={refGroup}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial opacity={0.8} color="red" />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Character;
