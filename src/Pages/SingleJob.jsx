import React, { useContext, useEffect } from 'react'
import { jobContext } from '../Context/JobContext'
import { useParams } from 'react-router-dom'
import JobDetails from '../Components/JobDetails'
import Header from '../Common/Header'

const SingleJob = () => {
  const { id } = useParams()

  const { getSingleJob, singleJob } = useContext(jobContext)

  console.log(singleJob);
  useEffect(() => {
    getSingleJob(id)
  }, [])
  return (
    <div>
      <Header />

      <JobDetails title={singleJob?.title} location={singleJob?.location}
        salary={singleJob?.salary}
        jobType={singleJob?.jobType}
        remote={singleJob?.remote}
        description={singleJob?.description}
        requirements={singleJob?.requirements}
        skills={singleJob?.skills}
        category={singleJob?.category}
        No_of_Applicant={singleJob?.No_of_Applicant}
        applicationDeadline={singleJob?.applicationDeadline}
        datePosted={singleJob?.datePosted}
        postedBy={singleJob?.postedBy}
        id={singleJob?._id}

      />
    </div>
  )
}

export default SingleJob