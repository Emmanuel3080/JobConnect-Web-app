import React, { useContext, useEffect } from 'react'
import { jobContext } from '../Context/JobContext'
import JobCard from './JobCard'

const JobSection = () => {
    const { jobs, fetchJobs, loadingJobs } = useContext(jobContext)


    useEffect(() => {
        fetchJobs()
    }, [])
    return (
        <div>

            <div className="flex items-center justify-between px-6 py-4">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                    Featured Jobs
                </h1>
                <button className="relative px-5 py-2 font-medium text-red-600 border border-red-600 rounded-full overflow-hidden group">
                    <a href='/jobs' className="relative z-10 group-hover:text-white transition">
                        View All →
                    </a >
                    <span className="absolute inset-0 bg-red-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </button>
            </div>


            {loadingJobs && (
                <div className="flex flex-col justify-center items-center h-64 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-gray-400 font-medium animate-pulse tracking-wide">Searching opportunities...</p>
                </div>
            )}

            {!loadingJobs && (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-5 mt-0">
                    {jobs.slice(0, 5).map((job) => (
                        <JobCard
                            key={job?._id}
                            title={job?.title}
                            company={job?.company}
                            location={job?.location}
                            salary={job?.salary}
                            jobType={job?.jobType}
                            remote={job?.remote}
                            id={job._id}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default JobSection