/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { CheckCircle2, FolderOpen } from "lucide-react";

/**
 * Circular SVG Skill Match Score Ring (#39AFA0 Teal Accent + tabular-nums)
 */
export const SkillMatchRing = ({ score, size = 42, strokeWidth = 3 }) => {
  if (score === undefined || score === null) return null;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, Number(score) || 0));
  const offset = circumference - (clampedScore / 100) * circumference;

  const ringColor = clampedScore >= 75 ? "#39AFA0" : "#D6A875";

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      title={`${clampedScore}% Skill Match`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 block"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5DED2"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span className="font-mono-tabular text-[11px] font-semibold text-[#14243A] tracking-tight">
        {clampedScore}%
      </span>
    </div>
  );
};

/**
 * Computes skill alignment percentage between candidate skills string/array and job skills array
 */
export const computeSkillMatch = (candidateSkills, jobSkills) => {
  if (!Array.isArray(jobSkills) || jobSkills.length === 0) return null;
  if (!candidateSkills) return null;

  const candTokens = (
    Array.isArray(candidateSkills)
      ? candidateSkills
      : String(candidateSkills).split(/[,;/|]+/)
  )
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (candTokens.length === 0) return null;

  const jobTokens = jobSkills
    .map((s) => String(s).trim().toLowerCase())
    .filter(Boolean);

  let matched = 0;
  jobTokens.forEach((jt) => {
    if (candTokens.some((ct) => jt.includes(ct) || ct.includes(jt))) {
      matched += 1;
    }
  });

  return Math.round((matched / jobTokens.length) * 100);
};

/**
 * Soft Semantic Status Pill
 * - Shortlisted / Offer / Accepted / Active: Emerald
 * - In Review / Screening / Pending: Amber
 * - Interview Scheduled: Violet
 * - New / Applied: Teal
 * - Rejected / Closed: Rose
 */
export const PipelineStagePill = ({ stage = "Pending", size = "sm" }) => {
  const normalized = String(stage || "Pending").toLowerCase();

  let colorClasses = "bg-[#39AFA0]/15 text-[#14243A] border-[#39AFA0]/40";
  let dotClasses = "bg-[#39AFA0]";

  if (
    normalized.includes("shortlist") ||
    normalized.includes("offer") ||
    normalized.includes("accept") ||
    normalized.includes("active")
  ) {
    colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-200";
    dotClasses = "bg-emerald-600";
  } else if (
    normalized.includes("interview") ||
    normalized.includes("scheduled")
  ) {
    colorClasses = "bg-violet-50 text-violet-800 border-violet-200";
    dotClasses = "bg-violet-600";
  } else if (
    normalized.includes("review") ||
    normalized.includes("screen") ||
    normalized.includes("viewed") ||
    normalized.includes("pending")
  ) {
    colorClasses = "bg-amber-50 text-amber-800 border-amber-200";
    dotClasses = "bg-amber-500";
  } else if (
    normalized.includes("reject") ||
    normalized.includes("archive") ||
    normalized.includes("closed")
  ) {
    colorClasses = "bg-rose-50 text-rose-800 border-rose-200";
    dotClasses = "bg-rose-500";
  }

  const paddingClasses =
    size === "xs"
      ? "px-2 py-0.5 text-[11px]"
      : "px-2.5 py-0.5 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border capitalize ${colorClasses} ${paddingClasses} shrink-0`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClasses}`} />
      {stage || "Pending"}
    </span>
  );
};

/**
 * Application Progress Timeline Stepper (Applied -> Profile Viewed -> Shortlisted -> Interview -> Offer)
 */
