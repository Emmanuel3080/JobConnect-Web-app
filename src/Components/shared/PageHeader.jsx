import React from "react";

/**
 * Page title block with an optional actions slot on the right.
 */
const PageHeader = ({ title, description, actions }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
    <div className="min-w-0">
      <h1 className="text-2xl font-extrabold text-[#14243A] tracking-tight">{title}</h1>
      {description && (
        <p className="text-xs sm:text-sm text-[#526174] mt-0.5">{description}</p>
      )}
    </div>
    {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
  </div>
);

export default PageHeader;
