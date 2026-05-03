import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export const jobContext = createContext()



const JobProvider = ({ children }) => {
    const [loadingJobs, setLoadingJobs] = useState(false)
    const [postingJob, setPostJob] = useState(false)
    const [jobs, setJobs] = useState([])
    const [singleJob, setSingleJob] = useState({})
    const [isApplying, setApplying] = useState(false)
    const [applicants, setApplicants] = useState([])
    const navigate = useNavigate()
    // const [] =useState()

    const baseUrl = import.meta.env.VITE_API_URL

    const fetchJobs = async () => {
        setLoadingJobs(true)
        try {
            const response = await fetch(`${baseUrl}/employee/all/jobs`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setJobs(data.jobs)
                // console.log(data);
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoadingJobs(false)
        }
    }



    const getSingleJob = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/employee/job/${id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
                    }
                }
            )
            const data = await response.json()
            if (response.ok) {
                console.log(data);
                setSingleJob(data.job)
            }

        } catch (error) {
            console.log(error);
        }
    }



    const postJob = async (jobData) => {
        setPostJob(true)
        const token = localStorage.getItem("RecruiterAccessToken")
        try {
            const response = await fetch(`${baseUrl}/company/add_job`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(jobData)
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data);

                toast.success("Job Posted Successfully")
                navigate("/company")
            }
            else {
                toast.error("Error Posting Job")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setPostJob(false)
        }
    }


    const submitApplication = async (jobId, userData) => {

        setApplying(true)
        const payload = new FormData()

        payload.append("candidateName", userData.candidateName)
        payload.append("email", userData.email)
        payload.append("phoneNumber", userData.phoneNumber)
        payload.append("coverLetter", userData.coverLetter)
        payload.append("jobId", jobId)

        if (userData.cvUrl && userData.cvUrl[0]) {
            payload.append("cvUrl", userData.cvUrl[0])
        }

        try {
            const response = await fetch(`${baseUrl}/employee/apply_job`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AccessToken")}`
                },
                body: payload
            })

            const data = await response.json()
            console.log(data);

            if (response.ok) {
                toast.success("Application Submitted Successfully")
                console.log(data);
                navigate("/")

            }
            else {
                toast.error(`${data.Message} ` || "Error Applying Job")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setApplying(false)
        }
    }


    const getApplicationsJob = async (id) => {

        try {
            const response = await fetch(`${baseUrl}/company/jobs/applicants/${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("RecruiterAccessToken")}`
                    }
                }
            )
            const data = await response.json()
            console.log(data);
            if (response.ok) {
                setApplicants(data.applications)
            }

        } catch (error) {
            console.log(error);
        }
    }


    // const get
    const jobValue = {
        fetchJobs,
        getSingleJob,
        postJob,
        submitApplication,
        getApplicationsJob,
        applicants,
        isApplying,
        jobs,
        loadingJobs,
        singleJob,
        postingJob
    }
    return (
        <>
            <jobContext.Provider value={jobValue}>{children}</jobContext.Provider>
        </>
    )



}

export default JobProvider