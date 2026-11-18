import React from "react";
import { useRecruiterWorkspace } from "../Context/RecruiterWorkspaceContext";
import PageHeader from "../Components/shared/PageHeader";
import InterviewList from "../Components/recruiter/interviews/InterviewList";

const Interviews = () => {
  const { scheduledInterviews } = useRecruiterWorkspace();

  return (
    <section className="space-y-4">
      <PageHeader
        title="Scheduled Interviews"
        description="Upcoming candidate interviews booked from the Applicants module."
      />
      <InterviewList interviews={scheduledInterviews} />
    </section>
  );
};

export default Interviews;
