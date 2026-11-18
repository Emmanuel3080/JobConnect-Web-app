import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecruiterWorkspace } from "../Context/RecruiterWorkspaceContext";
import NativeModal from "../Components/NativeModal";
import PageHeader from "../Components/shared/PageHeader";
import ApplicantFilters from "../Components/recruiter/applicants/ApplicantFilters";
import ApplicantList from "../Components/recruiter/applicants/ApplicantList";
import ApplicantDetail from "../Components/recruiter/applicants/ApplicantDetail";
import ApplicantPipeline from "../Components/recruiter/applicants/ApplicantPipeline";
import InterviewScheduler from "../Components/recruiter/interviews/InterviewScheduler";
import {
  buildInterviewMailto,
  countByStage,
  filterAndSortApplicants,
} from "../utils/recruiterPipeline";

const isBelowDesktop = () => window.matchMedia("(max-width: 1023.98px)").matches;

const Applicants = () => {
  const location = useLocation();
  const {
    userInfo,
    jobs,
    selectedJobId,
    selectedJob,
    setSelectedJobId,
    applicants,
    loadingApplicants,
    changeStage,
    advanceStage,
    addInterview,
  } = useRecruiterWorkspace();

  // Module-local UI state
  const [viewMode, setViewMode] = useState("split");
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("All");
  const [sort, setSort] = useState("newest");
  // Other modules can deep-link a candidate via router state.
  const [selectedId, setSelectedId] = useState(location.state?.applicantId || "");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [scheduleTarget, setScheduleTarget] = useState(null);

  const visibleApplicants = useMemo(
    () => filterAndSortApplicants(applicants, { stage, query, sort }),
    [applicants, stage, query, sort]
  );
  const stageCounts = useMemo(() => countByStage(applicants), [applicants]);

  const activeCandidate =
    visibleApplicants.find((a) => a._uid === selectedId) || visibleApplicants[0] || null;

  const selectApplicant = (id) => {
    setSelectedId(id);
    if (isBelowDesktop()) setMobileDetailOpen(true);
  };

  const inspectFromPipeline = (id) => {
    setSelectedId(id);
    setViewMode("split");
    if (isBelowDesktop()) setMobileDetailOpen(true);
  };

  const handleJobChange = (jobId) => {
    setSelectedJobId(jobId);
    setSelectedId("");
  };

  const handleScheduleSubmit = (form) => {
    const candidate = scheduleTarget;
    if (!candidate) return;

    addInterview({
      candidateName: candidate.candidateName,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
      jobTitle: selectedJob?.title || "Open Role",
      date: form.date,
      time: form.time,
      notes: form.notes,
      status: "Interview Scheduled",
    });
    changeStage(candidate, "interview");
    setScheduleTarget(null);

    const mailto = buildInterviewMailto({ candidate, job: selectedJob, recruiter: userInfo, form });
    if (mailto) window.open(mailto, "_blank");
  };

  const detailActions = {
    onAdvance: advanceStage,
    onShortlist: (c) => changeStage(c, "shortlisted"),
    onReject: (c) => changeStage(c, "rejected"),
    onSchedule: (c) => setScheduleTarget(c),
  };

  const isSplit = viewMode === "split";

  return (
    // In split mode on desktop the page is locked to the viewport (minus the
    // main padding) so only the two panes scroll, never the page itself.
    <div
      className={
        isSplit
          ? "flex flex-col gap-4 lg:h-[calc(100dvh-3rem)] lg:min-h-[640px]"
          : "flex flex-col gap-4"
      }
    >
      <div className="shrink-0 space-y-4">
        <PageHeader
          title="Applicants"
          description="Evaluate candidate applications side-by-side or manage stages in the Kanban pipeline."
        />
        <ApplicantFilters
          jobs={jobs}
          selectedJobId={selectedJobId}
          onJobChange={handleJobChange}
          query={query}
          onQueryChange={setQuery}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          stage={stage}
          onStageChange={setStage}
          stageCounts={stageCounts}
        />
      </div>

      {isSplit ? (
        <div className="bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl overflow-hidden flex flex-col lg:flex-row lg:flex-1 lg:min-h-0">
          {/* Left pane: applicant list */}
          <div className="w-full lg:w-[35%] lg:h-full lg:min-h-0 border-b lg:border-b-0 lg:border-r border-[#E5DED2]">
            <ApplicantList
              applicants={visibleApplicants}
              jobTitle={selectedJob?.title}
              loading={loadingApplicants}
              hasJobs={jobs.length > 0}
              selectedId={activeCandidate?._uid}
              onSelect={selectApplicant}
            />
          </div>

          {/* Right pane: candidate detail (desktop only) */}
          <div className="hidden lg:flex lg:w-[65%] lg:h-full lg:min-h-0 flex-col">
            <ApplicantDetail candidate={activeCandidate} job={selectedJob} actions={detailActions} />
          </div>
        </div>
      ) : (
        <ApplicantPipeline
          applicants={visibleApplicants}
          onInspect={inspectFromPipeline}
          onAdvance={advanceStage}
        />
      )}

      {/* Mobile candidate drawer: the dialog is the single scroll container */}
      <NativeModal
        isOpen={mobileDetailOpen}
        onClose={() => setMobileDetailOpen(false)}
        title={activeCandidate?.candidateName || "Applicant Details"}
        subtitle={selectedJob?.title || "Application Review"}
        maxWidth="max-w-2xl"
      >
        <ApplicantDetail
          candidate={activeCandidate}
          job={selectedJob}
          variant="drawer"
          actions={detailActions}
        />
      </NativeModal>

      <InterviewScheduler
        isOpen={Boolean(scheduleTarget)}
        candidate={scheduleTarget}
        jobTitle={selectedJob?.title}
        onClose={() => setScheduleTarget(null)}
        onSubmit={handleScheduleSubmit}
      />
    </div>
  );
};

export default Applicants;
