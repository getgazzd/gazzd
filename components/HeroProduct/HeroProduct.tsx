import { AnimatePresence, motion } from "framer-motion";

import Button from "components/Button/Button";
import { HeroProductType } from "types";
import Image from "next/image";
import Link from "next/link";
import Marquee from "components/Marquee";
import { icon } from "components/ProductSections/ProductSection/ProductIcons/IconData";

const animation = {
  initial: { y: -33, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 1 } },
  exit: {},
};

const HeroProduct = (heroContent: HeroProductType) => {
  return (
    <>
      {heroContent && (
        <motion.div
          {...animation}
          className="z-10 flex w-full flex-col items-center justify-center md:flex-row 2xl:container"
        >
          <div className="mx-4 mt-10 md:-mt-16 flex flex-col md:mx-16 md:w-2/5">
            <p className="text-sm mb-6 md:pb-2">{heroContent?.subtitle}</p>
            <h1>{heroContent?.title}</h1>
            {heroContent.buttonLink.startsWith("http") ? (
              <a
                href={heroContent.buttonLink}
                className="mt-6"
                rel="noreferrer"
                target="_blank"
              >
                <Button className="mt-6" size="small">
                  {heroContent?.buttonText}
                </Button>
              </a>
            ) : (
              <Link href={heroContent.buttonLink} passHref>
                <a>
                  <Button className="mt-6" size="small">
                    {heroContent?.buttonText}
                  </Button>
                </a>
              </Link>
            )}
          </div>
          <div className="w-full md:w-1/2  flex items-center">
            <motion.div className="w-full h-full">
              <Image
                src={"https:" + heroContent?.heroImage.fields.file.url}
                width={heroContent?.heroImage.fields.file.details.image.width}
                height={heroContent?.heroImage.fields.file.details.image.height}
                alt={heroContent?.title}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default HeroProduct;
