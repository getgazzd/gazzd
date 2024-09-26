import { AnimatePresence, motion } from "framer-motion";
import { EVENTS, trackEvent } from "helpers/trackEvents";
import { FormEvent, useState } from "react";

import Button from "components/Button/Button";
import Input from "components/Input";
import useShareSelection from "hooks/useShareSelection";
import { useSelector } from "react-redux";
import { selectCart } from "store/selectors/cart";

export const ShareCartLink = () => {
  const { sendEmail } = useShareSelection();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  const cart = useSelector(selectCart);
  const itemsInCart = cart.selection

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
    sendEmail(email);
    setEmail("");
  };

  const toggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      trackEvent(EVENTS.OPEN_SEND_CART);
      setIsOpen(true);
    }
  };
  if (itemsInCart?.items && itemsInCart.items.length < 1) return null;
  return (
    <div className="w-full relative px-2">
      <AnimatePresence>
        {isOpen && (
          <form onSubmit={handleSubmit}>
            <motion.div
              className="absolute w-full -mt-16 flex flex-row"
              initial={{ y: 6, opacity: 0.7 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0.7 }}
              transition={{ duration: 0.1 }}
            >
              <Input
                onChange={(e: FormEvent<HTMLInputElement>) =>
                  setEmail(e.currentTarget.value)
                }
                value={email}
                noMargin
                type="email"
                name="shareCart"
                placeholder=" email"
              />
              <Button type="submit">send it</Button>
            </motion.div>
          </form>
        )}
      </AnimatePresence>
      <Button
        onClick={toggle}
        variant="ghost"
        size="smallFluid"
        customColor="#33CC33"
      >
        {isOpen ? "close" : "share my cart"}
      </Button>
    </div>
  );
};

export default ShareCartLink;
