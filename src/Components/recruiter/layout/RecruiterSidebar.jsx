import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import logo from "../../../assets/jobconnect_logo.svg";
import { sidebarFocusRing } from "../../../utils/recruiterStyles";

/**
 * Midnight Navy sidebar panel. Rendered inside the sticky desktop <aside>
 * and inside the mobile slide-over drawer.
 */
const RecruiterSidebar = ({ counts = {}, userInfo, onLogout, onNavigate, onClose }) => {
  const navItems = [
    { to: "/company", end: true, label: "Overview", icon: LayoutDashboard },
    { to: "/company/jobs", label: "Jobs", icon: Briefcase, count: counts.jobs },
    { to: "/company/applicants", label: "Applicants", icon: Users, count: counts.applicants },
    { to: "/company/talent-pool", label: "Talent Pool", icon: UserCheck, count: counts.talentPool },
    { to: "/company/interviews", label: "Interviews", icon: Calendar, count: counts.interviews },
    { to: "/company/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-[#14243A] text-[#FFFCF6] select-none">
      {/* Brand */}
      <div className="px-5 py-5 border-b border-[#213B50] flex items-center justify-between gap-3 shrink-0">
        <Link
          to="/company"
          onClick={onNavigate}
          className={`flex items-center gap-3 min-w-0 rounded-lg ${sidebarFocusRing}`}
        >
          <span className="w-9 h-9 rounded-xl bg-[#FFFCF6] p-1.5 flex items-center justify-center shrink-0">
            <img src={logo} alt="JobConnect" className="w-full h-full object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block text-base font-extrabold tracking-tight text-[#FFFCF6] truncate">
              Job<span className="text-[#39AFA0]">Connect</span>
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#D6A875]">
              Recruiter ATS
            </span>
          </span>
        </Link>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className={`p-1.5 rounded-lg text-[#E5DED2]/80 hover:text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer ${sidebarFocusRing}`}
          >
            <X className="w-4 h-4" strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Primary CTA */}
      <div className="px-4 pt-4 pb-2 shrink-0">
        <Link
          to="/post-job"
          onClick={onNavigate}
          className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-[#39AFA0] text-[#14243A] hover:bg-[#39AFA0]/90 transition-colors ${sidebarFocusRing}`}
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span>Post New Job</span>
        </Link>
      </div>

      {/* Modules */}
      <nav aria-label="Recruiter ATS navigation" className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#7C8793]">
          Recruitment Modules
        </p>

        {navItems.map(({ to, end, label, icon, count }) => {
          const Icon = icon;
          return (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border-l-2 ${sidebarFocusRing} ${
                  isActive
                    ? "bg-[#213B50] text-[#FFFCF6] border-l-[#39AFA0]"
                    : "text-[#E5DED2]/80 border-l-transparent hover:bg-[#213B50]/60 hover:text-[#FFFCF6]"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isActive ? "text-[#39AFA0]" : "text-[#7C8793]"}`}
                      strokeWidth={1.5}
                    />
                    <span className="truncate">{label}</span>
                  </span>
                  {count !== undefined && (
                    <span
                      className={`font-mono-tabular text-[11px] min-w-5 text-center px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? "bg-[#39AFA0] text-[#14243A] font-bold"
                          : "bg-[#213B50] text-[#E5DED2]/85"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Profile + sign out */}
      <div className="p-4 border-t border-[#213B50] space-y-3 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <span
            aria-hidden="true"
            className="w-9 h-9 rounded-xl bg-[#213B50] border border-[#39AFA0]/40 text-[#FFFCF6] flex items-center justify-center text-xs font-bold shrink-0"
          >
            {userInfo?.name?.charAt(0)?.toUpperCase() || "R"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#FFFCF6] truncate">
              {userInfo?.name || "Recruiter"}
            </p>
            <p className="text-[11px] text-[#E5DED2]/70 truncate">
              {userInfo?.companyName || userInfo?.email || "Hiring Team"}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className={`w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-200 bg-rose-950/50 border border-rose-800/50 hover:bg-rose-900/60 transition-colors cursor-pointer ${sidebarFocusRing}`}
        >
          <LogOut className="w-3.5 h-3.5" strokeWidth={1.5} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
