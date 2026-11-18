import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  RecruiterWorkspaceProvider,
  useRecruiterWorkspace,
} from "../../../Context/RecruiterWorkspaceContext";
import LoadingState from "../../shared/LoadingState";
import RecruiterSidebar from "./RecruiterSidebar";
import MobileSidebar from "./MobileSidebar";

const RecruiterShell = () => {
  const navigate = useNavigate();
  const { userInfo, jobs, applicants, talentPool, scheduledInterviews } = useRecruiterWorkspace();

  if (!userInfo) return <LoadingState fullScreen />;

  const handleLogout = () => {
    localStorage.removeItem("RecruiterAccessToken");
    navigate("/company/signin");
  };

  const sidebarProps = {
    userInfo,
    onLogout: handleLogout,
    counts: {
      jobs: jobs.length,
      applicants: applicants.length,
      talentPool: talentPool.length,
      interviews: scheduledInterviews.length,
    },
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#14243A] flex flex-col lg:flex-row overflow-x-hidden">
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:sticky lg:top-0 lg:h-screen border-r border-[#213B50] z-30">
        <div className="w-full h-full">
          <RecruiterSidebar {...sidebarProps} />
        </div>
      </aside>

      <MobileSidebar {...sidebarProps} />

      <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-[1360px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

/**
 * Shell for every /company/* module page: workspace state, sidebar, drawer.
 */
const RecruiterLayout = () => (
  <RecruiterWorkspaceProvider>
    <RecruiterShell />
  </RecruiterWorkspaceProvider>
);

export default RecruiterLayout;
