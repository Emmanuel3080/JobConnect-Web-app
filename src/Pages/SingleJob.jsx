import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { jobContext } from "../Context/JobContext";
import JobDetails from "../Components/JobDetails";
import Header from "../Common/Header";
import Footer from "../Components/Footer";

const SingleJob = () => {
  const { id } = useParams();
  const { getSingleJob, singleJob } = useContext(jobContext);

  useEffect(() => {
    if (id) {
      getSingleJob(id);
    }
  }, [getSingleJob, id]);

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col text-[#14243A]">
      <Header />

      <main className="flex-1">
        <JobDetails
          title={singleJob?.title}
          company={singleJob?.company}
          location={singleJob?.location}
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
          id={singleJob?._id || id}
        />
      </main>

      <Footer />
    </div>
  );
};

export default SingleJob;
