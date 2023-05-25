import { EffectComposer } from "@react-three/postprocessing";
import LensFlareEffect from "../effects/UltimateLensFlare";

const Sun = () => {
  return (
    <EffectComposer>
      <LensFlareEffect
        position={{ x: -100, y: 40, z: 400 }}
        followMouse={false}
        animated={false}
        starBurst={false}
      />
    </EffectComposer>
  );
};

export default Sun;
