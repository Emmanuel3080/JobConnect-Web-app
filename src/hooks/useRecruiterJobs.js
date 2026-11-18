import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchRecruiterJobs } from "../services/recruiterApi";

// Loads the signed-in recruiter's published jobs once per recruiter id.
const useRecruiterJobs = (recruiterId) => {
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    if (!recruiterId) return;
    let active = true;

    const load = async () => {
      setLoadingJobs(true);
      try {
        const list = await fetchRecruiterJobs(recruiterId);
        if (active) setJobs(list);
      } catch (error) {
        console.log(error);
        if (active) toast.error(error.isApiError ? error.message : "Something went wrong");
      } finally {
        if (active) setLoadingJobs(false);
      }
    };

    load();
    return () => {
      active = false;
    };
  }, [recruiterId]);

  return { jobs, loadingJobs };
};

export default useRecruiterJobs;
