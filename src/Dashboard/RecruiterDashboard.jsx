import React, { useContext, useEffect, useState } from "react";
import { recruiterAuthContext } from "../Context/RecruiterContext";
import { toast } from "sonner";
import Modal from "react-modal";
import { jobContext } from "../Context/JobContext";

Modal.setAppElement("#root");

const RecruiterDashboard = () => {
    const baseUrl = import.meta.env.VITE_API_URL;
    const { userInfo } = useContext(recruiterAuthContext);
    const { getApplicationsJob, applicants } = useContext(jobContext);
    const [jobs, setJobs] = useState([]);

    const [modalOpen, setOpen] = useState(false);
    const openModal = () => {
        setOpen(true);
        // setLoading(true)
    };
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    };
    const closeModal = () => {
        setOpen(false);
    };

    const getRecruiterJobs = async () => {
        try {
            const response = await fetch(`${baseUrl}/company/jobs/${userInfo?._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("RecruiterAccessToken")}`,
                },
            });
            const data = await response.json();
            if (response.ok) {
                setJobs(data.myJobs);
            } else {
                toast.error(data.message || "Failed to fetch jobs");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    useEffect(() => {
        if (userInfo?._id) {
            getRecruiterJobs();
        }
    }, [userInfo]);

    if (!userInfo) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    const activeJobsCount = jobs.filter((j) => j.isActive).length;
    const totalApplicants = jobs.reduce(
        (acc, job) => acc + (job.No_of_Applicant || 0),
        0,
    );

    return (
        <div className="space-y-8">
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                        zIndex: 1000,
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px", // Adds breathing room for mobile
                    },
                    content: {
                        position: "relative",
                        inset: "auto",
                        width: "100%",
                        maxWidth: "1000px", // Increased width for flex layout
                        maxHeight: "90vh",
                        padding: "0",
                        borderRadius: "24px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        overflow: "scroll",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    },
                }}
                contentLabel="Applicant Information"
            >
                <div className="flex flex-col h-full bg-slate-50">
                    {/* --- Header --- */}
                    <div className="px-8 py-6 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-20">
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Management Console
                                </h2>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                                    {applicants.length} Applicants
                                </span>
                            </div>
                            <p className="text-slate-500 text-sm mt-0.5 font-medium">
                                Review and process incoming candidate applications
                            </p>
                        </div>

                        <button
                            onClick={closeModal}
                            className="p-2.5 rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="p-8 overflow-y-auto">
                        {applicants.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {applicants.map((employee, index) => (
                                    <div
                                        key={index}
                                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 group"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center p-6 gap-6">
                                            <div className="flex-1 min-w-[250px]">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                        {employee.candidateName}
                                                    </h3>
                                                    <span
                                                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${employee.status?.toLowerCase() === "pending"
                                                                ? "bg-amber-100 text-amber-700"
                                                                : "bg-slate-100 text-slate-600"
                                                            }`}
                                                    >
                                                        {employee.status}
                                                    </span>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                        <span className="font-semibold text-slate-400 w-12 text-[11px] uppercase">
                                                            Email
                                                        </span>
                                                        <a
                                                            href={`mailto:${employee.email}`}
                                                            className="hover:text-blue-500 transition-colors font-medium underline underline-offset-4 decoration-slate-200"
                                                        >
                                                            {employee.email}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                        <span className="font-semibold text-slate-400 w-12 text-[11px] uppercase">
                                                            Phone
                                                        </span>
                                                        <span className="font-medium">
                                                            {employee.phoneNumber}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-[1.5] border-l-0 lg:border-l border-slate-100 lg:px-8">
                                                <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                                                    Cover Letter Snippet
                                                </p>
                                                <p className="text-sm text-slate-600  italic ">
                                                    "{employee.coverLetter}"
                                                </p>
                                            </div>

                                            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[140px]">
                                                <button
                                                    onClick={() => {
                                                        if (employee.cvUrl) {
                                                            window.open(employee.cvUrl, "_blank", "noopener,noreferrer");
                                                        }
                                                    }}
                                                    className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 cursor-pointer"
                                                >
                                                    View Resume
                                                </button>

                                                <div className="flex gap-2 w-full">
                                                    <button
                                                        title="Shortlist"
                                                        className="flex-1 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-500 hover:text-white transition-all"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 mx-auto"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <path d="M5 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        title="Accept"
                                                        className="flex-1 py-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 mx-auto"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <path d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        title="Reject"
                                                        className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                                                    >
                                                        <svg
                                                            className="w-4 h-4 mx-auto"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth="2.5"
                                                        >
                                                            <path d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] py-24 text-center">
                                <div className="text-5xl mb-4">📂</div>
                                <h3 className="text-slate-900 text-xl font-black">
                                    Waiting for applications
                                </h3>
                                <p className="text-slate-400">
                                    When candidates apply, they will appear here in a list.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
            <div className="relative bg-white p-8 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-50"></div>

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex items-start gap-5">
                        {/* <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0">
                            <span className="text-2xl font-black">{userInfo?.name?.charAt(0)}</span>
                        </div> */}
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Welcome back, {userInfo?.name}
                                </h1>
                                <span className="hidden md:inline-block px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100">
                                    Verified Recruiter
                                </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-1">
                                <p className="text-slate-500 text-sm font-medium">
                                    {/* {userInfo?.companyName || "Company Managed"} */}
                                </p>
                                <p className="text-slate-500 text-sm font-medium">
                                    <i className="fa fa-envelope mr-2 text-slate-400"></i>
                                    {userInfo?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full lg:w-auto border-t lg:border-t-0 pt-2 lg:pt-0">
                        <a
                            href="/account"
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm transition-all border border-slate-200"
                        >
                            <i className="fa fa-user text-xs"></i>
                            Account
                        </a>
                        <a
                            href="/post-job"
                            className="flex-[2] lg:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-lg shadow-slate-200"
                        >
                            <i className="fa fa-plus-circle"></i>
                            Post New Job
                        </a>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 px-2">
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <i className="fa fa-briefcase text-lg"></i>
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Active Positions
                        </p>
                        <h4 className="text-2xl font-black text-slate-900">
                            {activeJobsCount}
                        </h4>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <i className="fa fa-users text-lg"></i>
                    </div>
                    <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                            Total Candidates
                        </p>
                        <h4 className="text-2xl font-black text-slate-900">
                            {totalApplicants}
                        </h4>
                    </div>
                </div>

                {/* <div className="hidden lg:flex bg-slate-700 p-5 rounded-2xl shadow-sm items-center gap-4 text-white col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                        <i className="fa fa-calendar-alt"></i>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Dashboard Status</p>
                        <p className="text-sm font-medium">Monitoring activity as of {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                </div> */}
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div
                            key={job?._id}
                            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-5">
                                    <div className="max-w-[70%]">
                                        <h2
                                            className="text-lg font-black text-slate-900 truncate leading-tight mb-1"
                                            title={job.title}
                                        >
                                            {job.title}
                                        </h2>
                                        <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">
                                            {job.jobType}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2 py-1 text-[9px] font-black uppercase rounded-md flex items-center gap-1.5 ${job.isActive
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                                                : "bg-slate-100 text-slate-500 border border-slate-200"
                                            }`}
                                    >
                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${job.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400"}`}
                                        ></span>
                                        {job.isActive ? "Active" : "Closed"}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mt-6">
                                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
                                            Applicants
                                        </p>
                                        <p className="text-sm font-black text-slate-800">
                                            {job.No_of_Applicant || 0}
                                        </p>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
                                            Deadline
                                        </p>
                                        <p className="text-sm font-black text-slate-800">
                                            {new Date(job.applicationDeadline).toLocaleDateString(
                                                "en-GB",
                                                { day: "numeric", month: "short" },
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mt-5 text-slate-500 text-xs font-medium">
                                    <i className="fa fa-map-marker-alt text-blue-500"></i>
                                    {job.remote ? "Remote (Worldwide)" : job.location}
                                </div>
                            </div>

                            <div className="mt-8 pt-5 border-t border-slate-50 flex gap-2">
                                <button className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white py-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2">
                                    <i className="fa fa-user-tie"></i>
                                    <a
                                        onClick={() => {
                                            getApplicationsJob(job?._id);
                                            openModal();
                                        }}
                                    >
                                        View Applicants
                                    </a>
                                </button>
                                <button className="p-3 bg-slate-900 text-white hover:bg-slate-800 rounded-xl transition-all shadow-md group-hover:shadow-blue-100">
                                    <i className="fa fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i className="fa fa-briefcase text-slate-300 text-3xl"></i>
                        </div>
                        <h3 className="text-xl font-black text-slate-900">
                            No Jobs Posted Yet
                        </h3>
                        <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                            Start by creating your first job opening to attract top talent.
                        </p>
                        <a
                            href="/post-job"
                            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-all"
                        >
                            Create First Listing
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterDashboard;
