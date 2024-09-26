import { Tab } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import OrdersDashboard from "components/Orders/OrdersDashboard";
import ProfileXP from "components/ProfileXP/ProfileXP";

import ExperienceHistory from "../ExperienceHistory";
import AlertBoxButton from "./AlertBoxButton";
import DashboardTabs from "./DashboardTabs";
import Earnings from "./Earnings";
import LogoutButton from "./LogoutButton";
import ProfileBar from "./ProfileBar";
import Settings from "./Settings";
import TestAlertBoxButton from "./TestAlertBoxButton";
import { useBackendUser } from "./useBackendUser";

const Dashboard = () => {
  const { isSteamer } = useBackendUser();
  return (
    <div className="dashboard-grid w-full fill-appBorder -mt-24 md:-mt-16">
      <Tab.Group>
        <div className="profile_tabs flex flex-col md:flex-col-reverse md:border-b border-borderGray md:border-0 mb-2 md:mb-0">
          <ProfileBar />
          <Tab.List className="grid grid-cols-2  md:flex md:gap-8 w-full md:p-8 md:flex-wrap">
            <AnimatePresence>
              <DashboardTabs />
            </AnimatePresence>
          </Tab.List>
        </div>

        <div className="profile_exp md:border-l border-b border-borderGray">
          <div className="px-6 h-full">
            <ProfileXP />
          </div>
        </div>

        <div className="profile_sidebar md:border-l border-borderGray flex flex-col justify-end">
          {isSteamer && (
            <div className="p-4 md:p-8 grid gap-8 md:border-t border-b md:border-b-0 border-borderGray">
              <AlertBoxButton />
              <TestAlertBoxButton />
            </div>
          )}

          <div className="p-8 border-t border-borderGray hidden md:block">
            <LogoutButton />
          </div>
        </div>
        <div className="profile_container md:overflow-y-scroll w-full">
          <Tab.Panels as="div" className="h-full">
            <AnimatePresence>
              {isSteamer && (
                <Tab.Panel key="EarningsPanel" className="h-full">
                  <Earnings />
                </Tab.Panel>
              )}
              <Tab.Panel key="OrdersPanel">
                <OrdersDashboard />
              </Tab.Panel>
              <Tab.Panel key="ExpPanel" className="overflow-x-hidden">
                <ExperienceHistory />
              </Tab.Panel>
              <Tab.Panel key="SettingsPanel" className="h-full">
                <Settings />
              </Tab.Panel>
            </AnimatePresence>
          </Tab.Panels>
          <div className="p-4 border-t border-borderGray md:hidden">
            <LogoutButton />
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default Dashboard;
