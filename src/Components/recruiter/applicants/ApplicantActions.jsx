import React from "react";
import { ArrowRight, Calendar, CheckCircle2, Download, XCircle } from "lucide-react";
import { PipelineStagePill } from "../../PrecisionPrimitives";

const pill =
  "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer";

/**
 * Stationary action bar at the top of the candidate detail pane.
 */
const ApplicantActions = ({ candidate, onAdvance, onShortlist, onSchedule, onReject }) => (
  <div className="shrink-0 bg-[#FFFCF6] border-b border-[#E5DED2] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold text-[#526174]">Status:</span>
      <PipelineStagePill stage={candidate.effectiveStatus} />
    </div>

    <div className="flex items-center gap-2 flex-wrap">
      <button
        type="button"
        onClick={() => onAdvance(candidate)}
        className={`${pill} px-3.5 bg-[#14243A] text-[#FFFCF6] border-[#14243A] hover:bg-[#213B50]`}
      >
        <span>Advance Stage</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => onShortlist(candidate)}
        className={`${pill} bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100`}
      >
        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>Shortlist</span>
      </button>
      <button
        type="button"
        onClick={() => onSchedule(candidate)}
        className={`${pill} bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100`}
      >
        <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>Schedule Interview</span>
      </button>
      <button
        type="button"
        onClick={() => onReject(candidate)}
        className={`${pill} bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100`}
      >
        <XCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
        <span>Reject</span>
      </button>
      {candidate.cvUrl && (
        <a
          href={candidate.cvUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${pill} bg-[#F4F1EA] text-[#14243A] border-[#E5DED2] hover:border-[#39AFA0]`}
        >
          <Download className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
          <span>Download Resume</span>
        </a>
      )}
    </div>
  </div>
);

export default ApplicantActions;
