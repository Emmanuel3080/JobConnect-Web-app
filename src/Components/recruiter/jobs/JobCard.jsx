import React from "react";
import { MapPin, Users } from "lucide-react";
import { PipelineStagePill } from "../../PrecisionPrimitives";
import { formatDate } from "../../../utils/recruiterPipeline";

const JobCard = ({ job, isSelected, onViewApplicants }) => (
  <article
    className={`bg-[#FFFCF6] p-5 rounded-xl border transition-all flex flex-col justify-between ${
      isSelected
        ? "border-[#39AFA0] ring-1 ring-[#39AFA0]/30"
        : "border-[#E5DED2] hover:border-[#39AFA0]"
    }`}
  >
    <div>
      <div className="flex justify-between items-start gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-[#14243A] truncate" title={job.title}>
            {job.title}
          </h3>
          <p className="text-[#39AFA0] text-xs font-semibold mt-0.5">
            {job.jobType || "Full-time"} · {job.salary || "Competitive"}
          </p>
        </div>
        <PipelineStagePill stage={job.isActive ? "Active" : "Closed"} size="xs" />
      </div>

      <dl className="grid grid-cols-2 gap-3 my-4">
        <div className="bg-[#F4F1EA] p-3 rounded-lg border border-[#E5DED2]">
          <dt className="text-[10px] font-bold text-[#7C8793] uppercase tracking-wider">
            Applicants
          </dt>
          <dd className="font-mono-tabular text-sm font-bold text-[#14243A] mt-0.5">
            {job.No_of_Applicant || 0}
          </dd>
        </div>
        <div className="bg-[#F4F1EA] p-3 rounded-lg border border-[#E5DED2]">
          <dt className="text-[10px] font-bold text-[#7C8793] uppercase tracking-wider">
            Deadline
          </dt>
          <dd className="font-mono-tabular text-sm font-bold text-[#14243A] mt-0.5">
            {formatDate(job.applicationDeadline, { day: "numeric", month: "short" }, "en-GB") ||
              "Open"}
          </dd>
        </div>
      </dl>

      <div className="flex items-center gap-1.5 text-[#526174] text-xs">
        <MapPin className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
        <span>{job.remote ? "Remote" : job.location}</span>
      </div>
    </div>

    <div className="mt-5 pt-4 border-t border-[#E5DED2]">
      <button
        type="button"
        onClick={() => onViewApplicants(job._id)}
        className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer border ${
          isSelected
            ? "bg-[#14243A] text-[#FFFCF6] border-[#14243A]"
            : "bg-[#F4F1EA] text-[#14243A] border-[#E5DED2] hover:bg-[#14243A] hover:text-[#FFFCF6]"
        }`}
      >
        <Users className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
        <span>{isSelected ? "Manage Applicants" : "View Applicants"}</span>
      </button>
    </div>
  </article>
);

export default JobCard;
