import { useState } from "react";

const items = [
    {
        icon: "🎯",
        title: "Smart Job Matching",
        tag: "AI-Powered",
        content:
            "JobConnect intelligently matches candidates with relevant job opportunities based on their skills, experience, and career preferences. Our AI-driven recommendation system helps users discover the most suitable roles faster, reducing the stress of searching through unrelated job listings. (Upcoming Feature)"
    },
    {
        icon: "🤝",
        title: "Direct Recruiter Access",
        tag: "No Middlemen",
        content: "Connect directly with hiring managers and decision-makers from top-tier companies. Our platform removes the middleman entirely, enabling faster communication, greater transparency, and a more human hiring process."
    },
    {
        icon: "📊",
        title: "Real-Time Application Tracking",
        tag: "Live Updates",
        content: "Track every step of your journey from 'Applied' to 'Hired.' Get instant notifications the moment a recruiter views your profile, leaves feedback, or moves your application forward — so you're never left guessing."
    },
    {
        icon: "📚",
        title: "Expert Career Resources",
        tag: "Free Tools",
        content: "Access a full suite of career tools: AI-assisted resume builder, mock interview practice, industry salary benchmarks, and personalized coaching guides — all tailored to your experience level and target role."
    },
    {
        icon: "🏢",
        title: "Verified Company Profiles",
        tag: "Trusted Network",
        content: "Every employer on JobConnect is verified and reviewed. Browse company culture insights, team size, growth trajectory, and candid employee reviews before you apply — so you can make informed, confident decisions."
    },
    {
        icon: "🔔",
        title: "Personalized Job Alerts",
        tag: "Stay Ahead",
        content: "Set up smart alerts based on your role, location, salary range, and work mode preferences. Be among the first to know when new opportunities land — giving you a head start over thousands of other applicants."
    }
];

const AccordionItem = ({ item, isOpen, onClick }) => (
    <div
        className={`rounded-xl mb-3 border transition-all duration-200 overflow-hidden ${isOpen ? "border-blue-500 bg-white shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"
            }`}
    >
        <button
            className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none group"
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base font-semibold text-slate-800">{item.title}</span>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${isOpen
                            ? "bg-blue-100 text-blue-600"
                            : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                            }`}>
                            {item.tag}
                        </span>
                    </div>
                </div>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 text-blue-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="px-6 pb-5 pt-1 border-t border-slate-100">
                <p className="text-sm text-slate-500 leading-relaxed pl-10">{item.content}</p>
            </div>
        </div>
    </div>
);

const stats = [
    { value: "30k+", label: "Professionals hired" },
    { value: "1,400+", label: "Partner companies" },
    { value: "94%", label: "Placement rate" },
    { value: "< 3 wks", label: "Avg. time to hire" },
];

export default function WhatWeOffer() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-4">
                    <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 border border-blue-100">
                        Why JobConnect
                    </span>
                    {/* <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
            Everything you need to<br />
            <span className="text-blue-600">land your next role.</span>
          </h2> */}
                    <p className="text-slate-500 text-base max-w-xl mx-auto leading-relaxed">
                        More than a job board a full recruitment infrastructure built to get you hired faster, smarter, and with total confidence.
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-10">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-white rounded-xl border border-slate-200 px-4 py-4 text-center">
                            <div className="text-2xl font-black text-blue-600 tracking-tight">{s.value}</div>
                            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Accordion */}
                <div>
                    {items.map((item, i) => (
                        <AccordionItem
                            key={i}
                            item={item}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>

                {/* <div className="mt-10 bg-blue-600 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg leading-snug">Ready to take the next step?</p>
            <p className="text-blue-200 text-sm mt-1">Join thousands of professionals finding their dream roles today.</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="bg-white text-blue-600 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 transition-colors">
              Browse Jobs
            </button>
            <button className="bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg border border-blue-400 hover:bg-blue-400 transition-colors">
              Post a Role
            </button>
          </div>
        </div> */}

            </div>
        </section>
    );
}