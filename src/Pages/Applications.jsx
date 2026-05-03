import React, { useEffect, useState, useContext } from 'react'
import { authContext } from '../Context/AuthContext'
import Header from '../Common/Header'

const Applications = () => {
    const { userInfo } = useContext(authContext)
    const baseUrl = import.meta.env.VITE_API_URL
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    const getApplications = async () => {
        setLoading(true)
        try {
            const response = await fetch(
                `${baseUrl}/employee/job/applications/${userInfo?._id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
                    }
                }
            )
            const data = await response.json()
            if (response.ok) {
                setApplications(data.applications || [])
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (userInfo?._id) {
            getApplications()
        }
    }, [userInfo])

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'accepted': return 'text-emerald-700 bg-emerald-50 ring-emerald-600/20';
            case 'rejected': return 'text-rose-700 bg-rose-50 ring-rose-600/20';
            case 'interviewing': return 'text-blue-700 bg-blue-50 ring-blue-600/20';
            default: return 'text-amber-700 bg-amber-50 ring-amber-600/20';
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
            <Header />

            <main className="max-w-[1400px] mx-auto px-6 py-3">
                {/* Dashboard Stats (Optional but adds "Beauty") */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Total Applied</p>
                        <p className="text-3xl font-bold mt-1">{applications.length}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Active Interviews</p>
                        <p className="text-3xl font-bold mt-1 text-blue-600">
                            {applications.filter(a => a.status?.toLowerCase() === 'interviewing').length}
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Upcoming Deadlines</p>
                        <p className="text-3xl font-bold mt-1 text-rose-500">2</p>
                    </div>
                </div>

                <div className="bg-white shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold">Recent Applications</h2>
                        <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">Export CSV</button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Position & Company</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Salary Range</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">Dates</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-right">Resume</th>
                                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {loading ? (
                                    <tr><td colSpan="6" className="py-20 text-center text-slate-400 animate-pulse">Loading dashboard...</td></tr>
                                ) : applications.length === 0 ? (
                                    <tr><td colSpan="6" className="py-20 text-center text-slate-400">No applications found.</td></tr>
                                ) : (
                                    applications.map((app) => (
                                        <tr key={app._id} className="hover:bg-slate-50/50 transition-colors group">
                                            {/* Position & Company */}
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer">
                                                        {app.jobId?.title}
                                                    </span>
                                                    <span className="text-sm text-slate-500 font-medium">{app.jobId?.company}</span>
                                                    <span className="text-[11px] text-slate-400 mt-1 uppercase tracking-tight italic">{app.jobId?.location}</span>
                                                </div>
                                            </td>

                                            {/* Salary */}
                                            <td className="px-6 py-5">
                                                <span className="text-sm font-semibold text-slate-700">
                                                    {app.jobId?.salary || 'Hidden'}
                                                </span>
                                                <p className="text-[10px] text-slate-400 uppercase font-bold">Est. Monthly</p>
                                            </td>

                                            {/* Dates */}
                                            <td className="px-6 py-5 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm text-slate-600 font-medium">
                                                        {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                    <div className="h-4 w-[1px] bg-slate-200 my-1"></div>
                                                    <span className="text-[10px] text-rose-500 font-bold uppercase">
                                                        Ends {new Date(app?.jobId?.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ring-1 ring-inset ${getStatusStyles(app.status)} uppercase`}>
                                                    {app.status || 'Pending'}
                                                </span>
                                            </td>

                                            {/* CV Download Link */}
                                            <td className="px-6 py-5 text-right">
                                                <a 
                                                    href={app?.cvUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg bg-white shadow-sm transition-all"
                                                >
                                                    View CV
                                                </a>
                                            </td>

                                            {/* Options Menu */}
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-slate-300 hover:text-slate-600 font-bold text-lg">⋮</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Applications