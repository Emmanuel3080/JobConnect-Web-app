import React from "react";
import { BadgeCheck, Briefcase, Clock, Globe, MapPin } from "lucide-react";

const formatDate = (value, fallback) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : fallback;

const JobHeader = ({
  title,
  companyName,
  category,
  location,
  jobType,
  remote,
  datePosted,
}) => (
  <header className="bg-[#F4F1EA] border-b border-[#E5DED2]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      {/* Company line */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A]">
          {companyName}
          <BadgeCheck
            className="w-4 h-4 text-[#39AFA0] shrink-0"
            strokeWidth={1.75}
            aria-label="Verified company"
          />
        </span>
        {category && (
          <span className="bg-[#FFFCF6] border border-[#E5DED2] text-[#526174] text-xs font-medium px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Title */}
      <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-[#14243A] tracking-tight leading-[1.05] max-w-4xl text-balance">
        {title || "Loading position..."}
      </h1>

      {/* Details as pills; remote work is tinted so it stands out */}
      <ul className="mt-6 flex flex-wrap items-center gap-2.5">
        <li className="inline-flex items-center gap-2 bg-[#FFFCF6] border border-[#E5DED2] text-[#14243A] text-sm font-medium px-4 py-2 rounded-full">
          <MapPin className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
          {location || "Location not specified"}
        </li>
        <li className="inline-flex items-center gap-2 bg-[#FFFCF6] border border-[#E5DED2] text-[#14243A] text-sm font-medium px-4 py-2 rounded-full">
          <Briefcase className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
          {jobType || "Full-time"}
        </li>
        <li
          className={`inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border ${
            remote
              ? "bg-[#39AFA0]/15 border-[#39AFA0]/50 text-[#14243A]"
              : "bg-[#FFFCF6] border-[#E5DED2] text-[#14243A]"
          }`}
        >
          <Globe className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
          {remote ? "Remote" : "On-site"}
        </li>
      </ul>

      <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#7C8793]">
        <Clock className="w-4 h-4" strokeWidth={1.75} />
        Posted {formatDate(datePosted, "recently")}
      </p>
    </div>
  </header>
);

export default JobHeader;