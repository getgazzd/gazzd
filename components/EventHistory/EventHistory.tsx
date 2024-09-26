import { motion } from "framer-motion";
import { useTranslation } from "hooks";
import { useEvents } from "hooks/useEvents";

import Loading from "components/Loading/Loading";

const EventHistory = () => {
  const { t } = useTranslation();
  const { events, loading } = useEvents();

  if (loading)
    return (
      <div className="flex min-h-[80vh] items-center  w-full">
        <Loading />
      </div>
    );
  return (
    <div className="md:p-6 pl-4 py-4">
      <div className="flex w-full pb-16">
        <h2>{t("Your EXP gains")}</h2>
      </div>
      <div className="md:scrollbar-1">
        <table className="table-auto text-[11px] md:w-full md:text-sm w-full">
          <thead>
            <tr>
              {[t("Event"), t("Points"), t("Action"), t("Date")].map((item) => (
                <th key={item} className="text-left md:pr-8 md:pb-8">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            {events.map(({ event_type, points, action, created_at }) => (
              <motion.tr
                variants={listItem}
                key={created_at}
                className="border-b border-borderGray text-right md:p-8"
              >
                <Cell>{event_type}</Cell>
                <Cell>{points} XP</Cell>
                <Cell>{action}</Cell>
                <Cell>{created_at}</Cell>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </div>
  );
};
export default EventHistory;

const Cell = ({ children }: { children: any }) => (
  <td className="py-4 md:p-4 pr-4 text-left">{children}</td>
);

const listItem = {
  hidden: { opacity: 0, x: -33 },
  show: { opacity: 1, x: 0 },
};

const container = {
  hidden: { opacity: 0.3 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};
