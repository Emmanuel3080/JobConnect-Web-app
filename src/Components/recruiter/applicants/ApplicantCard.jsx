import React from "react";
import { ChevronRight } from "lucide-react";
import { PipelineStagePill, SkillMatchRing } from "../../PrecisionPrimitives";
import { formatDate, getInitials } from "../../../utils/recruiterPipeline";

const ApplicantCard = ({ applicant, isSelected, onSelect }) => (
  <li>
    <button
      type="button"
      onClick={() => onSelect(applicant._uid)}
      aria-current={isSelected ? "true" : undefined}
      className={`w-full text-left p-4 transition-colors cursor-pointer flex items-start justify-between gap-3 border-l-2 focus:outline-none focus-visible:bg-[#F4F1EA] ${
        isSelected
          ? "bg-[#39AFA0]/15 border-l-[#39AFA0]"
          : "bg-[#FFFCF6] hover:bg-[#F4F1EA] border-l-transparent"
      }`}
    >
      <span className="flex items-start gap-3 min-w-0 flex-1">
        <span className="w-10 h-10 rounded-lg bg-[#14243A] text-[#FFFCF6] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          {getInitials(applicant.candidateName)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-[#14243A] truncate">
            {applicant.candidateName || "Candidate"}
          </span>
          <span className="block text-xs text-[#526174] truncate mt-0.5">{applicant.email}</span>
          <span className="mt-2 flex items-center gap-2 flex-wrap">
            <PipelineStagePill stage={applicant.effectiveStatus} size="xs" />
            {applicant.createdAt && (
              <span className="font-mono-tabular text-[11px] text-[#7C8793]">
                {formatDate(applicant.createdAt, { month: "short", day: "numeric" })}
              </span>
            )}
          </span>
        </span>
      </span>

      <span className="flex flex-col items-end gap-1 shrink-0 pl-1">
        <SkillMatchRing score={applicant.alignmentScore} size={40} strokeWidth={3} />
        <span className="text-[10px] font-medium text-[#39AFA0] lg:hidden inline-flex items-center gap-0.5">
          View <ChevronRight className="w-3 h-3" />
        </span>
      </span>
    </button>
  </li>
);

export default ApplicantCard;
