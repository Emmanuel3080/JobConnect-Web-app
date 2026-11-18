import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Briefcase, Clock, UserCheck, Users } from "lucide-react";
import { useRecruiterWorkspace } from "../Context/RecruiterWorkspaceContext";
import WelcomeBanner from "../Components/recruiter/dashboard/WelcomeBanner";
import StatCard from "../Components/recruiter/dashboard/StatCard";
import RecentActivity from "../Components/recruiter/dashboard/RecentActivity";
import JobList from "../Components/recruiter/jobs/JobList";

const Overview = () => {
  const navigate = useNavigate();
  const {
    userInfo,
    jobs,
    loadingJobs,
    stats,
    selectedJobId,
    selectedJob,
    setSelectedJobId,
    applicants,
    loadingApplicants,
    talentPool,
    scheduledInterviews,
  } = useRecruiterWorkspace();

  const viewApplicants = (jobId) => {
    setSelectedJobId(jobId);
    navigate("/company/applicants");
  };

  return (
    <div className="space-y-6">
      <WelcomeBanner name={userInfo?.name} jobCount={jobs.length} />

      <section aria-label="Recruitment metrics" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Jobs"
          value={stats.activeJobs}
          hint={`${stats.totalJobs} total listings`}
          icon={Briefcase}
        />
        <StatCard
          label="Total Applicants"
          value={stats.totalApplicants}
          hint="Across all published jobs"
          icon={Users}
        />
        <StatCard
          label="Shortlisted Candidates"
          value={talentPool.length}
          hint="In selected role pipeline"
          icon={UserCheck}
          accent
        />
        <StatCard
          label="Avg. Applicants / Role"
          value={stats.avgApplicantsPerJob}
          hint={`${scheduledInterviews.length} interviews scheduled`}
          icon={Clock}
          iconClassName="text-[#D6A875]"
        />
      </section>

      <RecentActivity
        applicants={applicants}
        jobTitle={selectedJob?.title}
        loading={loadingApplicants}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-[#14243A]">Your job listings</h2>
          {jobs.length > 3 && (
            <Link
              to="/company/jobs"
              className="text-xs font-semibold text-[#39AFA0] hover:underline inline-flex items-center gap-1"
            >
              View all {jobs.length} <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
            </Link>
          )}
        </div>
        <JobList
          jobs={jobs.slice(0, 3)}
          loading={loadingJobs}
          selectedJobId={selectedJobId}
          onViewApplicants={viewApplicants}
        />
      </section>
    </div>
  );
};

export default Overview;
