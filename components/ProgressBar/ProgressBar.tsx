import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCurrentLevel,
  selectPrevLevel,
  selectXP,
} from "store/selectors/user";

const ProgressBar = () => {
  const xp = useSelector(selectXP);
  const [progress, setProgress] = useState<number>(xp || 0);
  const [expGained, setExpGained] = useState<number>(xp || 0);
  const newExpBar = useRef(null);
  const textRef = useRef(null);

  const currentLevel = useSelector(selectCurrentLevel);
  const prevLevel = useSelector(selectPrevLevel);

  useEffect(() => {
    setProgress(expGained);
  }, [expGained]);

  const onExpGain = (newXp: number) => {
    setExpGained(newXp);
  };

  let value = 0;
  if (expGained && currentLevel && prevLevel) {
    if (expGained < currentLevel.limit) {
      value =
        (((expGained - prevLevel.limit) %
          (currentLevel.limit - prevLevel.limit)) /
          currentLevel.limit) *
        100;
    } else {
      value = 100;
    }
  }

  let progressValue = 0;
  if (progress && currentLevel && prevLevel) {
    if (progress < currentLevel.limit) {
      progressValue =
        (((progress - prevLevel.limit) %
          (currentLevel.limit - prevLevel.limit)) /
          currentLevel.limit) *
        100;
    } else {
      progressValue = 100;
    }
  }

  const progressBarAnimation = {
    animate: { width: progressValue + "%" },
    transition: { ease: "anticipate", duration: 0.8, delay: 0.2 },
  };

  const expGainAnimation = {
    animate: { width: value + "%" },
    transition: { ease: "anticipate", duration: 0.2 },
  };

  useEffect(() => {
    const node = textRef.current as unknown as HTMLSpanElement;

    if (xp && xp !== expGained) onExpGain(xp);
    const controls = animate(progress, xp, {
      duration: 0.4,
      delay: 0.5,
      onUpdate(value) {
        if (node && value) {
          node.textContent = `${Math.round(value).toFixed(2).split(".")[0]} XP`;
        }
      },
    });

    return () => controls.stop();
  }, [xp]);

  return (
    <div
      key="test2"
      id="test2"
      className="flex h-full w-full flex-row items-center justify-between"
    >
      <div className="flex flex-row items-center justify-center px-2">
        {prevLevel?.limit}
      </div>

      <div className="relative h-1 w-full">
        <div id="backdrop" className="absolute h-full w-full bg-black/50" />
        <div className="absolute flex h-full w-full">
          <motion.div
            ref={newExpBar}
            style={{ width: value + "%" }}
            className="h-full bg-opacity-40 bg-gradient-to-r from-transparent to-green-400"
            {...expGainAnimation}
          />
          <motion.div
            style={{ width: progressValue + "%" }}
            className="absolute flex h-full justify-end bg-white"
            {...progressBarAnimation}
          >
            <span
              ref={textRef}
              className="text-md absolute mt-1 whitespace-nowrap font-bold"
            />
          </motion.div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center px-2">
        {currentLevel?.limit}
      </div>
    </div>
  );
};

export default ProgressBar;
