import React from "react";
import { fieldClass } from "../../../utils/recruiterStyles";

/**
 * Job picker shared by the Applicants and Talent Pool modules.
 */
const JobSelect = ({ jobs, value, onChange, showCounts = true, className = "" }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-label="Select job opening"
    disabled={jobs.length === 0}
    className={`${fieldClass} font-semibold cursor-pointer truncate ${className}`}
  >
    {jobs.length === 0 ? (
      <option value="">No jobs posted yet</option>
    ) : (
      jobs.map((j) => (
        <option key={j._id} value={j._id}>
          {j.title}
          {showCounts ? ` (${j.No_of_Applicant || 0} applicants)` : ""}
        </option>
      ))
    )}
  </select>
);

export default JobSelect;
