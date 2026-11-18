import React from "react";
import { Calendar, Clock } from "lucide-react";
import { PipelineStagePill } from "../../PrecisionPrimitives";

const InterviewCard = ({ interview }) => (
  <article className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl p-5 space-y-3">
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <h3 className="text-sm font-bold text-[#14243A] truncate">{interview.candidateName}</h3>
        <p className="text-xs text-[#526174] truncate">Role: {interview.jobTitle}</p>
      </div>
      <PipelineStagePill stage={interview.status} size="xs" />
    </div>
    <div className="bg-[#F4F1EA] border border-[#E5DED2] rounded-lg p-3 flex items-center justify-between gap-3 font-mono-tabular text-xs text-[#14243A]">
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
        {interview.date}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
        {interview.time}
      </span>
    </div>
    {interview.notes && <p className="text-xs text-[#526174]">{interview.notes}</p>}
  </article>
);

export default InterviewCard;
