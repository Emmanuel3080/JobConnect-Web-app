import { useContext, useEffect, useState } from "react";
import { jobContext } from "../Context/JobContext";

// Loads applicants for a job through the existing JobContext API call.
const useJobApplicants = (jobId) => {
  const { getApplicationsJob, applicants } = useContext(jobContext);
  const [loadingApplicants, setLoadingApplicants] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    let active = true;

    const load = async () => {
      setLoadingApplicants(true);
      try {
        await getApplicationsJob(jobId);
      } finally {
        if (active) setLoadingApplicants(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [jobId, getApplicationsJob]);

  return {
    applicants: Array.isArray(applicants) ? applicants : [],
    loadingApplicants,
  };
};

export default useJobApplicants;
