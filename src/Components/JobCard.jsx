import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  Briefcase,
  Clock,
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { authContext } from "../Context/AuthContext";
import { SkillMatchRing, computeSkillMatch } from "./PrecisionPrimitives";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF6]";

const JobCard = ({
  title,
  company,
  location,
  salary,
  jobType,
  remote,
  skills,
  category,
  datePosted,
  No_of_Applicant,
  id,
}) => {
  const { userInfo } = useContext(authContext) || {};
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem("jc_saved_jobs") || "[]");
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  });

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

  const saved = Boolean(id && savedIds.includes(id));

  const handleToggleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const list = JSON.parse(localStorage.getItem("jc_saved_jobs") || "[]");
      const current = Array.isArray(list) ? list : [];
      const exists = current.includes(id);
      const updated = exists
        ? current.filter((item) => item !== id)
        : [...current, id];
      localStorage.setItem("jc_saved_jobs", JSON.stringify(updated));
      setSavedIds(updated);
      window.dispatchEvent(new Event("jc-saved-jobs-updated"));
      toast.success(exists ? "Removed from saved jobs" : "Saved to bookmarks");
    } catch (err) {
      console.log(err);
    }
  };

  const initials = company
    ? String(company)
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "JC";

  const formattedDate = datePosted
    ? new Date(datePosted).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "Recently";

  const skillTags = Array.isArray(skills) ? skills.filter(Boolean).slice(0, 4) : [];
  const extraSkills = Array.isArray(skills)
    ? Math.max(skills.filter(Boolean).length - skillTags.length, 0)
    : 0;

  const matchScore = computeSkillMatch(userInfo?.Skills, skills);

  return (
    <article className="group relative bg-[#FFFCF6] border border-[#E5DED2] hover:border-[#39AFA0] hover:shadow-lg hover:shadow-[#14243A]/10 rounded-2xl p-5 sm:p-6 transition-all duration-150 flex flex-col h-full">
      {/* Top row: company, match score, save */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-[#14243A] text-[#FFFCF6] flex items-center justify-center font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-[#14243A] truncate">
                {company || "Hiring company"}
              </span>
              <BadgeCheck
                className="w-4 h-4 text-[#39AFA0] shrink-0"
                strokeWidth={1.75}
                aria-label="Verified company"
              />
            </div>
            {category && (
              <p className="text-xs text-[#7C8793] truncate">{category}</p>
            )}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 shrink-0">
          {matchScore !== null && (
            <SkillMatchRing score={matchScore} size={38} strokeWidth={3} />
          )}
          <button
            type="button"
            onClick={handleToggleSave}
            aria-label={saved ? "Remove from saved jobs" : "Save job"}
            aria-pressed={saved}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${focusRing} ${
              saved
                ? "bg-[#39AFA0]/15 border-[#39AFA0] text-[#14243A]"
                : "bg-[#FFFCF6] border-[#E5DED2] text-[#526174] hover:border-[#39AFA0] hover:text-[#14243A]"
            }`}
          >
            <Bookmark
              className="w-4 h-4"
              strokeWidth={1.75}
              fill={saved ? "#39AFA0" : "none"}
            />
          </button>
        </div>
      </div>

      {/* Title and location. The title link covers the whole card. */}
      <div className="mt-5">
        <h3 className="text-lg font-bold text-[#14243A] leading-snug line-clamp-2">
          <Link
            to={`/job/${id}`}
            title={title}
            className={`group-hover:text-[#213B50] after:absolute after:inset-0 after:rounded-2xl ${focusRing}`}
          >
            {title}
          </Link>
        </h3>
        <p className="mt-1.5 text-sm text-[#526174] flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#7C8793] shrink-0" strokeWidth={1.5} />
          <span className="truncate">{location || "Location flexible"}</span>
        </p>
      </div>

      {/* Salary leads, other details follow inline */}
      <div className="mt-5">
        <p className="text-xl font-extrabold text-[#14243A] tabular-nums">
          {salary || "Competitive pay"}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#526174]">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.75} />
            {remote ? "Remote" : "On-site"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.75} />
            {jobType || "Full-time"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#7C8793]" strokeWidth={1.75} />
            Posted {formattedDate}
          </span>
        </div>
      </div>

      {/* Skills */}
      {skillTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skillTags.map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              className="bg-[#F4F1EA] text-[#14243A] border border-[#E5DED2] rounded-full text-xs font-medium px-3 py-1"
            >
              {tag}
            </span>
          ))}
          {extraSkills > 0 && (
            <span className="text-xs font-medium text-[#7C8793] px-1.5 py-1">
              +{extraSkills} more
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto pt-5">
        <div className="pt-4 border-t border-[#E5DED2] flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs text-[#7C8793] tabular-nums">
            <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
            {No_of_Applicant || 0} applicants
          </span>

          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#14243A] text-[#FFFCF6] group-hover:bg-[#213B50] transition-colors">
            View job
            <ArrowUpRight className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default JobCard;