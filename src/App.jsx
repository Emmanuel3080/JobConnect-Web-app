import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
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
import RecruiterDashboard from './Dashboard/RecruiterDashboard'
import AdminProtected from './Common/AdminProtected'
import AllJobs from './Pages/AllJobs'
import SingleJob from './Pages/SingleJob'
import CreateJob from './RecruiterPage/CreateJob'
import Applications from './Pages/Applications'

function App() {
  const [count, setCount] = useState(0)

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
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "500",
                    padding: "12px",
                    fontFamily: "sans-serif",
                    boxShadow: "0px 0px 2px purple",
                  },
                }} />

              {/* Auth Pages */}
              <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<SignInpage />} />

                {/* Recruiter Route */}
                <Route path='/company/signup' element={<AdminSignUpPage />} />
                <Route path='/company/signin' element={<AdminSignInPage />} />

                {/* Recruiter Protected */}
                <Route element={<AdminProtected />}>
                  <Route path='/company' element={<RecruiterDashboard />} />
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
