import Image from "next/image";
import Link from "next/link";

export interface Props {
  variant?: string;
}

const Logotype = ({ variant = "white" }: Props) => {
  return (
    <>
      <Link href="/" passHref>
        <a>
          <div className="cursor-pointer select-none">
            <Image
              src={"/icons/logotype/logotype_white.svg"}
              alt="GAZZD logotype"
              width={32}
              height={111}
            />
          </div>
        </a>
      </Link>
    </>
  );
};
export default Logotype;
