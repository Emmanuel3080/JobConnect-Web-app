/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { toast } from "sonner";
import { recruiterAuthContext } from "./RecruiterContext";
import useRecruiterJobs from "../hooks/useRecruiterJobs";
import useJobApplicants from "../hooks/useJobApplicants";
import { getNextStage, isTalentPoolStage, normalizeApplicant } from "../utils/recruiterPipeline";

// Cross-module recruiter state. Lives in RecruiterLayout so that the selected
// job, in-session stage changes and scheduled interviews survive navigation
// between Overview, Jobs, Applicants, Talent Pool, Interviews and Settings.
const RecruiterWorkspaceContext = createContext(null);

export const RecruiterWorkspaceProvider = ({ children }) => {
  const { userInfo } = useContext(recruiterAuthContext);
  const { jobs, loadingJobs } = useRecruiterJobs(userInfo?._id);

  const [pickedJobId, setSelectedJobId] = useState("");
  // Fall back to the first job until the recruiter picks one explicitly.
  const selectedJobId =
    pickedJobId && jobs.some((j) => j._id === pickedJobId) ? pickedJobId : jobs[0]?._id || "";
  const selectedJob = useMemo(
    () => jobs.find((j) => j._id === selectedJobId) || null,
    [jobs, selectedJobId]
  );

  const { applicants: rawApplicants, loadingApplicants } = useJobApplicants(selectedJobId);

  const [stageOverrides, setStageOverrides] = useState({});
  const [scheduledInterviews, setScheduledInterviews] = useState([]);

  const applicants = useMemo(
    () => rawApplicants.map((emp, i) => normalizeApplicant(emp, i, stageOverrides)),
    [rawApplicants, stageOverrides]
  );

  const talentPool = useMemo(
    () => applicants.filter((a) => isTalentPoolStage(a.effectiveStatus)),
    [applicants]
  );

  const stats = useMemo(() => {
    const totalApplicants = jobs.reduce((acc, job) => acc + (job.No_of_Applicant || 0), 0);
    return {
      totalJobs: jobs.length,
      activeJobs: jobs.filter((j) => j.isActive).length,
      totalApplicants,
      avgApplicantsPerJob: jobs.length ? (totalApplicants / jobs.length).toFixed(1) : "0",
    };
  }, [jobs]);

  const changeStage = useCallback((candidate, newStatus) => {
    if (!candidate) return;
    setStageOverrides((prev) => ({ ...prev, [candidate._uid]: newStatus }));
    toast.success(`Updated ${candidate.candidateName || "candidate"} status to "${newStatus}"`);
  }, []);

  const advanceStage = useCallback(
    (candidate) => {
      if (!candidate) return;
      changeStage(candidate, getNextStage(candidate.effectiveStatus));
    },
    [changeStage]
  );

  const addInterview = useCallback((interview) => {
    setScheduledInterviews((prev) => [{ id: `int-${Date.now()}`, ...interview }, ...prev]);
  }, []);

  const value = {
    userInfo,
    jobs,
    loadingJobs,
    selectedJobId,
    selectedJob,
    setSelectedJobId,
    applicants,
    loadingApplicants,
    talentPool,
    stats,
    changeStage,
    advanceStage,
    scheduledInterviews,
    addInterview,
  };

  return (
    <RecruiterWorkspaceContext.Provider value={value}>
      {children}
    </RecruiterWorkspaceContext.Provider>
  );
};

export const useRecruiterWorkspace = () => {
  const ctx = useContext(RecruiterWorkspaceContext);
  if (!ctx) {
    throw new Error("useRecruiterWorkspace must be used inside RecruiterWorkspaceProvider");
  }
  return ctx;
};
