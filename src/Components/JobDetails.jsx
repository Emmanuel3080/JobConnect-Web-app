import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Upload,
  Users,
} from "lucide-react";
import { authContext } from "../Context/AuthContext";
import { jobContext } from "../Context/JobContext";
import NativeModal from "./NativeModal";
import { SkillMatchRing, computeSkillMatch } from "./PrecisionPrimitives";
import JobHeader from "./JobHeader";

const jobSchema = yup.object({
  candidateName: yup.string().required("Field is Required"),
  email: yup.string().email("Invalid Email").required("Field is Required"),
  phoneNumber: yup.string().required("Field is Required"),
  coverLetter: yup.string().required("Field is Required"),
});

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF6]";

const inputClass =
  "w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] px-3.5 py-2.5 rounded-xl text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors";

const formatDate = (value, fallback) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : fallback;

const SaveButton = ({ saved, onToggle, className = "" }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={saved ? "Remove from saved jobs" : "Save job"}
    aria-pressed={saved}
    className={`p-3 rounded-xl border transition-colors cursor-pointer ${focusRing} ${
      saved
        ? "bg-[#39AFA0]/15 border-[#39AFA0] text-[#14243A]"
        : "bg-[#FFFCF6] border-[#E5DED2] text-[#526174] hover:border-[#39AFA0] hover:text-[#14243A]"
    } ${className}`}
  >
    <Bookmark
      className="w-4 h-4"
      strokeWidth={1.75}
      fill={saved ? "#39AFA0" : "none"}
    />
  </button>
);

