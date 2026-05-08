import React from 'react';
import pic from "../assets/hr-expert-reading-files-identifying-right-candidates-job-opening.jpg";

const LandingPage = () => {
    return (
        <div className="min-h-[70vh] bg-white">
            {/* Hero Section */}
            <section
 className="relative overflow-hidden py-4 lg:py-32 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: `url(${pic})` }}
            >
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-5 lg:gap-20">
                        {/* Text Content */}
                        <div className="w-full lg:w-2/3 space-y-8 text-center lg:text-left">
                            <div className="space-y-4">
                                {/* <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-bold tracking-wide uppercase">
                                    Now Live: 500+ New Openings
                                </span> */}
                                <h1 className="text-4xl lg:text-7xl font-extrabold text-white leading-[1.1]">
                                    Find Your Next <span className="text-blue-400">Career Move</span> Today
                                </h1>
                                <p className="text-slate-100 text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                                    The bridge between top-tier talent and world-class companies. Browse remote, hybrid, or onsite roles and apply in one click.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all cursor-pointer">
                                    <a href="/jobs"> Find Jobs</a>
                                </button>
                                <button className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 active:scale-95 transition-all">
                                    <a href="/company" target='_blank'>  Post a Job</a>
                                </button>
                            </div>

                            {/* <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-8 border-t border-white/20">
                                <div>
                                    <p className="text-3xl font-bold text-white">12k+</p>
                                    <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Active Users</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">450</p>
                                    <p className="text-sm text-slate-300 font-medium uppercase tracking-wider">Companies</p>
                                </div>
                            </div> */}
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;