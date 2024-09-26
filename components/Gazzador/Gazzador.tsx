import { IGazzador } from "types/gazzador";
import Image from "next/image";
import Parallax from "components/Parallax";
import { motion } from "framer-motion";
import { EVENTS, trackEvent } from "helpers/trackEvents";

const Gazzador = ({ gazzador }: { gazzador: IGazzador }) => {
  const isLive = gazzador.is_live;

  const handleTracking = () => {
    trackEvent(EVENTS.GAZZADOR_CLICKED)
  }

  return (
    <motion.a
      key={gazzador.title}
      variants={gazzadorCardAnimation}
      className="origin-center"
      href={gazzador.link && gazzador.link}
      onClick={handleTracking}
      target="_blank"
    >
      <Parallax>
        <motion.div
          className="relative"
          key={gazzador.title + "inner"}
          whileHover={{ scale: 1.01, y: 0 }}
          whileTap={{ scale: 1.02 }}
        >
          {isLive && (
            <>
              <motion.div
                animate={{
                  opacity: 0,
                  scale: isLive ? 1.06 : 1,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.3,
                  repeatType: "mirror",
                }}
                className="absolute inset-0 bg-brand-twitch"
              />

              <motion.div
                animate={{
                  opacity: 0,
                  scale: isLive ? 1.07 : 1,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1,
                  repeatType: "mirror",
                }}
                className="absolute inset-0 bg-brand-twitch"
              />
              <div className="absolute top-4 right-4 text-white font-semibold px-2 py-0.5 bg-brand-youtube z-50">
                LIVE
              </div>
            </>
          )}
          <Image
            src={"https:" + gazzador?.image?.fields?.file?.url + "?w=600"}
            alt={gazzador?.title}
            height={gazzador?.image?.fields?.file?.details?.image?.height}
            width={gazzador?.image?.fields?.file?.details?.image?.width}
            layout="responsive"
            objectFit="cover"
          />
        </motion.div>
      </Parallax>
    </motion.a>
  );
};
export default Gazzador;

const gazzadorCardAnimation = {
  hidden: { opacity: 0, scale: 1.1, rotate: Math.random() * 5 - 5 },
  show: { opacity: 1, scale: 1, rotate: 0 },
};
