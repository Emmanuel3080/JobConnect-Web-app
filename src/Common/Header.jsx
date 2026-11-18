import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Compass,
  ExternalLink,
  FileText,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { authContext } from "../Context/AuthContext";
import logo from "../assets/jobconnect_logo.svg";
import NativeModal from "../Components/NativeModal";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#39AFA0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FFFCF6]";

const readSavedCount = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("jc_saved_jobs") || "[]");
    return Array.isArray(saved) ? saved.length : 0;
  } catch {
    return 0;
  }
};

const Header = () => {
  const { userInfo } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(readSavedCount);
  const notifRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const syncSaved = () => setSavedCount(readSavedCount());
    window.addEventListener("jc-saved-jobs-updated", syncSaved);
    window.addEventListener("storage", syncSaved);
    return () => {
      window.removeEventListener("jc-saved-jobs-updated", syncSaved);
      window.removeEventListener("storage", syncSaved);
    };
  }, []);

  // Close the notifications panel on outside click or Escape
  useEffect(() => {
    if (!notificationsOpen) return;
    const onClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setNotificationsOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [notificationsOpen]);

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    navigate("/signin");
  };

  const userSkills = userInfo?.Skills
    ? Array.isArray(userInfo.Skills)
      ? userInfo.Skills
      : String(userInfo.Skills)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
    : [];

  const isSavedView =
    location.pathname === "/jobs" && location.search.includes("saved=true");

  const navItems = [
    {
      to: "/",
      label: "Explore",
      icon: Compass,
      active: location.pathname === "/",
    },
    {
      to: "/jobs",
      label: "Jobs",
      icon: Briefcase,
      active: location.pathname === "/jobs" && !isSavedView,
    },
    {
      to: "/jobs?saved=true",
      label: "Saved jobs",
      icon: Bookmark,
      active: isSavedView,
      badge: savedCount,
    },
    {
      to: "/applications",
      label: "My applications",
      icon: FileText,
      active: location.pathname === "/applications",
    },
  ];

  const avatar = (size) =>
    userInfo?.profileImage ? (
      <img
        src={userInfo.profileImage}
        alt={userInfo?.name || "Profile"}
        className="w-full h-full object-cover"
      />
    ) : (
      userInfo?.name?.charAt(0)?.toUpperCase() || (
        <User className={size} strokeWidth={1.75} />
      )
    );

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FFFCF6]/90 backdrop-blur-md border-b border-[#E5DED2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-stretch justify-between gap-4">
          {/* Brand and primary navigation */}
          <div className="flex items-stretch gap-10">
            <Link
              to="/"
              className={`flex items-center gap-2.5 shrink-0 rounded-lg ${focusRing}`}
            >
              <img src={logo} alt="" className="w-8 h-8 object-contain" />
              <span className="text-lg font-extrabold tracking-tight text-[#14243A]">
                Job<span className="text-[#39AFA0]">Connect</span>
              </span>
            </Link>

            <nav
              aria-label="Primary"
              className="hidden md:flex items-stretch gap-1 text-sm font-semibold"
            >
              {navItems.map(({ to, label, active, badge }) => (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 px-3 border-b-2 transition-colors ${focusRing} ${
                    active
                      ? "text-[#14243A] border-[#39AFA0]"
                      : "text-[#526174] border-transparent hover:text-[#14243A] hover:border-[#E5DED2]"
                  }`}
                >
                  {label}
                  {badge > 0 && (
                    <span className="tabular-nums text-xs min-w-5 text-center px-1.5 py-0.5 rounded-full bg-[#39AFA0]/15 text-[#14243A]">
                      {badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>
          </div>

          {/* Notifications, account, logout */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen((prev) => !prev)}
                aria-label="Notifications"
                aria-expanded={notificationsOpen}
                className={`relative p-2.5 rounded-xl text-[#526174] hover:text-[#14243A] hover:bg-[#F4F1EA] transition-colors cursor-pointer ${focusRing}`}
              >
                <Bell className="w-5 h-5" strokeWidth={1.5} />
                {userInfo?.name && (
                  <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-[#39AFA0] ring-2 ring-[#FFFCF6]" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl shadow-xl shadow-[#14243A]/10 p-5 z-50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#14243A]">
                      Notifications
                    </span>
                    <button
                      type="button"
                      onClick={() => setNotificationsOpen(false)}
                      aria-label="Close notifications"
                      className={`text-[#7C8793] hover:text-[#14243A] rounded-md cursor-pointer ${focusRing}`}
                    >
                      <X className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  </div>
                  <div className="mt-4 flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-[#39AFA0] shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#14243A]">
                        Your profile is active
                      </p>
                      <p className="text-sm text-[#526174] mt-1 leading-relaxed">
                        Signed in as {userInfo?.email || "a candidate"}. Follow
                        each application under My applications.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              aria-label="Open profile"
              className={`flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full border border-[#E5DED2] hover:border-[#39AFA0] bg-[#FFFCF6] transition-colors cursor-pointer ${focusRing}`}
            >
              <span className="w-8 h-8 rounded-full bg-[#14243A] text-[#FFFCF6] flex items-center justify-center text-sm font-bold overflow-hidden shrink-0">
                {avatar("w-4 h-4")}
              </span>
              <span className="text-sm font-semibold text-[#14243A] max-w-[120px] truncate">
                {userInfo?.name || "Profile"}
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              aria-label="Log out"
              title="Log out"
              className={`p-2.5 rounded-xl text-[#526174] hover:text-rose-800 hover:bg-rose-50 transition-colors cursor-pointer ${focusRing}`}
            >
              <LogOut className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className={`p-2.5 rounded-xl text-[#14243A] border border-[#E5DED2] bg-[#FFFCF6] cursor-pointer ${focusRing}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X className="w-5 h-5" strokeWidth={1.75} />
              ) : (
                <Menu className="w-5 h-5" strokeWidth={1.75} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#FFFCF6] border-t border-[#E5DED2] px-4 py-4 space-y-4">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={item.active ? "page" : undefined}
                    className={`px-3 py-3 rounded-xl text-base font-semibold flex items-center justify-between ${focusRing} ${
                      item.active
                        ? "bg-[#39AFA0]/15 text-[#14243A]"
                        : "text-[#14243A] hover:bg-[#F4F1EA]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-[#39AFA0]" strokeWidth={1.75} />
                      {item.label}
                    </span>
                    {item.badge > 0 && (
                      <span className="tabular-nums text-xs px-2 py-0.5 rounded-full bg-[#39AFA0]/20 text-[#14243A]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  setProfileOpen(true);
                }}
                className={`px-3 py-3 rounded-xl text-base font-semibold text-[#14243A] hover:bg-[#F4F1EA] flex items-center gap-3 text-left cursor-pointer ${focusRing}`}
              >
                <User className="w-5 h-5 text-[#39AFA0]" strokeWidth={1.75} />
                Profile
              </button>
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className={`w-full flex items-center justify-center gap-2 py-3 text-rose-800 rounded-xl text-sm font-semibold border border-rose-200 hover:bg-rose-50 cursor-pointer ${focusRing}`}
            >
              <LogOut className="w-4 h-4" strokeWidth={1.75} />
              Log out
            </button>
          </div>
        )}
      </header>

      {/* Profile modal */}
      <NativeModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        title="Your profile"
        subtitle="Synced with your JobConnect account"
        maxWidth="max-w-lg"
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#14243A] text-[#FFFCF6] flex items-center justify-center text-xl font-bold shrink-0 overflow-hidden">
              {userInfo?.profileImage ? (
                <img
                  src={userInfo.profileImage}
                  alt={userInfo?.name || "Candidate"}
                  className="w-full h-full object-cover"
                />
              ) : (
                userInfo?.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-[#14243A] truncate">
                {userInfo?.name || "Candidate"}
              </h3>
              <span className="inline-flex items-center gap-1.5 mt-1 text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                Active profile
              </span>
            </div>
          </div>

          <dl className="divide-y divide-[#E5DED2] border-y border-[#E5DED2] text-sm">
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="inline-flex items-center gap-2 text-[#526174]">
                <Mail className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                Email
              </dt>
              <dd className="font-semibold text-[#14243A] truncate">
                {userInfo?.email || "Not provided"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="inline-flex items-center gap-2 text-[#526174]">
                <Phone className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                Phone
              </dt>
              <dd className="font-semibold text-[#14243A] tabular-nums">
                {userInfo?.phoneNumber || "Not provided"}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="inline-flex items-center gap-2 text-[#526174]">
                <MapPin className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
                Location
              </dt>
              <dd className="font-semibold text-[#14243A]">
                {userInfo?.Location || userInfo?.location || "Not specified"}
              </dd>
            </div>
          </dl>

          <div>
            <h4 className="text-sm font-semibold text-[#14243A] flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              Skills
            </h4>
            {userSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {userSkills.map((sk, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F4F1EA] border border-[#E5DED2] text-[#14243A] rounded-full text-sm font-medium px-3.5 py-1"
                  >
                    {sk}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#526174]">No skills added yet.</p>
            )}
          </div>

          {userInfo?.cvUrl && (
            <div className="bg-[#F4F1EA] border border-[#E5DED2] rounded-xl p-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <FileText
                  className="w-5 h-5 text-[#39AFA0] shrink-0"
                  strokeWidth={1.5}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#14243A]">
                    Your resume
                  </p>
                  <p className="text-xs text-[#526174]">Saved to your account</p>
                </div>
              </div>
              <a
                href={userInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 text-sm font-semibold text-[#14243A] underline underline-offset-4 decoration-[#39AFA0] rounded-md shrink-0 ${focusRing}`}
              >
                View
                <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
              </a>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Link
              to="/applications"
              onClick={() => setProfileOpen(false)}
              className={`text-sm font-semibold text-[#14243A] underline underline-offset-4 decoration-[#39AFA0] rounded-md ${focusRing}`}
            >
              My applications
            </Link>
            <button
              type="button"
              onClick={() => setProfileOpen(false)}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] transition-colors cursor-pointer ${focusRing}`}
            >
              Done
            </button>
          </div>
        </div>
      </NativeModal>
    </>
  );
};

export default Header;