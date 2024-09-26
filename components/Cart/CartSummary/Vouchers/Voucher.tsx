import Button from "components/Button/Button";
import { AnimatePresence, motion } from "framer-motion";

interface Props {
  voucher: { voucher: string; added: boolean };
  index: number;
  handleAdd: (voucher: string) => void;
  handleRemove: (voucher: string) => void;
}

const Voucher = ({ voucher, handleAdd, handleRemove }: Props) => {
  const variant = {
    hidden: { opacity: 0, x: -100 },
    show: { opacity: 1, x: 0 },
    exit: { opacity: 0, transition: { duration: 0.125 } },
  };

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={variant}
        key={voucher.voucher}
        className={`mr-2 inline-block w-full max-w-[350px] rounded-2xl ${
          voucher.added ? "bg-green-800" : "bg-gray-800"
        }`}
      >
        <div className="relative float-left flex h-[100px] w-[120px] flex-col items-center justify-center">
          <h5>100 XP</h5>
          <h3>100 SEK</h3>
          <div className="absolute right-0 top-0 h-[30px] w-[30px] translate-x-[50%] translate-y-[-50%] rounded-full bg-black"></div>
          <div className="absolute right-0 bottom-0 h-[30px] w-[30px] translate-x-[50%] translate-y-[50%] rounded-full bg-black"></div>
        </div>
        <div className=" flex h-[100px] flex-1 flex-col items-center justify-center border-l-2 border-dashed border-gray-500">
          {voucher.added ? (
            <Button onClick={() => handleRemove(voucher.voucher)}>
              Remove
            </Button>
          ) : (
            <Button onClick={() => handleAdd(voucher.voucher)}>Apply</Button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Voucher;
