import React from "react";

const JobCard = ({ title, company, location, salary, jobType, remote, id }) => {
  return (
    <div className="group relative bg-white border border-slate-200 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]">

      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
          {title}
        </h2>
        {remote && (
          <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-emerald-100">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
            Remote
          </span>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <div className="flex items-center text-slate-600 group-hover:text-slate-900 transition-colors">
          <span className="bg-slate-100 p-1.5 rounded-lg mr-3 text-lg"> </span>
          <span className="font-medium">{company}</span>
        </div>
        <div className="flex items-center text-slate-400 text-sm">
          <span className="bg-slate-100 p-1.5 rounded-lg mr-3 text-lg opacity-60"></span>
          {location}
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-slate-50">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">
            Salary Range
          </p>
          <p className="text-sm font-bold text-slate-800">{salary}</p>
        </div>
        <div className="text-right">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-4 py-1.5 rounded-2xl">
            {jobType}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <button className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-3 rounded-2xl  group-hover:bg-blue-600 transition-all duration-300 active:scale-[0.98]cursor-pointer">
        <a href={`/job/${id}`}>View Details</a>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default JobCard;