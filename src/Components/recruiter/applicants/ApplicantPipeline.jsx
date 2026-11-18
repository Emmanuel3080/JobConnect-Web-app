import React from "react";
import { ChevronRight } from "lucide-react";
import { PipelineStagePill, SkillMatchRing } from "../../PrecisionPrimitives";
import { KANBAN_COLUMNS, matchesKanbanColumn } from "../../../utils/recruiterPipeline";

/**
 * Kanban board view of the applicant pipeline.
 */
const ApplicantPipeline = ({ applicants, onInspect, onAdvance }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-3.5 pb-2">
    {KANBAN_COLUMNS.map((col) => {
      const items = applicants.filter((a) => matchesKanbanColumn(a, col));
      const canAdvance = col.id !== "accepted" && col.id !== "rejected";
      return (
        <section
          key={col.id}
          aria-label={col.label}
          className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl flex flex-col min-w-0 max-h-[560px]"
        >
          <div className="p-3 border-b border-[#E5DED2] bg-[#F4F1EA] flex items-center justify-between shrink-0">
            <PipelineStagePill stage={col.label} size="xs" />
            <span className="font-mono-tabular text-xs font-bold text-[#14243A]">{items.length}</span>
          </div>

          <div className="p-2.5 space-y-2.5 flex-1 min-h-0 scrollable-pane">
            {items.length === 0 ? (
              <div className="py-10 text-center bg-[#F4F1EA] border-2 border-dashed border-[#E5DED2] rounded-lg">
                <p className="text-[11px] text-[#7C8793]">No applicants</p>
              </div>
            ) : (
              items.map((emp) => (
                <div
                  key={emp._uid}
                  className="bg-[#FFFCF6] border border-[#E5DED2] hover:border-[#39AFA0] rounded-lg p-3 space-y-2.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#14243A] truncate">{emp.candidateName}</h4>
                      <p className="text-[11px] text-[#526174] truncate">{emp.email}</p>
                    </div>
                    <SkillMatchRing score={emp.alignmentScore} size={34} strokeWidth={2.8} />
                  </div>

                  <div className="pt-2 border-t border-[#E5DED2] flex items-center justify-between text-[11px]">
                    <button
                      type="button"
                      onClick={() => onInspect(emp._uid)}
                      className="font-semibold text-[#526174] hover:text-[#14243A] cursor-pointer"
                    >
                      Inspect
                    </button>
                    {canAdvance && (
                      <button
                        type="button"
                        onClick={() => onAdvance(emp)}
                        className="font-semibold text-[#39AFA0] hover:underline inline-flex items-center gap-0.5 cursor-pointer"
                      >
                        Advance <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      );
    })}
  </div>
);

export default ApplicantPipeline;
