import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExternalLink, UserCheck } from "lucide-react";
import { useRecruiterWorkspace } from "../Context/RecruiterWorkspaceContext";
import PageHeader from "../Components/shared/PageHeader";
import LoadingState from "../Components/shared/LoadingState";
import JobSelect from "../Components/recruiter/jobs/JobSelect";
import { EmptyState, PipelineStagePill, SkillMatchRing } from "../Components/PrecisionPrimitives";
import { primaryButton } from "../utils/recruiterStyles";

const TalentPool = () => {
  const navigate = useNavigate();
  const { jobs, selectedJobId, selectedJob, setSelectedJobId, talentPool, loadingApplicants } =
    useRecruiterWorkspace();

  const openInTriage = (applicantId) =>
    navigate("/company/applicants", { state: { applicantId } });

  return (
    <section className="space-y-4">
      <PageHeader
        title="Talent Pool"
        description={`Candidates shortlisted, interviewing, or with an offer for ${
          selectedJob?.title || "your active roles"
        }.`}
        actions={
          <JobSelect
            jobs={jobs}
            value={selectedJobId}
            onChange={setSelectedJobId}
            showCounts={false}
            className="bg-[#FFFCF6]"
          />
        }
      />

      {loadingApplicants ? (
        <LoadingState
          count={3}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          itemClassName="h-36 rounded-xl"
        />
      ) : talentPool.length === 0 ? (
        <EmptyState
          icon={UserCheck}
          title="No candidates in the Talent Pool for this role yet"
          description="Shortlist or advance candidates from the Applicants module to build your high-priority talent pool."
          action={
            <Link to="/company/applicants" className={primaryButton}>
              Open Applicant Triage
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {talentPool.map((cand) => (
            <article
              key={cand._uid}
              className="bg-[#FFFCF6] border border-[#E5DED2] hover:border-[#39AFA0] rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-[#14243A] truncate">{cand.candidateName}</h3>
                  <p className="text-xs text-[#526174] truncate mt-0.5">{cand.email}</p>
                  <div className="mt-2">
                    <PipelineStagePill stage={cand.effectiveStatus} size="xs" />
                  </div>
                </div>
                <SkillMatchRing score={cand.alignmentScore} size={42} strokeWidth={3} />
              </div>

              <div className="pt-3 border-t border-[#E5DED2] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openInTriage(cand._uid)}
                  className="text-xs font-semibold text-[#39AFA0] hover:underline cursor-pointer"
                >
                  Open in Triage →
                </button>
                {cand.cvUrl && (
                  <a
                    href={cand.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#14243A] hover:text-[#39AFA0]"
                  >
                    <span>Resume</span>
                    <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default TalentPool;
