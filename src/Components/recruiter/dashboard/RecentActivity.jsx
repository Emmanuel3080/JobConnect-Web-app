import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { PipelineStagePill, SkillMatchRing } from "../../PrecisionPrimitives";
import LoadingState from "../../shared/LoadingState";
import { formatDate, getInitials } from "../../../utils/recruiterPipeline";

/**
 * Most recent applications for the selected job; each row deep-links into
 * the Applicants module with that candidate pre-selected.
 */
const RecentActivity = ({ applicants, jobTitle, loading, limit = 5 }) => {
  const recent = [...applicants]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, limit);

  return (
    <section className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#E5DED2] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-[#14243A]">Recent applications</h2>
          <p className="text-xs text-[#526174] truncate">{jobTitle || "No job selected"}</p>
        </div>
        <Link
          to="/company/applicants"
          className="text-xs font-semibold text-[#39AFA0] hover:underline inline-flex items-center gap-1 shrink-0"
        >
          Open triage <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
        </Link>
      </div>

      {loading ? (
        <LoadingState count={3} className="p-4 space-y-2" itemClassName="h-14 rounded-lg" />
      ) : recent.length === 0 ? (
        <div className="p-8 text-center">
          <Users className="w-6 h-6 text-[#39AFA0] mx-auto mb-2" strokeWidth={1.5} />
          <p className="text-xs font-semibold text-[#14243A]">No applications yet</p>
          <p className="text-[11px] text-[#526174] mt-1">
            New candidates for this role will appear here.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#E5DED2]">
          {recent.map((a) => (
            <li key={a._uid}>
              <Link
                to="/company/applicants"
                state={{ applicantId: a._uid }}
                className="px-5 py-3 flex items-center gap-3 hover:bg-[#F4F1EA] transition-colors"
              >
                <span className="w-9 h-9 rounded-lg bg-[#14243A] text-[#FFFCF6] flex items-center justify-center text-xs font-bold shrink-0">
                  {getInitials(a.candidateName)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-[#14243A] truncate">
                    {a.candidateName || "Candidate"}
                  </span>
                  <span className="block font-mono-tabular text-[11px] text-[#7C8793]">
                    {formatDate(a.createdAt, { month: "short", day: "numeric" })}
                  </span>
                </span>
                <PipelineStagePill stage={a.effectiveStatus} size="xs" />
                <SkillMatchRing score={a.alignmentScore} size={34} strokeWidth={2.8} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentActivity;
