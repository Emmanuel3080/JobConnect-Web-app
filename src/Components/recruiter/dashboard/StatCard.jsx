import React from "react";

/**
 * Compact KPI card. `accent` tints the value (e.g. Teal for positive metrics).
 */
const StatCard = ({ label, value, hint, icon, accent = false, iconClassName = "text-[#39AFA0]" }) => {
  const Icon = icon;
  return (
    <div className="bg-[#FFFCF6] p-5 rounded-xl border border-[#E5DED2] flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#526174]">{label}</p>
        <p
          className={`font-mono-tabular text-2xl font-extrabold mt-1 ${
            accent ? "text-[#39AFA0]" : "text-[#14243A]"
          }`}
        >
          {value}
        </p>
        {hint && <p className="text-[11px] text-[#7C8793] mt-0.5 truncate">{hint}</p>}
      </div>
      {Icon && (
        <div className="w-10 h-10 rounded-xl bg-[#F4F1EA] border border-[#E5DED2] flex items-center justify-center shrink-0">
          <Icon className={`w-5 h-5 ${iconClassName}`} strokeWidth={1.5} />
        </div>
      )}
    </div>
  );
};

export default StatCard;
