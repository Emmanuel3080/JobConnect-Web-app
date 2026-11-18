import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, FileText } from "lucide-react";
import { authContext } from "../Context/AuthContext";
import { jobContext } from "../Context/JobContext";
import heroPic from "../assets/hr-employee-does-greeting-handshake-with-happy-candidate-wheelchair.jpg";
// import heroPic from "../assets/employment-opportunity-hiring-jobs-icon.jpg";

const LandingPage = () => {
  const { userInfo } = useContext(authContext) || {};
  const { jobs } = useContext(jobContext) || {};

  const skillPills = userInfo?.Skills
    ? Array.isArray(userInfo.Skills)
      ? userInfo.Skills
      : String(userInfo.Skills)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
    : [];

  const jobCount = Array.isArray(jobs) ? jobs.length : 0;

  return (
    <section className="relative bg-[#FFFCF6] border-b border-[#E5DED2] overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 lg:min-h-[600px]">
        {/* Text column */}
        <div className="lg:col-span-5 order-2 lg:order-1 px-4 sm:px-6 lg:pl-8 lg:pr-12 py-10 sm:py-14 lg:py-20 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#14243A] tracking-tight leading-[1.08]">
            {/* Welcome back{userInfo?.name ? `, ${userInfo.name}` : ""}. */}
            <span className="block mt-2 text-[#213B50] text-2xl sm:text-3xl font-bold leading-snug">
              Find the role that moves your career forward.
            </span>
          </h1>

          <p className="mt-5 text-base text-[#526174] leading-relaxed max-w-md">
            Talk to verified hiring teams for remote, hybrid, and on-site jobs.
            Filter by your skills and see where every application stands.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#14243A] hover:bg-[#213B50] text-[#FFFCF6] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2"
            >
              Browse jobs
              <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
            </Link>
            <Link
              to="/applications"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#14243A] border border-[#14243A]/20 hover:border-[#39AFA0] hover:bg-[#F4F1EA] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2"
            >
              <FileText className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              My applications
            </Link>
          </div>

          {skillPills.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#E5DED2]">
              <p className="text-xs font-semibold text-[#7C8793] mb-2.5">
                Matching jobs on your skills
              </p>
              <div className="flex flex-wrap gap-2">
                {skillPills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F4F1EA] border border-[#E5DED2] text-[#14243A] rounded-full text-xs font-medium px-3 py-1"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image column: full colour, no overlay */}
        <div className="lg:col-span-7 order-1 lg:order-2 relative">
          <div className="relative h-[320px] sm:h-[420px] lg:h-full lg:absolute lg:inset-y-0 lg:left-0 lg:right-0 xl:-right-8">
            <img
              src={heroPic}
              alt="A recruiter shakes hands with a smiling candidate in a wheelchair"
              className="w-full h-full object-cover object-center lg:rounded-l-[2.5rem]"
            />
            {/* Soft edge so the photo meets the text panel cleanly on desktop only */}
            <div
              aria-hidden="true"
              className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#FFFCF6] to-transparent lg:rounded-l-[2.5rem]"
            />
          </div>

          {/* Floating open-roles card sits on the photo */}
          <div className="absolute left-4 bottom-4 sm:left-6 sm:bottom-6 lg:left-auto lg:right-12 lg:bottom-10 flex items-center gap-4 bg-[#FFFCF6] rounded-2xl pl-5 pr-4 py-4 shadow-lg shadow-[#14243A]/20 border border-[#E5DED2]">
            <div>
              <p className="text-xs font-semibold text-[#526174]">
                Verified open roles
              </p>
              <p className="text-3xl font-extrabold text-[#14243A] tabular-nums leading-none mt-1">
                {jobCount}
              </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#14243A] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-[#39AFA0]" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;