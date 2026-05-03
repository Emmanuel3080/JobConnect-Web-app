import React, { useContext, useEffect } from 'react'
import { authContext } from '../Context/AuthContext'
import Header from '../Common/Header'
import { jobContext } from '../Context/JobContext'
import JobCard from '../Components/JobCard'
import Landingpage from '../Pages/Landingpage'
import JobSection from '../Components/JobSection'

const EmployeeDash = () => {

  const { userInfo } = useContext(authContext)

  const { jobs, fetchJobs, loadingJobs } = useContext(jobContext)
  useEffect(() => {
    fetchJobs()
  }, [])
  return (
    <div>
      <Header />
      <Landingpage />
    <JobSection />
    

     
    </div>
  )
}


export default EmployeeDash    