const JobDetails = ({
  title,
  company,
  location,
  salary,
  jobType,
  remote,
  description,
  requirements,
  skills,
  category,
  No_of_Applicant,
  applicationDeadline,
  datePosted,
  postedBy,
  id,
}) => {
  const [modalOpen, setOpen] = useState(false);
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const list = JSON.parse(localStorage.getItem("jc_saved_jobs") || "[]");
      return Array.isArray(list) ? list : [];
    } catch {
      return [];
    }
  });
  const { userInfo } = useContext(authContext);
  const { submitApplication, isApplying } = useContext(jobContext);

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

  const toggleSave = () => {
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
    } catch (e) {
      console.log(e);
    }
  };

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const applyJob = async (data) => {
    try {
      await submitApplication(id, data);
    } catch (error) {
      console.log(error);
    }
  };

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(jobSchema),
  });

  const checkErrors = (err) => {
    const firstError = Object.values(err)[0]?.message;
    if (firstError) toast.error(firstError);
  };

  const matchScore = computeSkillMatch(userInfo?.Skills, skills);
  const companyName = postedBy?.companyName || company || "Hiring company";

  return (
    <div className="bg-[#FFFCF6] pb-28 lg:pb-16 text-[#14243A]">
      {/* Application modal */}
      <NativeModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={`Apply for ${title || "this role"}`}
        subtitle={`${companyName}. Fill in the form to send your application.`}
        maxWidth="max-w-lg"
      >
        <form
          className="space-y-4"
          onSubmit={handleSubmit(applyJob, checkErrors)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label
                htmlFor="candidateName"
                className="text-sm font-semibold text-[#14243A]"
              >
                Full name
              </label>
              <input
                id="candidateName"
                type="text"
                defaultValue={userInfo?.name}
                placeholder="Your full name"
                className={inputClass}
                {...register("candidateName")}
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-semibold text-[#14243A]"
              >
                Phone number
              </label>
              <input
                id="phoneNumber"
                type="text"
                defaultValue={userInfo?.phoneNumber}
                placeholder="+234..."
                required
                className={`${inputClass} tabular-nums`}
                {...register("phoneNumber")}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-[#14243A]">
              Email address
            </label>
            <input
              id="email"
              type="email"
              defaultValue={userInfo?.email}
              placeholder="you@example.com"
              required
              className={inputClass}
              {...register("email")}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="coverLetter"
              className="text-sm font-semibold text-[#14243A]"
            >
              Cover letter
            </label>
            <textarea
              id="coverLetter"
              placeholder="Tell them why your experience and skills fit this role."
              rows="4"
              className={`${inputClass} resize-none`}
              {...register("coverLetter")}
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="cvUrl"
              className="text-sm font-semibold text-[#14243A] flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              Resume or CV
            </label>
            <input
              id="cvUrl"
              type="file"
              required
              className="block w-full text-sm text-[#526174] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#39AFA0]/15 file:text-[#14243A] hover:file:bg-[#39AFA0]/25 cursor-pointer bg-[#F4F1EA] border-2 border-dashed border-[#E5DED2] hover:border-[#39AFA0] p-3 rounded-xl transition-colors"
              {...register("cvUrl")}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-[#E5DED2]">
            <button
              type="button"
              onClick={closeModal}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold text-[#526174] hover:text-[#14243A] cursor-pointer ${focusRing}`}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isApplying}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors ${focusRing} ${isApplying
                  ? "cursor-not-allowed bg-[#7C8793] text-white"
                  : "bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer"
                }`}
            >
              {isApplying ? (
                <>
                  Sending application
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  Send application
                  <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                </>
              )}
            </button>
          </div>
        </form>
      </NativeModal>

      {/* Header */}
      <JobHeader
        title={title}
        companyName={companyName}
        category={category}
        location={location}
        jobType={jobType}
        remote={remote}
        datePosted={datePosted}
      />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Main column: reads as one page, divided by rules rather than boxes */}
          <div className="lg:col-span-8 space-y-10 order-2 lg:order-1">
            <section>
              <h2 className="text-xl font-bold text-[#14243A] mb-3">
                About the role
              </h2>
              <div className="text-base text-[#526174] leading-relaxed whitespace-pre-line max-w-prose">
                {description || "No description provided for this position."}
              </div>
            </section>

            <section className="pt-10 border-t border-[#E5DED2]">
              <h2 className="text-xl font-bold text-[#14243A] mb-4">
                What you need
              </h2>
              {requirements?.length > 0 ? (
                <ul className="space-y-3 max-w-prose">
                  {requirements.map((req, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base text-[#14243A] leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-5 h-5 text-[#39AFA0] shrink-0 mt-0.5"
                        strokeWidth={1.75}
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#7C8793]">
                  No specific requirements listed.
                </p>
              )}
            </section>

            <section className="pt-10 border-t border-[#E5DED2]">
              <h2 className="text-xl font-bold text-[#14243A] mb-4">Skills</h2>
              {skills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#F4F1EA] border border-[#E5DED2] text-[#14243A] px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[#7C8793]">No specific skills listed.</p>
              )}
            </section>
          </div>

          {/* Sidebar: apply card stays in view while reading */}
          <aside className="lg:col-span-4 order-1 lg:order-2 space-y-5 lg:sticky lg:top-6">
            <div className="bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl p-6 shadow-sm shadow-[#14243A]/5">
              <p className="text-sm font-semibold text-[#526174]">Salary</p>
              <p className="text-3xl font-extrabold text-[#14243A] tabular-nums mt-1">
                {salary || "Competitive"}
              </p>

              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-[#526174]">
                    <Clock className="w-4 h-4 text-[#D6A875]" strokeWidth={1.75} />
                    Apply by
                  </dt>
                  <dd className="font-semibold text-[#14243A] tabular-nums">
                    {formatDate(applicationDeadline, "Open until filled")}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="inline-flex items-center gap-2 text-[#526174]">
                    <Users className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                    Applicants
                  </dt>
                  <dd className="font-semibold text-[#14243A] tabular-nums">
                    {No_of_Applicant || 0}
                  </dd>
                </div>
                {matchScore !== null && (
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-[#526174]">Match with your skills</dt>
                    <dd>
                      <SkillMatchRing score={matchScore} size={40} strokeWidth={3} />
                    </dd>
                  </div>
                )}
              </dl>

              <div className="mt-6 flex items-center gap-2">
                <button
                  type="button"
                  onClick={openModal}
                  className={`flex-1 inline-flex items-center justify-center gap-2 bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] px-6 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${focusRing}`}
                >
                  Apply now
                  <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                </button>
                <SaveButton saved={saved} onToggle={toggleSave} />
              </div>
            </div>

            <div className="bg-[#F4F1EA] border border-[#E5DED2] rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-[#526174]">
                Hiring contact
              </h2>

              <div className="mt-3 flex items-center gap-3">
                <div className="w-11 h-11 bg-[#14243A] rounded-xl flex items-center justify-center text-[#FFFCF6] font-bold shrink-0">
                  {postedBy?.name?.charAt(0)?.toUpperCase() || "H"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#14243A] truncate">
                    {postedBy?.name || "Hiring manager"}
                  </p>
                  <p className="text-xs text-[#526174] truncate">{companyName}</p>
                </div>
              </div>

              {(postedBy?.phoneNumber || postedBy?.email) && (
                <div className="mt-4 space-y-2">
                  {postedBy?.phoneNumber && (
                    <a
                      href={`https://wa.me/${postedBy.phoneNumber}?text=${encodeURIComponent(
                        `Hello ${postedBy?.name || ""}, I'm interested in the ${title} role at ${companyName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 py-2.5 rounded-xl text-sm font-semibold transition-colors ${focusRing}`}
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
                      Message on WhatsApp
                    </a>
                  )}

                  {postedBy?.email && (
                    <a
                      href={`mailto:${postedBy.email}?subject=${encodeURIComponent(
                        `Application Inquiry: ${title}`
                      )}&body=${encodeURIComponent(
                        `Hello ${postedBy?.name || "Hiring Team"},\n\nI'm interested in the ${title} position at ${companyName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 w-full bg-[#FFFCF6] hover:border-[#39AFA0] text-[#14243A] border border-[#E5DED2] py-2.5 rounded-xl text-sm font-semibold transition-colors ${focusRing}`}
                    >
                      <Mail className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                      Send an email
                    </a>
                  )}
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile apply bar: the sidebar card sits above the fold on desktop only */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-20 bg-[#FFFCF6]/95 backdrop-blur border-t border-[#E5DED2] px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] flex items-center gap-2">
        <button
          type="button"
          onClick={openModal}
          className={`flex-1 inline-flex items-center justify-center gap-2 bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] px-6 py-3 rounded-xl font-semibold text-sm transition-colors cursor-pointer ${focusRing}`}
        >
          Apply now
          <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
        </button>
        <SaveButton saved={saved} onToggle={toggleSave} />
      </div>
    </div>
  );
};

export default JobDetails;