export const ApplicationTimelineStepper = ({ status = "pending", createdAt }) => {
  const stages = [
    { key: "applied", label: "Applied" },
    { key: "viewed", label: "Profile Viewed" },
    { key: "shortlisted", label: "Shortlisted" },
    { key: "interview", label: "Interview" },
    { key: "offer", label: "Offer" },
  ];

  const normalized = String(status || "pending").toLowerCase();
  const isRejected = normalized === "rejected";

  let activeIndex = 0;
  if (normalized === "pending" || normalized === "applied" || normalized === "new") {
    activeIndex = 0;
  } else if (
    normalized === "in review" ||
    normalized === "reviewed" ||
    normalized === "viewed" ||
    normalized === "screening"
  ) {
    activeIndex = 1;
  } else if (normalized === "shortlisted") {
    activeIndex = 2;
  } else if (normalized === "interview" || normalized === "interviewing") {
    activeIndex = 3;
  } else if (normalized === "accepted" || normalized === "offer" || normalized === "hired") {
    activeIndex = 4;
  }

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-semibold text-[#526174]">
          Application Pipeline
        </span>
        {formattedDate && (
          <span className="font-mono-tabular text-[11px] text-[#7C8793]">
            Submitted {formattedDate}
          </span>
        )}
      </div>

      {isRejected ? (
        <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-rose-800">
            Application Not Selected
          </span>
          {formattedDate && (
            <span className="font-mono-tabular text-[11px] text-rose-700">
              Applied {formattedDate}
            </span>
          )}
        </div>
      ) : (
        <ol className="grid grid-cols-5 gap-1.5">
          {stages.map((st, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;
            return (
              <li key={st.key} className="flex flex-col">
                <div
                  className={`h-1.5 rounded-full transition-colors ${
                    isCompleted || isCurrent ? "bg-[#39AFA0]" : "bg-[#E5DED2]"
                  }`}
                />
                <div className="mt-1.5 flex items-center gap-1">
                  {isCompleted && (
                    <CheckCircle2
                      className="w-3 h-3 text-[#39AFA0] shrink-0"
                      strokeWidth={2}
                    />
                  )}
                  <span
                    className={`text-[10px] sm:text-[11px] truncate ${
                      isCurrent
                        ? "font-bold text-[#39AFA0]"
                        : isCompleted
                          ? "font-semibold text-[#14243A]"
                          : "font-medium text-[#7C8793]"
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

/**
 * Empty State on Warm Sand surface
 */
export const EmptyState = ({
  icon,
  title = "No records found",
  description = "There are no items to display right now.",
  action,
}) => {
  const IconComponent = icon || FolderOpen;
  return (
    <div className="bg-[#FFFCF6] border-2 border-dashed border-[#E5DED2] hover:border-[#39AFA0] transition-colors rounded-xl p-12 text-center max-w-lg mx-auto my-4">
      <div className="w-11 h-11 rounded-xl bg-[#F4F1EA] border border-[#E5DED2] flex items-center justify-center mx-auto text-[#14243A]">
        <IconComponent className="w-5 h-5 text-[#39AFA0]" strokeWidth={1.5} />
      </div>
      <h3 className="text-sm font-bold text-[#14243A] mt-3.5">{title}</h3>
      <p className="text-xs text-[#526174] mt-1 leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export const JobCardSkeleton = () => (
  <div className="bg-[#FFFCF6] border border-[#E5DED2] rounded-xl p-5 space-y-4 animate-pulse">
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-lg bg-[#ECE7DC]" />
        <div className="space-y-2">
          <div className="w-24 h-3 bg-[#ECE7DC] rounded" />
          <div className="w-44 h-4 bg-[#ECE7DC] rounded" />
        </div>
      </div>
      <div className="w-8 h-8 rounded-lg bg-[#ECE7DC]" />
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-12 bg-[#F4F1EA] border border-[#E5DED2] rounded-lg"
        />
      ))}
    </div>
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-16 h-6 bg-[#ECE7DC] rounded-md" />
      ))}
    </div>
    <div className="pt-3 border-t border-[#E5DED2] flex justify-between items-center">
      <div className="w-20 h-4 bg-[#ECE7DC] rounded" />
      <div className="w-28 h-8 bg-[#ECE7DC] rounded-lg" />
    </div>
  </div>
);
