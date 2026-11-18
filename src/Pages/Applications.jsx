import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Briefcase,
  Download,
  ExternalLink,
  FileText,
  MapPin,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { authContext } from "../Context/AuthContext";
import Header from "../Common/Header";
import Footer from "../Components/Footer";
import {
  ApplicationTimelineStepper,
  EmptyState,
  PipelineStagePill,
} from "../Components/PrecisionPrimitives";

const STATUS_FILTERS = [
  "All",
  "Pending",
  "Shortlisted",
  "Interviewing",
  "Accepted",
  "Rejected",
];

const Applications = () => {
  const { userInfo } = useContext(authContext);
  const baseUrl = import.meta.env.VITE_API_URL;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!userInfo?._id) return;

    const getApplications = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/employee/job/applications/${userInfo._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setApplications(data.applications || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getApplications();
  }, [baseUrl, userInfo?._id]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (
        statusFilter !== "All" &&
        (app.status || "Pending").toLowerCase() !== statusFilter.toLowerCase()
      ) {
        return false;
      }

      const q = searchQuery.trim().toLowerCase();
      if (!q) return true;

      return (
        app.jobId?.title?.toLowerCase().includes(q) ||
        app.jobId?.company?.toLowerCase().includes(q) ||
        app.jobId?.location?.toLowerCase().includes(q)
      );
    });
  }, [applications, statusFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = applications.length;
    const interviewing = applications.filter((a) =>
      ["interview", "interviewing", "shortlisted"].includes(
        a.status?.toLowerCase()
      )
    ).length;
    const accepted = applications.filter((a) =>
      ["accepted", "offer"].includes(a.status?.toLowerCase())
    ).length;
    const upcomingDeadlines = applications.filter((a) => {
      const deadline = a.jobId?.applicationDeadline;
      return deadline && new Date(deadline) > new Date();
    }).length;

    return { total, interviewing, accepted, upcomingDeadlines };
  }, [applications]);

  const handleExportCsv = () => {
    if (applications.length === 0) {
      toast.error("No applications available to export");
      return;
    }
    const rows = [
      ["Position", "Company", "Location", "Salary", "Date Applied", "Status"],
      ...applications.map((app) => [
        app.jobId?.title || "",
        app.jobId?.company || "",
        app.jobId?.location || "",
        app.jobId?.salary || "",
        app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "",
        app.status || "Pending",
      ]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "JobConnect_My_Applications.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported applications to CSV");
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#14243A] flex flex-col">
      <Header />

      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-6">
        {/* Page Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#14243A] tracking-tight">
              Application Tracker
            </h1>
            <p className="text-xs sm:text-sm text-[#526174] mt-0.5">
              Monitor real-time status updates and pipeline stages for every submitted application
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFCF6] border border-[#E5DED2] hover:border-[#39AFA0] text-[#14243A] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Real Data KPI Summary Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FFFCF6] p-5 rounded-xl border border-[#E5DED2]">
            <p className="text-xs font-semibold text-[#526174]">
              Total Applied
            </p>
            <p className="font-mono-tabular text-2xl font-extrabold text-[#14243A] mt-1">
              {stats.total}
            </p>
          </div>

          <div className="bg-[#FFFCF6] p-5 rounded-xl border border-[#E5DED2]">
            <p className="text-xs font-semibold text-[#526174]">
              Shortlisted / Interviewing
            </p>
            <p className="font-mono-tabular text-2xl font-extrabold text-[#39AFA0] mt-1">
              {stats.interviewing}
            </p>
          </div>

          <div className="bg-[#FFFCF6] p-5 rounded-xl border border-[#E5DED2]">
            <p className="text-xs font-semibold text-[#526174]">
              Accepted / Offers
            </p>
            <p className="font-mono-tabular text-2xl font-extrabold text-emerald-700 mt-1">
              {stats.accepted}
            </p>
          </div>

          <div className="bg-[#FFFCF6] p-5 rounded-xl border border-[#E5DED2]">
            <p className="text-xs font-semibold text-[#526174]">
              Active Role Deadlines
            </p>
            <p className="font-mono-tabular text-2xl font-extrabold text-[#D6A875] mt-1">
              {stats.upcomingDeadlines}
            </p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {STATUS_FILTERS.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? "bg-[#14243A] text-[#FFFCF6] border-[#14243A]"
                    : "bg-[#F4F1EA] text-[#526174] border-[#E5DED2] hover:border-[#39AFA0]"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search
              className="w-3.5 h-3.5 text-[#7C8793] absolute left-3 top-1/2 -translate-y-1/2"
              strokeWidth={1.5}
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search applied role or company..."
              className="w-full bg-[#F4F1EA] border border-[#E5DED2] rounded-lg pl-8 pr-3 py-2 text-xs text-[#14243A] placeholder:text-[#7C8793] focus:outline-none focus:border-[#39AFA0]"
            />
          </div>
        </div>

        {/* Applications List with Timeline Steppers */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-36 bg-[#FFFCF6] border border-[#E5DED2] rounded-xl animate-pulse p-6"
              />
            ))}
          </div>
        ) : filteredApplications.length === 0 ? (
          <EmptyState
            icon={Briefcase}
            title="No applications found"
            description={
              applications.length === 0
                ? "You haven't applied to any roles yet. Explore published openings to submit your first application."
                : "No applications match your selected status or search filter."
            }
            action={
              applications.length === 0 ? (
                <Link
                  to="/jobs"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50]"
                >
                  <span>Browse Open Jobs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilter("All");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer"
                >
                  Reset Filters
                </button>
              )
            }
          />
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <article
                key={app._id}
                className="bg-[#FFFCF6] border border-[#E5DED2] hover:border-[#39AFA0] rounded-xl p-5 transition-all space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Role & Company Info */}
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-lg bg-[#14243A] text-[#FFFCF6] flex items-center justify-center font-bold text-xs shrink-0">
                      {(app.jobId?.company || "JC")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Link
                          to={app.jobId?._id ? `/job/${app.jobId._id}` : "/jobs"}
                          className="text-base font-bold text-[#14243A] hover:text-[#39AFA0] transition-colors truncate"
                        >
                          {app.jobId?.title || "Position"}
                        </Link>
                        <PipelineStagePill stage={app.status || "Pending"} size="xs" />
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#526174] mt-1">
                        <span className="font-semibold text-[#14243A]">
                          {app.jobId?.company || "Company"}
                        </span>
                        {app.jobId?.location && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-[#7C8793]" strokeWidth={1.5} />
                            {app.jobId.location}
                          </span>
                        )}
                        <span className="font-mono-tabular font-semibold text-[#14243A]">
                          {app.jobId?.salary || "Competitive"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dates & Resume Action */}
                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <div className="text-left md:text-right font-mono-tabular text-xs">
                      <p className="text-[#14243A] font-semibold">
                        Applied{" "}
                        {app.createdAt
                          ? new Date(app.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "Recently"}
                      </p>
                      {app.jobId?.applicationDeadline && (
                        <p className="text-[11px] text-[#7C8793]">
                          Closes{" "}
                          {new Date(
                            app.jobId.applicationDeadline
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>

                    {app.cvUrl && (
                      <a
                        href={app.cvUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14243A] hover:text-[#39AFA0] border border-[#E5DED2] hover:border-[#39AFA0] px-3 py-2 rounded-lg bg-[#F4F1EA] transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
                        <span>View CV</span>
                        <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
                      </a>
                    )}
                  </div>
                </div>

                {/* 5-Stage Progress Stepper */}
                <div className="pt-3 border-t border-[#E5DED2]">
                  <ApplicationTimelineStepper
                    status={app.status || "Pending"}
                    createdAt={app.createdAt}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Applications;
