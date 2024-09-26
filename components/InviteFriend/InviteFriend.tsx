import { Disclosure } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "components/Button/Button";
import Input from "components/Input";
import Icon from "components/Shared/Icon";

import GetInviteLink from "./GetInviteLink";
import useInviteFriend from "./useInviteFriend";

const animation = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -3 },
  transition: { duration: 0.17 },
};

const InviteFriend = () => {
  const { t, onSubmit, email, setEmail, loading } = useInviteFriend();

  return (
    <>
      <Disclosure
        as="div"
        className="border border-atomicApple bg-black/90 relative z-40"
      >
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-center space-x-2 bg-atomicApple py-3">
              <span className="h-6 w-6">
                <Icon type="hang" />
              </span>
              <h4 className="text-black">{t("invite friend = 100 xp")}</h4>
            </Disclosure.Button>
            <Disclosure.Panel
              as={motion.div}
              key="InviteFriendPanel"
              {...animation}
            >
              <AnimatePresence>
                {open && (
                  <div className="flex flex-col items-center justify-center py-6 px-4">
                    <div className="flex w-full flex-col">
                      <form onSubmit={onSubmit}>
                        <Input
                          name="email"
                          type="email"
                          label="friends email"
                          placeholder="my friends email"
                          value={email}
                          required
                          onChange={(event) =>
                            setEmail(event.currentTarget.value)
                          }
                        />
                        <Button
                          className="mt-4"
                          type="submit"
                          size="smallFluid"
                          disabled={loading}
                        >
                          {t("send invite")}
                        </Button>
                      </form>
                      <p className="m-auto py-5">{t("or you can")}</p>
                    </div>
                    <GetInviteLink />
                  </div>
                )}
              </AnimatePresence>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
};
export default InviteFriend;
