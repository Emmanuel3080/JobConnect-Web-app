import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowLeft,
  Briefcase,
  FileText,
  MapPin,
  PlusCircle,
} from "lucide-react";
import { recruiterAuthContext } from "../Context/RecruiterContext";
import { jobContext } from "../Context/JobContext";
import logo from "../assets/jobconnect_logo.svg";

const jobValidationSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  requirements: yup.array().of(yup.string()).default([]),
  location: yup.string().required("Job location is required"),
  jobType: yup
    .string()
    .oneOf(
      ["Full-time", "Part-time", "Internship", "Contract"],
      "Invalid job type"
    )
    .default("Full-time"),
  salary: yup.string().required("Salary is Required"),
  company: yup.string().required("Company name is required"),
  applicationDeadline: yup.date().notRequired(),
  isActive: yup.boolean().default(true),
  category: yup.string().notRequired(),
  skills: yup.array().of(yup.string()).default([]),
  remote: yup.boolean().default(false),
});

const CreateJob = () => {
  const { userInfo } = useContext(recruiterAuthContext);
  const { postJob, postingJob } = useContext(jobContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jobValidationSchema),
  });

  const checkErrors = (err) => {
    console.log(errors);
    const firstError = Object.values(err)[0]?.message;
    if (firstError) toast.error(firstError);
  };

  const submitData = async (data) => {
    try {
      await postJob(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while posting the job.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#14243A] pb-16">
      {/* Top Sticky Midnight Navy Recruiter Bar */}
      <header className="sticky top-0 z-40 bg-[#14243A] border-b border-[#213B50] text-[#FFFCF6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/company" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFFCF6] p-1 flex items-center justify-center">
                <img
                  src={logo}
                  alt="JobConnect"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-[#FFFCF6]">
                Job<span className="text-[#39AFA0]">Connect</span>
              </span>
            </Link>
            <span className="text-[11px] font-semibold bg-[#213B50] text-[#D6A875] border border-[#D6A875]/40 px-2.5 py-0.5 rounded-full">
              Post New Job
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-bold text-[#FFFCF6]">
                {userInfo?.name || "Recruiter"}
              </p>
              <p className="text-[11px] text-[#E5DED2]/70">
                {userInfo?.companyName || "Hiring Team"}
              </p>
            </div>
            <Link
              to="/company"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-[#FFFCF6] bg-[#213B50] border border-[#39AFA0]/30 hover:border-[#39AFA0] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
              <span>Back to ATS</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#14243A] tracking-tight">
            Create a New Job Opening
          </h1>
          <p className="text-xs sm:text-sm text-[#526174] mt-0.5">
            Define the role details, compensation band, and required skills for candidates.
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit(submitData, checkErrors)}
        >
          {/* Section 1: Core Role Identity */}
          <section className="bg-[#FFFCF6] rounded-xl border border-[#E5DED2] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DED2] bg-[#F4F1EA]">
              <h2 className="text-sm font-bold text-[#14243A] flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.5} />
                Job Details
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Job Title *"
                placeholder="e.g. Senior Frontend Engineer"
                {...register("title")}
              />
              <Input
                label="Company Name *"
                defaultValue={userInfo?.companyName || ""}
                placeholder={userInfo?.companyName || "Enter company name"}
                {...register("company")}
              />
              <Input
                label="Category"
                placeholder="e.g. Engineering, Design, Product"
                {...register("category")}
              />
              <Input
                label="Salary Range *"
                placeholder="e.g. ₦500k - ₦800k or $140k - $170k"
                {...register("salary")}
              />
            </div>
          </section>

          {/* Section 2: Location & Work Arrangement */}
          <section className="bg-[#FFFCF6] rounded-xl border border-[#E5DED2] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DED2] bg-[#F4F1EA]">
              <h2 className="text-sm font-bold text-[#14243A] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.5} />
                Location & Arrangement
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <Input
                label="Location *"
                placeholder="e.g. Lagos, Nigeria"
                {...register("location")}
              />

              <div>
                <label className="block text-xs font-semibold text-[#14243A] mb-1.5">
                  Employment Type
                </label>
                <select
                  className="w-full px-3.5 py-2.5 border border-[#E5DED2] rounded-lg bg-[#F4F1EA] focus:bg-[#FFFCF6] focus:border-[#39AFA0] text-xs sm:text-sm text-[#14243A] outline-none transition-colors cursor-pointer"
                  {...register("jobType")}
                >
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14243A] mb-1.5">
                  Remote Position
                </label>
                <select
                  className="w-full px-3.5 py-2.5 border border-[#E5DED2] rounded-lg bg-[#F4F1EA] focus:bg-[#FFFCF6] focus:border-[#39AFA0] text-xs sm:text-sm text-[#14243A] outline-none transition-colors cursor-pointer"
                  {...register("remote")}
                >
                  <option value="false">No (On-site)</option>
                  <option value="true">Yes (Remote)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Section 3: Requirements, Skills & Description */}
          <section className="bg-[#FFFCF6] rounded-xl border border-[#E5DED2] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E5DED2] bg-[#F4F1EA]">
              <h2 className="text-sm font-bold text-[#14243A] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.5} />
                Role Description & Qualifications
              </h2>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#14243A] mb-1.5">
                    Key Requirements (comma-separated)
                  </label>
                  <textarea
                    rows="4"
                    placeholder="e.g. 3+ years React experience, Strong TypeScript skills"
                    className="w-full px-3.5 py-2.5 border border-[#E5DED2] rounded-lg bg-[#F4F1EA] focus:bg-[#FFFCF6] focus:border-[#39AFA0] text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors resize-none"
                    {...register("requirements", {
                      setValueAs: (text) =>
                        typeof text === "string"
                          ? text
                              .split(",")
                              .map((item) => item.trim())
                              .filter(Boolean)
                          : Array.isArray(text)
                            ? text
                            : [],
                    })}
                  />
                </div>

                <div className="space-y-4">
                  <Input
                    label="Preferred Skills (comma-separated)"
                    placeholder="e.g. React, Tailwind CSS, TypeScript"
                    {...register("skills", {
                      setValueAs: (text) =>
                        typeof text === "string"
                          ? text
                              .split(",")
                              .map((item) => item.trim())
                              .filter(Boolean)
                          : Array.isArray(text)
                            ? text
                            : [],
                    })}
                  />

                  <Input
                    type="date"
                    label="Application Deadline"
                    {...register("applicationDeadline")}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14243A] mb-1.5">
                  Full Job Description *
                </label>
                <textarea
                  rows="6"
                  placeholder="Describe the day-to-day responsibilities, team structure, and impact of this role..."
                  className="w-full px-3.5 py-2.5 border border-[#E5DED2] rounded-lg bg-[#F4F1EA] focus:bg-[#FFFCF6] focus:border-[#39AFA0] text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors resize-none"
                  {...register("description")}
                />
              </div>
            </div>
          </section>

          <div className="flex items-center justify-end gap-3">
            <Link
              to="/company"
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#526174] hover:text-[#14243A] border border-[#E5DED2] bg-[#FFFCF6]"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={postingJob}
              className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                postingJob
                  ? "bg-[#7C8793] text-white cursor-not-allowed"
                  : "bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer"
              }`}
            >
              {postingJob ? (
                <>
                  <span>Publishing Job...</span>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.5} />
                  <span>Publish Job</span>
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div className="w-full">
    <label className="block text-xs font-semibold text-[#14243A] mb-1.5">
      {label}
    </label>
    <input
      ref={ref}
      {...props}
      className="w-full px-3.5 py-2.5 border border-[#E5DED2] rounded-lg bg-[#F4F1EA] focus:bg-[#FFFCF6] focus:border-[#39AFA0] text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
    />
  </div>
));

Input.displayName = "Input";

export default CreateJob;
