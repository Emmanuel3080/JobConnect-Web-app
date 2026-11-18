import React, { useState } from "react";
import {
  Activity,
  BadgeCheck,
  BellRing,
  BookOpen,
  ChevronDown,
  Sparkles,
  Users,
} from "lucide-react";

const items = [
  {
    icon: Sparkles,
    title: "Skill-Calibrated Job Discovery",
    tag: "Precision Matching",
    content:
      "JobConnect compares your registered skills with live role requirements so you can immediately spot opportunities aligned with your experience and career trajectory.",
  },
  {
    icon: Users,
    title: "Direct Hiring Manager Access",
    tag: "No Middlemen",
    content:
      "Connect directly with verified recruiters and hiring managers. Every job listing includes transparent hiring contact details for direct follow-up.",
  },
  {
    icon: Activity,
    title: "Transparent Application Tracking",
    tag: "Live Status",
    content:
      "Track every application across clear recruitment stages — from Applied and Profile Viewed to Shortlisted, Interview, and Offer.",
  },
  {
    icon: BadgeCheck,
    title: "Verified Employer Listings",
    tag: "Trusted Network",
    content:
      "Review clear compensation bands, work arrangements (Remote or On-site), application deadlines, and skill requirements before submitting your resume.",
  },
  {
    icon: BookOpen,
    title: "Streamlined One-Click Applications",
    tag: "Fast Workflow",
    content:
      "Your candidate profile pre-populates your contact details so you can tailor your cover letter, attach your resume, and submit in seconds.",
  },
  {
    icon: BellRing,
    title: "Saved Roles & Bookmarks",
    tag: "Stay Organized",
    content:
      "Bookmark promising roles while browsing and return to your curated Saved Jobs list whenever you are ready to apply.",
  },
];

export default function WhatWeOffer() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#E5DED2] bg-[#FFFCF6]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block bg-[#39AFA0]/15 text-[#14243A] text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border border-[#39AFA0]/40">
            Platform Capabilities
          </span>
          <h2 className="text-2xl font-extrabold text-[#14243A] tracking-tight">
            Built for transparent, high-trust hiring
          </h2>
          <p className="text-xs sm:text-sm text-[#526174] mt-2 leading-relaxed">
            A structured recruitment workflow designed to eliminate guesswork and help candidates land the right role faster.
          </p>
        </div>

        <div className="space-y-2.5">
          {items.map((item, i) => {
            const IconComponent = item.icon;
            const isOpen = openIndex === i;
            return (
              <div
                key={item.title}
                className={`rounded-xl border transition-all ${
                  isOpen
                    ? "border-[#39AFA0] bg-[#F4F1EA]"
                    : "border-[#E5DED2] bg-[#FFFCF6] hover:border-[#D6A875]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
                        isOpen
                          ? "bg-[#14243A] text-[#FFFCF6] border-[#14243A]"
                          : "bg-[#F4F1EA] text-[#526174] border-[#E5DED2]"
                      }`}
                    >
                      <IconComponent
                        className={`w-4 h-4 ${isOpen ? "text-[#39AFA0]" : ""}`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-sm font-bold text-[#14243A]">
                        {item.title}
                      </span>
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isOpen
                            ? "bg-[#39AFA0]/15 text-[#14243A] border-[#39AFA0]/40"
                            : "bg-[#F4F1EA] text-[#7C8793] border-[#E5DED2]"
                        }`}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7C8793] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#39AFA0]" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 border-t border-[#E5DED2]">
                    <p className="text-xs sm:text-sm text-[#526174] leading-relaxed pl-11">
                      {item.content}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
