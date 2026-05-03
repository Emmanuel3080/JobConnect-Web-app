import React, { useContext, useEffect, useState } from 'react'
import { jobContext } from '../Context/JobContext'
import JobCard from '../Components/JobCard';
import Header from '../Common/Header';

const AllJobs = () => {

    const { fetchJobs, jobs, } = useContext(jobContext)




    // console.log(jobs);


    useEffect(() => {
        fetchJobs()
    }, [])
    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                            Published Postings
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            Review and manage all your live job opportunities
                        </p>
                    </div>

                    <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mr-3">
                            Total Listings
                        </span>
                        <span className="text-indigo-600 font-extrabold text-lg">
                            {jobs.length}
                        </span>
                    </div>
                </div>

                {jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {jobs.map((job) => (
                            <div key={job._id || job.id} className="h-full">
                                <JobCard
                                    title={job?.title}
                                    salary={job?.salary}
                                    location={job?.location}
                                    company={job?.company}
                                    jobType={job?.jobType}
                                    remote={job?.remote}
                                    id={job?._id}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <i className="fa fa-folder-open text-slate-300 text-2xl"></i>
                        </div>
                        <h3 className="text-slate-900 font-bold text-lg">No jobs available</h3>
                    </div>
                )}
            </main>
        </div>
    )
}

export default AllJobs