import React from "react";
import { Link } from "react-router-dom";
import { Plus, Briefcase } from "lucide-react";
import recruiterHeroPic from "../../../assets/hr-expert-reading-files-identifying-right-candidates-job-opening.jpg";
import { primaryButton, secondaryButton } from "../../../utils/recruiterStyles";

/**
 * Overview hero banner with recruitment photography under a Warm Sand overlay.
 */
const WelcomeBanner = ({ name, jobCount }) => (
  <section
    className="relative overflow-hidden rounded-2xl border border-[#E5DED2] bg-cover bg-center p-6 sm:p-8"
    style={{ backgroundImage: `url(${recruiterHeroPic})` }}
  >
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-gradient-to-r from-[#FFFCF6]/95 via-[#FFFCF6]/90 to-[#F4F1EA]/75"
    />
    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="max-w-2xl space-y-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14243A] tracking-tight">
          Welcome back, {name}
        </h1>
        <p className="text-xs sm:text-sm text-[#526174] leading-relaxed">
          Evaluate incoming applications, manage hiring stages, and publish new openings from
          your recruitment workspace.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Link to="/post-job" className={primaryButton}>
          <Plus className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
          <span>Publish New Role</span>
        </Link>
        <Link to="/company/jobs" className={secondaryButton}>
          <Briefcase className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
          <span>Manage Jobs ({jobCount})</span>
        </Link>
      </div>
    </div>
  </section>
);

export default WelcomeBanner;
