import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#14243A] border-t border-[#213B50] text-[#E5DED2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-base font-extrabold text-[#FFFCF6] tracking-tight">
              Job<span className="text-[#39AFA0]">Connect</span>
            </div>
            <p className="text-xs leading-relaxed text-[#E5DED2]/80 max-w-xs">
              Connecting ambitious professionals with verified employers. Discover roles, apply with confidence, and track every stage.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium bg-[#213B50] border border-[#39AFA0]/40 rounded-md px-2.5 py-1 text-[#FFFCF6]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
                Verified Employer Network
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6A875] mb-3">
              Candidate Platform
            </h4>
            <ul className="space-y-2 text-xs text-[#E5DED2]/80">
              <li>
                <Link to="/" className="hover:text-[#39AFA0] transition-colors">
                  Explore Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="hover:text-[#39AFA0] transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs?saved=true"
                  className="hover:text-[#39AFA0] transition-colors"
                >
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/applications"
                  className="hover:text-[#39AFA0] transition-colors"
                >
                  My Applications
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6A875] mb-3">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-[#E5DED2]/80">
              <li>
                <span>Resume Best Practices</span>
              </li>
              <li>
                <span>Interview Preparation</span>
              </li>
              <li>
                <span>Candidate Help Center</span>
              </li>
              <li>
                <span>Privacy & Data Security</span>
              </li>
            </ul>
          </div>

          {/* Job Alerts */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#D6A875] mb-3">
              Job Alerts
            </h4>
            <div className="bg-[#213B50] border border-[#39AFA0]/30 rounded-xl p-3.5 space-y-2.5">
              <p className="text-xs text-[#E5DED2]/85 leading-relaxed">
                Receive curated role notifications matching your skills.
              </p>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-[#14243A] border border-[#E5DED2]/20 rounded-lg px-3 py-2 text-xs text-[#FFFCF6] placeholder:text-[#7C8793] outline-none focus:border-[#39AFA0]"
              />
              <button
                type="button"
                className="w-full bg-[#39AFA0] text-[#14243A] hover:bg-[#39AFA0]/90 rounded-lg py-2 text-xs font-bold transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#213B50] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#7C8793]">
          <span>© {currentYear} JobConnect Technologies</span>
          <div className="flex items-center gap-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
