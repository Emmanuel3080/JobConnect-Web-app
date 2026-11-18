import React from "react";
import { Building2, Mail, User } from "lucide-react";
import { useRecruiterWorkspace } from "../Context/RecruiterWorkspaceContext";
import PageHeader from "../Components/shared/PageHeader";

const Row = ({ icon: Icon, label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-6 py-4">
    <dt className="inline-flex items-center gap-2.5 text-sm text-[#526174]">
      <Icon className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
      {label}
    </dt>
    <dd className="text-base font-semibold text-[#14243A] break-words sm:text-right pl-6 sm:pl-0">
      {value || <span className="font-normal text-[#7C8793]">Not provided</span>}
    </dd>
  </div>
);

const Settings = () => {
  const { userInfo } = useRecruiterWorkspace();
  const initial = userInfo?.name?.charAt(0)?.toUpperCase() || "R";

  return (
    <section className="space-y-6">
      <PageHeader
        title="Account settings"
        description="The company details linked to your JobConnect workspace."
      />

      <div className="bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl max-w-2xl overflow-hidden">
        {/* Identity */}
        <div className="flex items-center gap-4 bg-[#F4F1EA] border-b border-[#E5DED2] p-6">
          <div
            aria-hidden="true"
            className="w-16 h-16 rounded-2xl bg-[#14243A] text-[#FFFCF6] flex items-center justify-center text-2xl font-bold shrink-0"
          >
            {initial}
          </div>
          <div className="min-w-0">
            <p className="text-xl font-extrabold text-[#14243A] tracking-tight truncate">
              {userInfo?.name || "Recruiter"}
            </p>
            <p className="text-sm text-[#526174] truncate">
              {userInfo?.companyName || "No company on file"}
            </p>
          </div>
        </div>

        {/* Details */}
        <dl className="px-6 divide-y divide-[#E5DED2]">
          <Row icon={User} label="Recruiter name" value={userInfo?.name} />
          <Row icon={Building2} label="Company" value={userInfo?.companyName} />
          <Row icon={Mail} label="Email address" value={userInfo?.email} />
        </dl>
      </div>
    </section>
  );
};

export default Settings;