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
                    background: "rgba(255, 255, 255, 0.8)", // Slight transparency
                    backdropFilter: "blur(12px)",           // Glass effect
                    WebkitBackdropFilter: "blur(12px)",     // Safari support
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "14px",                   // Matches modern UI curves
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "16px",
                    color: "#0f172a",                       // Slate-900 for readability
                    fontFamily: "inherit",                  // Respects your app's font-family
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
                  },
                  className: "my-toast-class", // Optional for Tailwind overrides
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
