import React from "react";
import { Clock, ExternalLink, FileText, Mail, Phone, Users } from "lucide-react";
import { EmptyState, SkillMatchRing } from "../../PrecisionPrimitives";
import { formatDate, getInitials } from "../../../utils/recruiterPipeline";
import ApplicantActions from "./ApplicantActions";

/**
 * Candidate dossier.
 * - variant "pane": fills the right split pane; action bar stays put and only
 *   the body scrolls.
 * - variant "drawer": natural flow inside the mobile NativeModal, which owns
 *   the single scroll container.
 */
const ApplicantDetail = ({ candidate, job, variant = "pane", actions }) => {
  if (!candidate) {
    return (
      <div className="flex-1 flex items-center justify-center p-10">
        <EmptyState
          icon={Users}
          title="No Applicant Selected"
          description="Select a candidate from the list to review their cover letter, resume, and application details."
        />
      </div>
    );
  }

  const isPane = variant === "pane";

  return (
    <div className={isPane ? "flex flex-col h-full min-h-0 overflow-hidden" : "flex flex-col"}>
      <ApplicantActions candidate={candidate} {...actions} />

      <div
        className={
          isPane
            ? "flex-1 min-h-0 overflow-y-auto overscroll-contain p-6 space-y-6 scrollable-pane"
            : "pt-5 space-y-6"
        }
      >
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5DED2]">
          <div className="flex items-start gap-4 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-[#14243A] text-[#FFFCF6] flex items-center justify-center font-bold text-base shrink-0">
              {getInitials(candidate.candidateName)}
            </div>
            <div className="min-w-0">
              <h2 className="text-xl font-bold text-[#14243A] truncate">
                {candidate.candidateName || "Applicant"}
              </h2>
              <p className="text-xs font-medium text-[#526174] mt-0.5">
                Applicant for{" "}
                <span className="font-semibold text-[#14243A]">{job?.title || "Selected Job"}</span>
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-[#526174]">
                {candidate.email && (
                  <a
                    href={`mailto:${candidate.email}`}
                    className="inline-flex items-center gap-1.5 hover:text-[#39AFA0] transition-colors underline underline-offset-4 decoration-[#E5DED2] break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#7C8793] shrink-0" strokeWidth={1.5} />
                    {candidate.email}
                  </a>
                )}
                {candidate.phoneNumber && (
                  <span className="inline-flex items-center gap-1.5 font-mono-tabular">
                    <Phone className="w-3.5 h-3.5 text-[#7C8793]" strokeWidth={1.5} />
                    {candidate.phoneNumber}
                  </span>
                )}
                {candidate.createdAt && (
                  <span className="inline-flex items-center gap-1 font-mono-tabular text-[#7C8793]">
                    <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                    Applied {formatDate(candidate.createdAt)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="bg-[#F4F1EA] border border-[#E5DED2] rounded-xl px-4 py-3 flex items-center gap-3 shrink-0">
            <SkillMatchRing score={candidate.alignmentScore} size={44} strokeWidth={3.2} />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#7C8793]">
                Dossier Completeness
              </p>
              <p className="text-xs font-bold text-[#14243A] mt-0.5">
                {candidate.cvUrl ? "Resume & Cover Letter" : "Cover Letter"}
              </p>
            </div>
          </div>
        </div>

        {/* Cover letter */}
        <section className="bg-[#F4F1EA] border border-[#E5DED2] rounded-xl p-5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#14243A] flex items-center gap-1.5 mb-3">
            <FileText className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
            Candidate Cover Letter & Pitch
          </h3>
          <p className="text-xs sm:text-sm text-[#526174] leading-relaxed whitespace-pre-line break-words bg-[#FFFCF6] border border-[#E5DED2] rounded-lg p-4">
            {candidate.coverLetter || "No cover letter text provided."}
          </p>
        </section>

        {/* Role benchmark */}
        {job && (
          <section className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#14243A]">
                Role Requirements Benchmark — {job.title}
              </h3>
              <span className="font-mono-tabular text-xs font-semibold text-[#526174]">
                {job.salary}
              </span>
            </div>
            {job.skills?.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold text-[#7C8793] mb-2">Target Role Skills:</p>
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((skill, idx) => (
                    <span
                      key={`${skill}-${idx}`}
                      className="bg-[#F4F1EA] border border-[#E5DED2] text-[#14243A] rounded-md text-xs font-medium px-2.5 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Resume */}
        <section className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#39AFA0]/15 border border-[#39AFA0]/40 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#39AFA0]" strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#14243A]">Candidate Resume / CV Document</h4>
              <p className="text-xs text-[#526174]">
                {candidate.cvUrl
                  ? "Official resume attachment submitted with application"
                  : "No external resume URL attached"}
              </p>
            </div>
          </div>
          {candidate.cvUrl && (
            <a
              href={candidate.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] transition-colors shrink-0"
            >
              <span>View Full Resume</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
            </a>
          )}
        </section>
      </div>
    </div>
  );
};

export default ApplicantDetail;
