const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-14 pb-0">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.4fr] gap-10">

          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-white mb-3 tracking-tight">
              Job<span className="text-blue-500">Connect</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500 max-w-[220px]">
              Bridging ambitious talent with industry-leading companies. Your next career milestone starts here.
            </p>
            <div className="flex gap-2 mt-5 flex-wrap">
              <span className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-xs text-slate-400">
                👥 50k+ professionals
              </span>
              <span className="bg-slate-800 border border-slate-700 rounded-full px-3 py-1 text-xs text-slate-400">
                🏢 2k+ companies
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-slate-500 font-semibold mb-5 uppercase text-[10px] tracking-widest">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="/jobs" className="hover:text-slate-200 transition-colors">Find jobs</a></li>
              <li><a href="#" className="hover:text-slate-200 transition-colors">Post a job</a></li>
              <li><a href="#" className="hover:text-slate-200 transition-colors">Talent tracker</a></li>
              <li><a href="#" className="hover:text-slate-200 transition-colors">Success stories</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-slate-500 font-semibold mb-5 uppercase text-[10px] tracking-widest">Resources</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li><a href="#" className="hover:text-slate-200 transition-colors">Career blog</a></li>
              <li><a href="#" className="hover:text-slate-200 transition-colors">Resume tips</a></li>
              <li><a href="#" className="hover:text-slate-200 transition-colors">Help center</a></li>
              <li><a href="#" className="hover:text-slate-200 transition-colors">Privacy policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-slate-500 font-semibold mb-5 uppercase text-[10px] tracking-widest">Stay in the loop</h4>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Weekly job picks and career tips straight to your inbox.
              </p>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 mb-2"
              />
              <button className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-lg py-2 text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 py-5 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>© {currentYear} JobConnect Technologies</span>
            <span className="hidden md:block w-px h-3 bg-slate-800" />
            <a href="#" className="hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Cookies</a>
          </div>
          <div className="flex gap-2">
            {["LinkedIn", "Twitter", "Instagram", "YouTube"].map((s) => (
              <a key={s} href="#" aria-label={s}
                className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors text-xs">
                {s[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer