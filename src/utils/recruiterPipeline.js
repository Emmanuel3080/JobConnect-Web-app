// Pure helpers for the Recruiter ATS pipeline. No React, no network.

export const KANBAN_COLUMNS = [
  { id: "pending", label: "New Applications", matches: ["pending", "new", "applied"] },
  { id: "in review", label: "In Review", matches: ["in review", "review", "viewed", "screening"] },
  { id: "shortlisted", label: "Shortlisted", matches: ["shortlisted"] },
  { id: "interview", label: "Interview", matches: ["interview", "interviewing", "scheduled"] },
  { id: "accepted", label: "Offer", matches: ["accepted", "offer", "hired"] },
  { id: "rejected", label: "Rejected", matches: ["rejected", "archived"] },
];

export const STAGE_SEQUENCE = ["pending", "in review", "shortlisted", "interview", "accepted"];

export const STAGE_FILTERS = [
  "All",
  "pending",
  "in review",
  "shortlisted",
  "interview",
  "accepted",
  "rejected",
];

const TALENT_POOL_STAGES = ["shortlisted", "accepted", "offer", "interview", "interviewing"];

const lower = (value) => String(value || "").toLowerCase();

export const getInitials = (name, fallback = "CA") =>
  name
    ? String(name)
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : fallback;

export const formatDate = (
  value,
  options = { month: "short", day: "numeric", year: "numeric" },
  locale = "en-US"
) => (value ? new Date(value).toLocaleDateString(locale, options) : "");

// Adds a stable id, the effective (possibly locally overridden) status,
// and a dossier-completeness score derived only from real API fields.
export const normalizeApplicant = (emp, index, stageOverrides) => {
  const id = emp._id || emp.id || `${emp.email || "cand"}-${index}`;
  let completeness = 65;
  if (emp.candidateName) completeness += 8;
  if (emp.email) completeness += 7;
  if (emp.phoneNumber) completeness += 5;
  if (emp.coverLetter && emp.coverLetter.length > 30) completeness += 8;
  if (emp.cvUrl) completeness += 7;

  return {
    ...emp,
    _uid: id,
    effectiveStatus: stageOverrides[id] || emp.status || "pending",
    alignmentScore: Math.min(98, completeness),
  };
};

export const isTalentPoolStage = (status) => TALENT_POOL_STAGES.includes(lower(status));

export const getNextStage = (status) => {
  const idx = STAGE_SEQUENCE.indexOf(lower(status || "pending"));
  return idx >= 0 && idx < STAGE_SEQUENCE.length - 1 ? STAGE_SEQUENCE[idx + 1] : "accepted";
};

export const countByStage = (applicants) =>
  STAGE_FILTERS.reduce((acc, stage) => {
    acc[stage] =
      stage === "All"
        ? applicants.length
        : applicants.filter((a) => lower(a.effectiveStatus) === stage).length;
    return acc;
  }, {});

export const filterAndSortApplicants = (applicants, { stage, query, sort }) => {
  const q = query.trim().toLowerCase();
  const list = applicants.filter((emp) => {
    if (stage !== "All" && lower(emp.effectiveStatus) !== lower(stage)) return false;
    if (!q) return true;
    return (
      lower(emp.candidateName).includes(q) ||
      lower(emp.email).includes(q) ||
      lower(emp.phoneNumber).includes(q) ||
      lower(emp.coverLetter).includes(q)
    );
  });

  return [...list].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return sort === "oldest" ? dateA - dateB : dateB - dateA;
  });
};

export const matchesKanbanColumn = (applicant, column) =>
  column.matches.includes(lower(applicant.effectiveStatus || "pending"));

export const buildInterviewMailto = ({ candidate, job, recruiter, form }) => {
  if (!candidate?.email) return null;
  const subject = encodeURIComponent(
    `Interview Invitation: ${job?.title || "Role"} at ${
      recruiter?.companyName || job?.company || "Our Company"
    }`
  );
  const body = encodeURIComponent(
    `Hello ${candidate.candidateName},\n\nWe would like to invite you to an interview for the ${
      job?.title || ""
    } position on ${form.date} at ${form.time}.\n\nDetails: ${form.notes}\n\nBest regards,\n${
      recruiter?.name || "Hiring Team"
    }`
  );
  return `mailto:${candidate.email}?subject=${subject}&body=${body}`;
};
