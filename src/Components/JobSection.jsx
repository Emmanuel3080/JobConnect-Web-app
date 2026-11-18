import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  MapPin,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { jobContext } from "../Context/JobContext";
import { authContext } from "../Context/AuthContext";
import JobCard from "./JobCard";
import {
  EmptyState,
  JobCardSkeleton,
  computeSkillMatch,
} from "./PrecisionPrimitives";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["All", "Remote", "On-site"];
const PAGE_SIZE = 6;

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF6]";

const JobSection = () => {
  const { jobs, fetchJobs, loadingJobs } = useContext(jobContext);
  const { userInfo } = useContext(authContext) || {};

  const [keyword, setKeyword] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [workMode, setWorkMode] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [onlyRecommended, setOnlyRecommended] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const userSkills = userInfo?.Skills;

  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];

    return jobs.filter((job) => {
      const q = keyword.trim().toLowerCase();
      if (q) {
        const matchesKeyword =
          job.title?.toLowerCase().includes(q) ||
          job.company?.toLowerCase().includes(q) ||
          job.category?.toLowerCase().includes(q) ||
          job.skills?.some((s) => String(s).toLowerCase().includes(q));
        if (!matchesKeyword) return false;
      }

      const loc = locationQuery.trim().toLowerCase();
      if (loc && !job.location?.toLowerCase().includes(loc)) return false;

      if (workMode === "Remote" && !job.remote) return false;
      if (workMode === "On-site" && job.remote) return false;

      if (
        jobType !== "All" &&
        job.jobType?.toLowerCase() !== jobType.toLowerCase()
      ) {
        return false;
      }

      if (onlyRecommended && userSkills) {
        const score = computeSkillMatch(userSkills, job.skills);
        if (score !== null && score === 0) return false;
      }

      return true;
    });
  }, [jobs, keyword, locationQuery, workMode, jobType, onlyRecommended, userSkills]);

  const hasActiveFilters =
    keyword ||
    locationQuery ||
    workMode !== "All" ||
    jobType !== "All" ||
    onlyRecommended;

  const resetFilters = () => {
    setKeyword("");
    setLocationQuery("");
    setWorkMode("All");
    setJobType("All");
    setOnlyRecommended(false);
  };

  // Removable chips that show what is currently narrowing the list
  const activeChips = [
    keyword && { label: `“${keyword}”`, clear: () => setKeyword("") },
    locationQuery && { label: locationQuery, clear: () => setLocationQuery("") },
    workMode !== "All" && { label: workMode, clear: () => setWorkMode("All") },
    jobType !== "All" && { label: jobType, clear: () => setJobType("All") },
    onlyRecommended && {
      label: "Matches my skills",
      clear: () => setOnlyRecommended(false),
    },
  ].filter(Boolean);

  const shown = Math.min(filteredJobs.length, PAGE_SIZE);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Heading + link to full list */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14243A] tracking-tight">
            Open jobs
          </h2>
          <p className="mt-1 text-sm text-[#526174]">
            Showing{" "}
            <span className="font-semibold text-[#14243A] tabular-nums">
              {shown}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#14243A] tabular-nums">
              {filteredJobs.length}
            </span>{" "}
            matching jobs
          </p>
        </div>

        <Link
          to="/jobs"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#14243A] hover:bg-[#213B50] text-[#FFFCF6] transition-colors ${focusRing}`}
        >
          View all jobs
          <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
        </Link>
      </div>

      {/* Search bar: one connected control */}
      <div className="bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl shadow-sm shadow-[#14243A]/5 grid grid-cols-1 md:grid-cols-[1.4fr_1fr_auto] divide-y md:divide-y-0 md:divide-x divide-[#E5DED2]">
        <label className="relative flex items-center">
          <span className="sr-only">Search by job title, company, or skill</span>
          <Search
            className="w-4 h-4 text-[#7C8793] absolute left-5"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, company, or skill"
            className="w-full bg-transparent rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none pl-12 pr-10 py-4 text-sm text-[#14243A] placeholder:text-[#7C8793] focus:outline-none focus:bg-[#F4F1EA]/60"
          />
          {keyword && (
            <button
              type="button"
              onClick={() => setKeyword("")}
              aria-label="Clear search"
              className="absolute right-4 text-[#7C8793] hover:text-[#14243A]"
            >
              <X className="w-4 h-4" strokeWidth={1.75} />
            </button>
          )}
        </label>

        <label className="relative flex items-center">
          <span className="sr-only">Filter by city or location</span>
          <MapPin
            className="w-4 h-4 text-[#7C8793] absolute left-5"
            strokeWidth={1.75}
          />
          <input
            type="search"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="City or location"
            className="w-full bg-transparent pl-12 pr-4 py-4 text-sm text-[#14243A] placeholder:text-[#7C8793] focus:outline-none focus:bg-[#F4F1EA]/60"
          />
        </label>

        {/* Work mode */}
        <div
          role="group"
          aria-label="Work arrangement"
          className="flex items-center gap-1 p-2"
        >
          {WORK_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setWorkMode(mode)}
              aria-pressed={workMode === mode}
              className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${focusRing} ${
                workMode === mode
                  ? "bg-[#14243A] text-[#FFFCF6]"
                  : "text-[#526174] hover:bg-[#F4F1EA] hover:text-[#14243A]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Job type row: scrolls sideways on small screens */}
      <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {JOB_TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setJobType(type)}
            aria-pressed={jobType === type}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${focusRing} ${
              jobType === type
                ? "bg-[#14243A] text-[#FFFCF6] border-[#14243A]"
                : "bg-[#FFFCF6] text-[#526174] border-[#E5DED2] hover:border-[#39AFA0] hover:text-[#14243A]"
            }`}
          >
            {type}
          </button>
        ))}

        {userInfo?.Skills && (
          <>
            <span aria-hidden="true" className="shrink-0 w-px h-5 bg-[#E5DED2] mx-1" />
            <button
              type="button"
              onClick={() => setOnlyRecommended((prev) => !prev)}
              aria-pressed={onlyRecommended}
              className={`shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${focusRing} ${
                onlyRecommended
                  ? "bg-[#39AFA0]/15 text-[#14243A] border-[#39AFA0]"
                  : "bg-[#FFFCF6] text-[#526174] border-[#E5DED2] hover:border-[#39AFA0] hover:text-[#14243A]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.75} />
              Matches my skills
            </button>
          </>
        )}
      </div>

      {/* Active filters */}
      {activeChips.length > 0 && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#7C8793]">Filtered by</span>
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={chip.clear}
              aria-label={`Remove filter ${chip.label}`}
              className={`inline-flex items-center gap-1 bg-[#F4F1EA] border border-[#E5DED2] text-[#14243A] rounded-full text-xs font-medium pl-3 pr-2 py-1 hover:border-[#39AFA0] cursor-pointer ${focusRing}`}
            >
              {chip.label}
              <X className="w-3 h-3 text-[#7C8793]" strokeWidth={2} />
            </button>
          ))}
          <button
            type="button"
            onClick={resetFilters}
            className={`text-xs font-semibold text-[#14243A] underline underline-offset-2 decoration-[#39AFA0] cursor-pointer ml-1 ${focusRing}`}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Results */}
      <div className="mt-8">
        {loadingJobs ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <JobCardSkeleton key={n} />
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title={
              Array.isArray(jobs) && jobs.length > 0
                ? "No jobs match these filters"
                : "No jobs published yet"
            }
            description={
              Array.isArray(jobs) && jobs.length > 0
                ? "Try a broader keyword, a different location, or another job type."
                : "Verified jobs will show up here as soon as employers publish them."
            }
            action={
              hasActiveFilters ? (
                <button
                  type="button"
                  onClick={resetFilters}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer ${focusRing}`}
                >
                  Clear filters
                </button>
              ) : null
            }
          />
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.slice(0, PAGE_SIZE).map((job) => (
                <JobCard
                  key={job?._id}
                  title={job?.title}
                  company={job?.company}
                  location={job?.location}
                  salary={job?.salary}
                  jobType={job?.jobType}
                  remote={job?.remote}
                  skills={job?.skills}
                  category={job?.category}
                  datePosted={job?.datePosted}
                  No_of_Applicant={job?.No_of_Applicant}
                  id={job?._id}
                />
              ))}
            </div>

            {filteredJobs.length > PAGE_SIZE && (
              <div className="mt-8 flex justify-center">
                <Link
                  to="/jobs"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#14243A] border border-[#14243A]/20 hover:border-[#39AFA0] hover:bg-[#F4F1EA] transition-colors ${focusRing}`}
                >
                  See {filteredJobs.length - PAGE_SIZE} more jobs
                  <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default JobSection;