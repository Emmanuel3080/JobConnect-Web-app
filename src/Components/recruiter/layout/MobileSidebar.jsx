import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Plus } from "lucide-react";
import logo from "../../../assets/jobconnect_logo.svg";
import { sidebarFocusRing } from "../../../utils/recruiterStyles";
import RecruiterSidebar from "./RecruiterSidebar";

/**
 * Compact top bar + slide-over sidebar drawer for screens below `lg`.
 */
const MobileSidebar = (sidebarProps) => {
  const [open, setOpen] = useState(false);

  // Escape closes the drawer; lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-30 bg-[#14243A] border-b border-[#213B50] text-[#FFFCF6] px-4 h-14 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={open}
            className={`p-2 rounded-lg bg-[#213B50] text-[#FFFCF6] hover:bg-[#213B50]/80 cursor-pointer ${sidebarFocusRing}`}
          >
            <Menu className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <Link to="/company" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#FFFCF6] p-1 flex items-center justify-center">
              <img src={logo} alt="JobConnect" className="w-full h-full object-contain" />
            </span>
            <span className="text-sm font-extrabold tracking-tight text-[#FFFCF6]">
              Job<span className="text-[#39AFA0]">Connect</span>
            </span>
          </Link>
        </div>

        <Link
          to="/post-job"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#39AFA0] text-[#14243A] ${sidebarFocusRing}`}
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={2} />
          <span>Post Job</span>
        </Link>
      </header>

      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            aria-hidden="true"
            onClick={close}
            className="fixed inset-0 bg-[#14243A]/60 backdrop-blur-xs"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="relative z-10 w-72 max-w-[85vw] h-full shadow-2xl"
          >
            <RecruiterSidebar {...sidebarProps} onNavigate={close} onClose={close} />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
