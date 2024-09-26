import Image from "next/image";
import gradient1 from "public/gradients/gradient-1.png";
import gradient2 from "public/gradients/gradient-2.png";

interface Props {
  gradientImage?: "one" | "two";
}

const Gradient = ({ gradientImage = "one" }: Props) => {
  return (
    <Image
      src={gradientImage === "one" ? gradient1 : gradient2}
      alt="gradient"
      placeholder="blur"
      layout="fill"
      className="pointer-events-none object-cover object-center mix-blend-screen relative overflow-x-hidden"
      data-testid="gradient"
    />
  );
};

export default Gradient;
