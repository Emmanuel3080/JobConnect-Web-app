import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { EmptyState } from "../../PrecisionPrimitives";
import { primaryButton } from "../../../utils/recruiterStyles";
import InterviewCard from "./InterviewCard";

const InterviewList = ({ interviews }) => {
  if (interviews.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No upcoming interviews scheduled in this session"
        description="Select an applicant in the Applicants module and click 'Schedule Interview' to book a session."
        action={
          <Link to="/company/applicants" className={primaryButton}>
            Go to Applicant Triage
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {interviews.map((item) => (
        <InterviewCard key={item.id} interview={item} />
      ))}
    </div>
  );
};

export default InterviewList;
