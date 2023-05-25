import { Physics, Debug } from "@react-three/rapier";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import Character from "./components/Character";
import Sun from "./components/Sun";
import Floor from "./components/Floor";

function App() {
  return (
    <div id="div-container">
      <Canvas>
        <ambientLight intensity={0.5} />
        <Physics>
          <Debug />
          <Floor />
          <Character />
        </Physics>
        <Sun />
        <Environment files="/sky.hdr" background resolution={1} />
      </Canvas>
    </div>
  );
}

export default App;
