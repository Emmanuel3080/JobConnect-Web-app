import React, { useContext, useState } from 'react'
import { authContext } from '../Context/AuthContext'



const Header = () => {

    const { userInfo } = useContext(authContext)
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="bg-white/90 backdrop-blur-md text-slate-900 shadow-sm sticky top-0 z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-8">
                    <a href='/' className="text-2xl font-extrabold tracking-tight cursor-pointer">
                        Job<span className="text-slate-600">Connect</span>
                    </a>

                    {/* Desktop Nav - Hidden on small screens */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
                        <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
                        <a href="/applications" className="hover:text-blue-600 transition-colors">My Applications</a>
                        <a href="/jobs" className="hover:text-blue-600 transition-colors">View Jobs</a>
                    </nav>
                </div>

                {/* User Actions */}
                <div className="hidden md:flex items-center gap-4"  >
                    {/* User Info (Optional but recommended) */}
                    <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-900">{userInfo.name || ""}</p>
                            <p className="text-[10px] text-slate-500">{userInfo.role || "Guest"}</p>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 overflow-hidden">
                            {userInfo?.profileImage ? (<div>
                                <img src={userInfo?.profileImage} alt="" />
                            </div>
                            ) : (
                                <div>
                                    <i className='fa fa-user'></i>

                                </div>
                            )}
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-red-600 bg-red-50 border-2 border-red-100 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 active:scale-95"
                    >
                        <i className="fa fa-sign-out-alt"></i>
                        <a href="/signin">Logout</a>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
                    <i className={`fa ${menuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <nav className="flex flex-col gap-4 font-semibold text-slate-700">
                        <a href="#">Dashboard</a>
                        <a href="/applications">My Applications</a>
                        <a href="#">Profile Settings</a>
                        <a href="/jobs">View Jobs</a>
                    </nav>
                    <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100 cursor-pointer">
                        <i className="fa fa-sign-out-alt"></i>
                        <a href="/signin">Logout</a>
                    </button>
                </div>
            )}
        </header>
    );
}


export default Header