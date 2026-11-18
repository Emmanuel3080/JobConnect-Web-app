import React from "react";
import { FolderOpen } from "lucide-react";
import LoadingState from "../../shared/LoadingState";
import ApplicantCard from "./ApplicantCard";

/**
 * Left pane of the split view. On desktop the list body is the only
 * scrolling region of this pane; on mobile it flows with the page.
 */
const ApplicantList = ({ applicants, jobTitle, loading, hasJobs, selectedId, onSelect }) => (
  <div className="flex flex-col min-h-0 lg:h-full">
    <div className="px-4 py-3 bg-[#F4F1EA] border-b border-[#E5DED2] flex items-center justify-between gap-2 shrink-0">
      <span className="text-xs font-bold uppercase tracking-wider text-[#526174] truncate">
        Applicants {jobTitle ? `— ${jobTitle}` : ""}
      </span>
      <span className="font-mono-tabular text-xs font-semibold text-[#14243A] shrink-0">
        {applicants.length}
      </span>
    </div>

    <div className="lg:flex-1 lg:min-h-0 scrollable-pane-lg">
      {loading ? (
        <LoadingState count={4} className="p-4 space-y-3" itemClassName="h-20 rounded-xl" />
      ) : applicants.length === 0 ? (
        <div className="p-6">
          <div className="bg-[#F4F1EA] border-2 border-dashed border-[#E5DED2] rounded-xl p-8 text-center">
            <FolderOpen className="w-6 h-6 text-[#39AFA0] mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-xs font-bold text-[#14243A]">
              {hasJobs ? "No matching applicants" : "Waiting for applications"}
            </p>
            <p className="text-[11px] text-[#526174] mt-1">
              {hasJobs
                ? "Try another stage or search term, or check back when candidates apply."
                : "Post your first job listing to start receiving applications."}
            </p>
          </div>
        </div>
      ) : (
        <ul className="divide-y divide-[#E5DED2]">
          {applicants.map((a) => (
            <ApplicantCard
              key={a._uid}
              applicant={a}
              isSelected={a._uid === selectedId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default ApplicantList;
