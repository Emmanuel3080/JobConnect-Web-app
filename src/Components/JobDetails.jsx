import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { authContext } from "../Context/AuthContext";
import { jobContext } from "../Context/JobContext";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form";


Modal.setAppElement("#root")




const jobSchema = yup.object({
    candidateName: yup.string().required("Field is Required"),
    email: yup.string().email("Invalid Email").required("Field is Required"),
    phoneNumber: yup.string().required("Field is Required"),
    coverLetter: yup.string().required("Field is Required"),
})
const JobDetails = ({
    title,
    company,
    location,
    salary,
    jobType,
    remote,
    description,
    requirements,
    skills,
    category,
    No_of_Applicant,
    applicationDeadline,
    datePosted,
    postedBy,
    id
}) => {
    let subtitle;
    const [modalOpen, setOpen] = useState(false)
    const { userInfo } = useContext(authContext)

    const { submitApplication,
        isApplying, } = useContext(jobContext)


    const openModal = () => {
        setOpen(true);
        // setLoading(true)
    }
    const afterOpenModal = () => {
        // references are now sync'd and can be accessed.
        subtitle.style.color = "#f00";
    }
    const closeModal = () => {
        setOpen(false);
    }


    const applyJob = async (data) => {
        try {
            await submitApplication(id, data)
        }
        catch (error) {
            console.log(error);
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(jobSchema)
    })

    const checkErrors = (err) => {
        const firstError = Object.values(err)[0].message;
        toast.error(firstError);
    };




    return (

        <div>

            <Modal
                isOpen={modalOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(15, 23, 42, 0.65)",
                        zIndex: 1000,
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    content: {
                        position: "relative",
                        inset: "auto",
                        width: "95%",
                        maxWidth: "600px",
                        height: "500px",
                        padding: "0",
                        borderRadius: "20px",
                        border: "none",
                        overflowY: "auto",
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    },
                }}
                contentLabel="Apply for Job"
            >
                <div className="bg-white">
                    <div className="relative px-8 pt-8 pb-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            Apply for <span className="text-indigo-600">{title}</span>
                        </h2>
                        <p className="text-slate-500 text-sm mt-1">Complete the form below to submit your application.</p>
                    </div>

                    <form className="p-8 pt-4 space-y-5" onSubmit={handleSubmit(applyJob, checkErrors)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-700 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    name="candidateName"
                                    defaultValue={userInfo?.name}
                                    placeholder="John Doe"
                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    {...register("candidateName")}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-slate-700 ml-1">Phone Number</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    defaultValue={userInfo?.phoneNumber}
                                    placeholder="+234"
                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                    required
                                    {...register("phoneNumber")}

                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={userInfo?.email}
                                placeholder="john@example.com"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                required
                                {...register("email")}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Cover Letter</label>
                            <textarea
                                name="coverLetter"
                                placeholder="Tell us why you're a great fit..."
                                rows="3"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                                {...register("coverLetter")}
                            ></textarea>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700 ml-1">Resume / CV</label>
                            <div className="relative group">
                                <input
                                    type="file"
                                    name="cvFile"
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-dashed border-slate-300 p-4 rounded-xl transition-colors group-hover:border-indigo-400"
                                    required
                                    {...register("cvUrl")}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isApplying}
                            className={`w-full text-white py-4 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 tracking-wide active:scale-[0.98] transition-all mt-2 ${isApplying
                                ? "cursor-not-allowed bg-slate-500"
                                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                                }`}
                        >
                            {isApplying ? (
                                <span className="flex items-center justify-center gap-2">
                                    Sending Application
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                </span>
                            ) : (
                                "Send Application"
                            )}
                        </button>
                    </form>
                </div>
            </Modal>


            <div className="bg-slate-50 min-h-screen pb-12 font-sans antialiased text-slate-900">
                <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] px-2 py-0 rounded">
                                        {/* {category || "Opportunity"} */}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                    {title || "Position Title"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3 text-sm font-bold text-slate-500">

                                    <span className="flex items-center"><i className="fa fa-map-marker-alt mr-2 text-blue-500"></i>{location}</span>
                                    <span className="flex items-center"><i className="fa fa-briefcase mr-2 text-blue-500"></i>{jobType}</span>
                                    <span className="flex items-center"><i className="fa fa-laptop-house mr-2 text-blue-500"></i>{remote ? "Remote" : "On-site"}</span>
                                </div>
                            </div>

                            <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
                                <button
                                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all active:scale-95 shadow-lg shadow-blue-100 cursor-pointer"
                                    onClick={openModal}
                                >
                                    Apply Now <i className="fa fa-arrow-right ml-2"></i>
                                </button>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                                    <i className="fa fa-calendar-check mr-1"></i> Posted {datePosted ? new Date(datePosted).toLocaleDateString() : "Recently"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-8xl mx-auto px-2 mt-3">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-200">
                                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-3 border-b text-center border-slate-100 pb-4">
                                    Job Overview
                                </h3>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                                            <i className="fa fa-wallet text-sm"></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Offered Salary</p>
                                            <p className="font-bold text-slate-900">{salary || "Competitive"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                                            <i className="fa fa-hourglass-end text-sm"></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Deadline</p>
                                            <p className="font-bold text-slate-900">{applicationDeadline ? new Date(applicationDeadline).toDateString() : "Open"}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                                            <i className="fa fa-users text-sm"></i>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Applicants</p>
                                            <p className="font-bold text-slate-900">{No_of_Applicant || 0} candidates</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recruiter Card */}
                            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
                                    Hiring Contact
                                </p>

                                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-50">
                                    <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold shrink-0 shadow-inner">
                                        {postedBy?.name?.charAt(0) || "Name"}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-black text-slate-900 truncate leading-tight uppercase tracking-tight">
                                            {postedBy?.name || "Hiring Manager"}
                                        </p>
                                        <p className="text-xs font-bold text-slate-500 truncate mt-1 italic">
                                            {postedBy?.companyName || "Company"}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 space-y-3">
                                    <a
                                        href={`https://wa.me/${postedBy?.phoneNumber}?text=${encodeURIComponent(
                                            `Hello ${postedBy?.name}, I'm interested in the ${title} role at ${postedBy?.companyName}.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]"
                                    >
                                        <i className="fab fa-whatsapp text-sm"></i>
                                        Chat on WhatsApp
                                    </a>
                                    <a
                                        href={`mailto:${postedBy?.email}?subject=${encodeURIComponent(
                                            `Application for ${title} role`
                                        )}&body=${encodeURIComponent(
                                            `Hello ${postedBy?.name},\n\nI'm interested in the ${title} position at ${postedBy?.companyName}.`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full bg-slate-600 hover:bg-black text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]"
                                    >
                                        <i className="fa fa-envelope text-sm"></i>
                                        Send Email
                                    </a>


                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Detailed Content (Col 8) */}
                        <div className="lg:col-span-8 space-y-8 order-1 lg:order-2">
                            {/* Description */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    {/* <span className="w-2 h-6 bg-blue-600 rounded-full"></span> */}
                                    Job Description
                                </h2>
                                <div className="text-slate-600 leading-[1.8] text-lg whitespace-pre-line">
                                    {description || "No description provided."}
                                </div>
                            </div>

                            {/* Requirements */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                    {/* <span className="w-2 h-6 bg-slate-900 rounded-full"></span> */}
                                    Requirements
                                </h2>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {requirements?.length > 0 ? (
                                        requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-medium text-sm">
                                                <i className="fa fa-check-circle text-blue-500 mt-1"></i>
                                                {req}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic">No specific requirements listed.</p>
                                    )}
                                </ul>
                            </div>

                            {/* Skills */}
                            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
                                <h2 className="text-xl font-black text-slate-900 mb-8">Expertise Required</h2>
                                <div className="flex flex-wrap gap-3">
                                    {skills?.length > 0 ? (
                                        skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-pointer px-6 py-3 rounded-xl text-xs font-black text-slate-500 uppercase tracking-widest border border-slate-200 shadow-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-slate-400 italic">No skills specified.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default JobDetails;