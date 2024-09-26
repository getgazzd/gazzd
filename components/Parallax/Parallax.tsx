import { motion, useMotionValue, useTransform } from "framer-motion";

import { useRef } from "react";

const Parallax = ({ children }: any) => {
  const container = useRef<HTMLDivElement>(null);

  const x = useMotionValue(400);
  const y = useMotionValue(400);
  const opa = useMotionValue(0);

  const rotateX = useTransform(y, [0, 400], [3, -3]);
  const rotateY = useTransform(x, [0, 400], [-3, 3]);

  function handleMouse(event: any) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
    // @ts-ignore
    opa.set(Math.abs(rotateX.current + rotateY.current) / 20);
  }

  return (
    <motion.div
      ref={container}
      style={{
        display: "flex",
        placeItems: "center",
        placeContent: "center",
        perspective: 2500,
      }}
      onMouseMove={handleMouse}
    >
      <motion.div
        className="w-full h-full relative"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
        }}
      >
        {children}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 "
        >
          <motion.div
            className="bg-gradient-to-tr from-atomicApple via-streakingStrawberries to-blueberryBlizz w-full h-full mix-blend-lighten pointer-events-none [clip-path:circle(20%_at_120%_120%)]"
            style={{
              opacity: opa,
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Parallax;
