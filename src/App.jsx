import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from './AuthPages/Signup'
import SignInpage from './AuthPages/SignInpage'
import EmployeeDash from './Dashboard/EmployeeDashboard'
import AuthProvider from './Context/AuthContext'
import { Toaster } from 'sonner'
import ProtectedRoute from './Common/ProtectedRoute'
import JobProvider from './Context/JobContext'
import AdminSignUpPage from './RecruiterPage/AdminSignUpPage'
import AdminSignInPage from './RecruiterPage/AdminSignInPage'
import RecruiterAuthProvider from './Context/RecruiterContext'
import RecruiterLayout from './Components/recruiter/layout/RecruiterLayout'
import Overview from './RecruiterPage/Overview'
import RecruiterJobs from './RecruiterPage/Jobs'
import RecruiterApplicants from './RecruiterPage/Applicants'
import TalentPool from './RecruiterPage/TalentPool'
import Interviews from './RecruiterPage/Interviews'
import RecruiterSettings from './RecruiterPage/Settings'
import AdminProtected from './Common/AdminProtected'
import AllJobs from './Pages/AllJobs'
import SingleJob from './Pages/SingleJob'
import CreateJob from './RecruiterPage/CreateJob'
import Applications from './Pages/Applications'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <r */}
        <RecruiterAuthProvider>
          <AuthProvider>
            <JobProvider>

              <Toaster
                richColors
                closeButton
                toastOptions={{
                  style: {
                    background: "rgba(255, 252, 246, 0.95)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid #E5DED2",
                    borderRadius: "14px",
                    fontSize: "13px",
                    fontWeight: "600",
                    padding: "14px 16px",
                    color: "#14243A",
                    fontFamily: "inherit",
                    boxShadow: "0 10px 15px -3px rgba(20, 36, 58, 0.08), 0 4px 6px -4px rgba(20, 36, 58, 0.06)",
                  },
                  className: "my-toast-class",
                }}
              />

              {/* Auth Pages */}
              <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<SignInpage />} />

                {/* Recruiter Route */}
                <Route path='/company/signup' element={<AdminSignUpPage />} />
                <Route path='/company/signin' element={<AdminSignInPage />} />

                {/* Recruiter Protected */}
                <Route element={<AdminProtected />}>
                  <Route path='/company' element={<RecruiterLayout />}>
                    <Route index element={<Overview />} />
                    <Route path='jobs' element={<RecruiterJobs />} />
                    <Route path='applicants' element={<RecruiterApplicants />} />
                    <Route path='talent-pool' element={<TalentPool />} />
                    <Route path='interviews' element={<Interviews />} />
                    <Route path='settings' element={<RecruiterSettings />} />
                  </Route>
                  <Route path='/post-job' element={<CreateJob />} />

                </Route>


                {/* Employee Protected Route */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<EmployeeDash />} />
                  <Route path='/jobs' element={<AllJobs />} />
                  <Route path='/job/:id' element={<SingleJob />} />
                  <Route path="/applications" element={<Applications />} />
                </Route>


              </Routes>

            </JobProvider>

          </AuthProvider>

        </RecruiterAuthProvider>
      </BrowserRouter>


    </>
  )
}

export default App
