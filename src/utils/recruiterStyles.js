// Shared Tailwind class tokens for the Recruiter ATS (Midnight Navy + Warm Sand + Teal).

export const sidebarFocusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14243A]";

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA]";

export const primaryButton = `inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] transition-colors cursor-pointer ${focusRing}`;

export const secondaryButton = `inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#FFFCF6] text-[#14243A] border border-[#E5DED2] hover:border-[#39AFA0] transition-colors cursor-pointer ${focusRing}`;

export const fieldClass =
  "bg-[#F4F1EA] border border-[#E5DED2] rounded-lg px-3 py-2 text-xs text-[#14243A] placeholder:text-[#7C8793] focus:outline-none focus:border-[#39AFA0]";

export const cardClass = "bg-[#FFFCF6] border border-[#E5DED2] rounded-xl";
