import React, { useContext } from "react";
import { recruiterAuthContext } from "../Context/RecruiterContext";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { jobContext } from "../Context/JobContext";

const jobValidationSchema = yup.object().shape({
  title: yup.string().required("Job title is required"),
  description: yup.string().required("Job description is required"),
  requirements: yup.array().of(yup.string()).default([]),
  location: yup.string().required("Job location is required"),
  jobType: yup
    .string()
    .oneOf(["Full-time", "Part-time", "Internship", "Contract"], "Invalid job type")
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
  const { postJob, postingJob } = useContext(jobContext)



  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(jobValidationSchema)
  })

  const checkErrors = (err) => {
    console.log(errors);
    const firstError = Object.values(err)[0].message;
    toast.error(firstError);
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
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="sticky top-0 z-50">
        <div className="max-w-7xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-6 rounded-2xl flex items-center justify-between shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <i className="fa fa-shield-alt text-indigo-400"></i> Recruiter Portal
              </span>
              <span className="h-2 w-2 bg-indigo-500 rounded-full animate-ping"></span>
            </div>
            <h1 className="text-white text-2xl font-black tracking-tight">
              Post <span className="text-indigo-400">New Job</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end text-right">
              <div className="flex items-center gap-1.5">
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                  Hiring Manager
                </p>
                <span className="text-indigo-400 text-[10px] font-bold uppercase underline decoration-indigo-500/30 underline-offset-4">
                  @{userInfo?.companyName || "Company"}
                </span>
              </div>
              <p className="text-white text-sm font-semibold mt-0.5 tracking-wide">
                <i className="fa fa-user-circle mr-1 text-slate-500"></i> {userInfo?.name || "Admin"}
              </p>
            </div>
            <a
              href="/company"
              className="group flex items-center gap-2 bg-white/10 hover:bg-indigo-500/20 text-white px-5 py-2.5 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all text-sm font-medium"
            >
              <i className="fa fa-th-large group-hover:rotate-6 transition-transform"></i>
              Dashboard
            </a>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <form className="space-y-8" onSubmit={handleSubmit(submitData, checkErrors)}>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800"><i className="fa fa-file-alt mr-2 text-indigo-500"></i> Job Details</h2>
                <p className="text-slate-500 text-xs">Core identity of the role.</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Job Title *" icon="fa-briefcase" placeholder="e.g. Senior Product Designer" {...register("title")} />
                <Input label="Company Name *" icon="fa-building" {...register("company")} placeholder={userInfo?.companyName || "Enter company name"} />
                <Input label="Category" icon="fa-tag" placeholder="e.g. Design, Engineering"  {...register("category")} />
                <Input label="Salary Range" icon="fa-money-bill-wave" placeholder="e.g. ₦500k - ₦800k" {...register("salary")} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800"><i className="fa fa-map-marker-alt mr-2 text-indigo-500"></i> Location & Type</h2>
            </div>
            <div className="p-8 grid md:grid-cols-3 gap-6 items-end">
              <Input label="Location *" icon="fa-globe" placeholder="Ibadan, Nigeria" {...register("location")} />

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fa fa-clock mr-1"></i> Job Type
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer hover:border-slate-300" {...register("jobType")}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fa fa-wifi mr-1"></i> Remote Position
                </label>
                <select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all cursor-pointer hover:border-slate-300" {...register("remote")}>
                  <option value="false">No (On-site)</option>
                  <option value="true">Yes (Remote)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800"><i className="fa fa-pen-nib mr-2 text-indigo-500"></i> Role Description</h2>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <textarea rows="6"  label="Key Requirements *" icon="fa-list-check" className="px-4 py-4 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none hover:border-slate-300 bg-white"  placeholder="e.g. 3+ years React experience"   {...register("requirements", {
                  setValueAs: text => text.split(",").map(item => item.trim())
                })} />
                <Input label="Preferred Skills" icon="fa-star" placeholder="e.g. Tailwind CSS, TypeScript"  {...register("skills", {
                  setValueAs: text => text.split(",").map(item => item.trim())
                })} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input type="date" label="Application Deadline" icon="fa-calendar-alt" {...register("applicationDeadline")} />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  <i className="fa fa-align-left mr-1"></i> Full Job Description *
                </label>
                <textarea
                  rows="6"
                  placeholder="Describe the day-to-day responsibilities and company culture..."
                  className="w-full px-4 py-4 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none hover:border-slate-300 bg-white" {...register("description")}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type='submit'
              className={`
     gap-2 px-10 py-2 rounded-lg text-white text-lg
    transition
    ${postingJob ? "bg-gray-500 cursor-not-allowed"  // disabled style
                  : "bg-slate-900 hover:bg-slate-700 cursor-pointer" // normal style
                }`}
              disabled={postingJob}

            >{postingJob ? (
              <>
                Posting Job
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              " Publish Job"
            )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

const Input = ({ label, icon, ...props }) => (
  <div className="w-full">
    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
      {icon && <i className={`fa ${icon} mr-1 text-slate-400`}></i>} {label}
    </label>
    <div className="relative">
      <input
        {...props}
        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 hover:border-slate-300 bg-white"
      />
    </div>
  </div>
);

export default CreateJob;