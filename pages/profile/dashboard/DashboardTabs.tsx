import { Tab } from "@headlessui/react";
import { motion } from "framer-motion";
import { useBackendUser } from "./useBackendUser";

const animation = {
  initial: { y: 33, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { opacity: 0 },
  transition: { delay: 0.5 },
};

const DashboardTabs = () => {
  const { isSteamer } = useBackendUser();
  const tabs = isSteamer
    ? ["Earnings", "Orders", "EXP Points", "Settings"]
    : ["Orders", "EXP Points", "Settings"];

  const tabStyle: string =
    "md:border-white border-r border-b border-borderGray w-full md:w-auto md:border md:px-10 py-4 md:py-2 px-4 md:justify-self-start md:self-start select-non";

  return (
    <>
      {tabs.map((item: string) => (
        <motion.div key={item} {...animation} className="w-full md:w-auto">
          <Tab as="div">
            {({ selected }) => (
              <>
                {item === "Earnings" ? (
                  <EarningsTab tabStyle={tabStyle} selected={selected}>
                    {item}
                  </EarningsTab>
                ) : (
                  <button className={`${tabStyle}  ${selected && "bg-white"}`}>
                    <h4 className={`${selected && "text-black"} `}>{item}</h4>
                  </button>
                )}
              </>
            )}
          </Tab>
        </motion.div>
      ))}
    </>
  );
};
export default DashboardTabs;

export const EarningsTab = ({ children, selected, tabStyle }: any) => {
  return (
    <button
      className={`${tabStyle} md:border-atomicApple ${
        selected &&
        "bg-gradient-to-r from-lividLime/50 via-atomicApple to-lividLime/70 animate-text"
      }`}
    >
      <h4
        className={`${
          selected
            ? "text-black"
            : "bg-gradient-to-r bg-clip-text text-transparent from-lividLime/50 via-atomicApple to-lividLime/70 animate-text"
        }`}
      >
        {children}
      </h4>
    </button>
  );
};
