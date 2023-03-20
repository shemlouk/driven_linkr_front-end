import ParticlesAnimation from "../utils/particles";
import { useEffect, useRef } from "react";

const config = {
  quantity: 80,
  radius: 4,
  speed: 2,
  color: "#fff",
  factor: 1,
  offset: 100,
  opacity: 200,
  connectionDistance: 200,
};

const CanvasAnimation = (width, height) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const animation = new ParticlesAnimation(canvasRef.current, config);
    animation.init();
  });

  return <canvas ref={canvasRef} {...{ width, height }} />;
};

export default CanvasAnimation;
