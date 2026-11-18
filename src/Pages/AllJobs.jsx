import React, { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bookmark,
  Briefcase,
  MapPin,
  Search,
  X,
} from "lucide-react";
import { jobContext } from "../Context/JobContext";
import JobCard from "../Components/JobCard";
import Header from "../Common/Header";
import Footer from "../Components/Footer";
import { EmptyState, JobCardSkeleton } from "../Components/PrecisionPrimitives";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Internship"];
const WORK_MODES = ["All", "Remote", "On-site"];

const AllJobs = () => {
  const { fetchJobs, jobs, loadingJobs } = useContext(jobContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [workMode, setWorkMode] = useState("All");
  const [jobType, setJobType] = useState("All");
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem("jc_saved_jobs") || "[]");
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  });

  const onlySaved = location.search.includes("saved=true");

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    const syncSaved = () => {
      try {
        const list = JSON.parse(localStorage.getItem("jc_saved_jobs") || "[]");
        setSavedIds(Array.isArray(list) ? list : []);
      } catch {
        setSavedIds([]);
      }
    };
    window.addEventListener("jc-saved-jobs-updated", syncSaved);
    return () => window.removeEventListener("jc-saved-jobs-updated", syncSaved);
  }, []);

  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];

    return jobs.filter((job) => {
      const jobId = job?._id || job?.id;
      if (onlySaved && !savedIds.includes(jobId)) return false;

      const q = search.trim().toLowerCase();
      if (q) {
        const matchesKeyword =
          job?.title?.toLowerCase().includes(q) ||
          job?.company?.toLowerCase().includes(q) ||
          job?.category?.toLowerCase().includes(q) ||
          job?.skills?.some((s) => String(s).toLowerCase().includes(q));
        if (!matchesKeyword) return false;
      }

      const loc = locationQuery.trim().toLowerCase();
      if (loc && !job?.location?.toLowerCase().includes(loc)) return false;

      if (workMode === "Remote" && !job?.remote) return false;
      if (workMode === "On-site" && job?.remote) return false;

      if (
        jobType !== "All" &&
        job?.jobType?.toLowerCase() !== jobType.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }, [jobs, onlySaved, savedIds, search, locationQuery, workMode, jobType]);

  const toggleSavedFilter = () => {
    const next = !onlySaved;
    navigate(next ? "/jobs?saved=true" : "/jobs", { replace: true });
  };

  const resetAllFilters = () => {
    setSearch("");
    setLocationQuery("");
    setWorkMode("All");
    setJobType("All");
    navigate("/jobs", { replace: true });
  };

  return (
    <div className="bg-[#F4F1EA] min-h-screen flex flex-col text-[#14243A]">
      <Header />

      <div className="bg-[#FFFCF6] border-b border-[#E5DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-[#14243A] tracking-tight">
                {onlySaved ? "Saved Jobs" : "Published Job Postings"}
              </h1>
              <p className="text-xs sm:text-sm text-[#526174] mt-0.5">
                {onlySaved
                  ? "Your bookmarked opportunities ready for application"
                  : "Discover and apply to verified opportunities across all categories"}
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <button
                type="button"
                onClick={toggleSavedFilter}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  onlySaved
                    ? "bg-[#39AFA0]/15 text-[#14243A] border-[#39AFA0]"
                    : "bg-[#F4F1EA] text-[#526174] border-[#E5DED2] hover:border-[#39AFA0]"
                }`}
              >
                <Bookmark
                  className="w-3.5 h-3.5 text-[#39AFA0]"
                  strokeWidth={1.5}
                  fill={onlySaved ? "#39AFA0" : "none"}
                />
                <span>Saved Jobs</span>
                <span className="font-mono-tabular">({savedIds.length})</span>
              </button>

              <div className="bg-[#F4F1EA] px-4 py-2 rounded-xl border border-[#E5DED2] flex items-center gap-2">
                <span className="text-[#7C8793] text-xs font-semibold uppercase tracking-wider">
                  Showing
                </span>
                <span className="font-mono-tabular text-[#39AFA0] font-extrabold text-sm">
                  {filteredJobs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Search & Filters Card */}
          <div className="bg-[#F4F1EA] border border-[#E5DED2] rounded-xl p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6 relative">
                <Search
                  className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                  strokeWidth={1.5}
                />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by job title, company, or skill..."
                  className="w-full bg-[#FFFCF6] border border-[#E5DED2] focus:border-[#39AFA0] rounded-lg pl-10 pr-8 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] focus:outline-none transition-colors"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8793] hover:text-[#14243A]"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                )}
              </div>

              <div className="md:col-span-4 relative">
                <MapPin
                  className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                  strokeWidth={1.5}
                />
                <input
                  type="search"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  placeholder="Location..."
                  className="w-full bg-[#FFFCF6] border border-[#E5DED2] focus:border-[#39AFA0] rounded-lg pl-10 pr-3 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] focus:outline-none transition-colors"
                />
              </div>

              <div className="md:col-span-2 flex bg-[#FFFCF6] p-1 rounded-lg border border-[#E5DED2]">
                {WORK_MODES.map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setWorkMode(mode)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                      workMode === mode
                        ? "bg-[#14243A] text-[#FFFCF6] shadow-2xs"
                        : "text-[#526174] hover:text-[#14243A]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-semibold text-[#7C8793] mr-1">
                  Employment Type:
                </span>
                {JOB_TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setJobType(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      jobType === t
                        ? "bg-[#14243A] text-[#FFFCF6] border-[#14243A]"
                        : "bg-[#FFFCF6] text-[#526174] border-[#E5DED2] hover:border-[#39AFA0]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {(search ||
                locationQuery ||
                workMode !== "All" ||
                jobType !== "All" ||
                onlySaved) && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-[#39AFA0] hover:underline cursor-pointer"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {loadingJobs ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <JobCardSkeleton key={n} />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredJobs.map((job) => (
              <div key={job._id || job.id} className="h-full">
                <JobCard
                  title={job?.title}
                  salary={job?.salary}
                  location={job?.location}
                  company={job?.company}
                  jobType={job?.jobType}
                  remote={job?.remote}
                  skills={job?.skills}
                  category={job?.category}
                  datePosted={job?.datePosted}
                  No_of_Applicant={job?.No_of_Applicant}
                  id={job?._id}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Briefcase}
            title={onlySaved ? "No saved jobs yet" : "No jobs available"}
            description={
              onlySaved
                ? "Bookmark any job card while browsing to save it here for quick access."
                : "No job postings match your current criteria."
            }
            action={
              onlySaved ||
              search ||
              locationQuery ||
              workMode !== "All" ||
              jobType !== "All" ? (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer"
                >
                  View All Jobs
                </button>
              ) : null
            }
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AllJobs;
