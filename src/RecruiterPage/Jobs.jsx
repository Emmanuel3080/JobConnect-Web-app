import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useRecruiterWorkspace } from "../Context/RecruiterWorkspaceContext";
import PageHeader from "../Components/shared/PageHeader";
import JobList from "../Components/recruiter/jobs/JobList";
import { primaryButton } from "../utils/recruiterStyles";

const Jobs = () => {
  const navigate = useNavigate();
  const { jobs, loadingJobs, selectedJobId, setSelectedJobId } = useRecruiterWorkspace();

  const viewApplicants = (jobId) => {
    setSelectedJobId(jobId);
    navigate("/company/applicants");
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Job Listings"
        description="Review active and closed job postings and open their applicant queues."
        actions={
          <Link to="/post-job" className={primaryButton}>
            <Plus className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
            <span>Post New Job</span>
          </Link>
        }
      />
      <JobList
        jobs={jobs}
        loading={loadingJobs}
        selectedJobId={selectedJobId}
        onViewApplicants={viewApplicants}
      />
    </div>
  );
};

export default Jobs;
