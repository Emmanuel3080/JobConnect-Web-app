import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Plus } from "lucide-react";
import { EmptyState } from "../../PrecisionPrimitives";
import LoadingState from "../../shared/LoadingState";
import { primaryButton } from "../../../utils/recruiterStyles";
import JobCard from "./JobCard";

const GRID = "grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

const JobList = ({ jobs, loading, selectedJobId, onViewApplicants }) => {
  if (loading) {
    return <LoadingState count={3} className={GRID} itemClassName="h-52 rounded-xl" />;
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No Jobs Posted Yet"
        description="Start by creating your first job opening to attract candidates."
        action={
          <Link to="/post-job" className={primaryButton}>
            <Plus className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.75} />
            <span>Create First Listing</span>
          </Link>
        }
      />
    );
  }

  return (
    <div className={GRID}>
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          isSelected={job._id === selectedJobId}
          onViewApplicants={onViewApplicants}
        />
      ))}
    </div>
  );
};

export default JobList;
