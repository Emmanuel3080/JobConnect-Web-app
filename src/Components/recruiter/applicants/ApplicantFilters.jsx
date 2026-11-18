import React from "react";
import { Columns3, Search, SplitSquareVertical } from "lucide-react";
import { STAGE_FILTERS } from "../../../utils/recruiterPipeline";
import { fieldClass } from "../../../utils/recruiterStyles";
import JobSelect from "../jobs/JobSelect";

const VIEW_MODES = [
  { id: "split", label: "Split-Pane Triage", icon: SplitSquareVertical },
  { id: "kanban", label: "Kanban Pipeline", icon: Columns3 },
];

/**
 * Applicant toolbar: job picker, search, sort, view mode and stage pills.
 * Fully controlled; all state lives in the Applicants page.
 */
const ApplicantFilters = ({
  jobs,
  selectedJobId,
  onJobChange,
  query,
  onQueryChange,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
  stage,
  onStageChange,
  stageCounts,
}) => (
  <div className="space-y-3">
    <section className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1 min-w-0">
        <JobSelect
          jobs={jobs}
          value={selectedJobId}
          onChange={onJobChange}
          className="sm:max-w-[260px]"
        />

        <div className="relative flex-1 min-w-0">
          <Search
            className="w-3.5 h-3.5 text-[#7C8793] absolute left-3 top-1/2 -translate-y-1/2"
            strokeWidth={1.5}
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search by name, email, phone, or cover letter..."
            aria-label="Search applicants"
            className={`${fieldClass} w-full pl-8`}
          />
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort applicants"
          className={`${fieldClass} font-semibold cursor-pointer shrink-0`}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div
        role="group"
        aria-label="Applicant view"
        className="inline-flex bg-[#F4F1EA] p-1 rounded-lg border border-[#E5DED2] self-end xl:self-auto shrink-0"
      >
        {VIEW_MODES.map(({ id, label, icon }) => {
          const Icon = icon;
          const active = viewMode === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onViewModeChange(id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                active ? "bg-[#14243A] text-[#FFFCF6]" : "text-[#526174] hover:text-[#14243A]"
              }`}
            >
              <Icon className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </section>

    <div className="flex items-center gap-1.5 overflow-x-auto pb-1" role="group" aria-label="Filter by stage">
      {STAGE_FILTERS.map((st) => {
        const active = stage === st;
        return (
          <button
            key={st}
            type="button"
            onClick={() => onStageChange(st)}
            aria-pressed={active}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-colors shrink-0 cursor-pointer ${
              active
                ? "bg-[#14243A] text-[#FFFCF6] border-[#14243A]"
                : "bg-[#FFFCF6] text-[#526174] border-[#E5DED2] hover:border-[#39AFA0]"
            }`}
          >
            <span>{st === "All" ? "All Stages" : st}</span>
            <span
              className={`font-mono-tabular text-[11px] px-1.5 rounded ${
                active ? "bg-white/20 text-[#FFFCF6]" : "bg-[#F4F1EA] text-[#526174]"
              }`}
            >
              {stageCounts[st] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

export default ApplicantFilters;
