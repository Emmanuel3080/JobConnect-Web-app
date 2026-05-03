import React, { useContext, useState } from 'react'
import pic from "../assets/hr-expert-reading-files-identifying-right-candidates-job-opening.jpg"
import { recruiterAuthContext } from '../Context/RecruiterContext'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const recruiterSchema = yup.object({
    recruiterEmail: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password Field is Required")
        .min(6, "Minimum of be Six Characters")
        .matches(/[a-z]/, "Password must contain lowercase Letter"),

})
const AdminSignInPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)


    const { handleSignIn, loadingLogin } = useContext(recruiterAuthContext)



    const submitData = async (data) => {
        try {
            await handleSignIn(data)
        } catch (error) {
            console.log(error);
        }
    }
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(recruiterSchema)
    })

    const checkErrors = (err) => {
        console.log(errors);

        const firstError = Object.values(err)[0].message;
        toast.error(firstError);
    };

    const toggleVisibility = () => {
        setPasswordVisible((prev) => !prev)
    }
    return (
        <div>
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
                style={{ backgroundImage: `url(${pic})` }}>
                {/* Overlay for background contrast */}
                <div className="absolute inset-0 bg-slate-900/60"></div>


                <div className="relative z-10 w-full max-w-2xl" style={{ marginLeft: "" }}>
                    <form
                        className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6" onSubmit={handleSubmit(submitData, checkErrors)}
                    >
                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                                Welcome Back!{" "}
                                <span className="text-base md:text-lg bg-teal-100 rounded-full px-3 py-1 text-black font-bold">
                                    Recruiter
                                </span>
                            </h1>
                            <p className="text-slate-300 mt-3 text-sm md:text-base">
                                Please enter your details to sign in
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="group flex items-center bg-white/95 rounded-xl p-3.5 transition-all focus-within:ring-slate-500">
                                <i className="fa fa-envelope text-slate-400 mr-3 w-5 text-center"></i>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-transparent outline-none"
                                    {...register("recruiterEmail")}
                                />
                            </div>

                            <div className="group flex items-center bg-white/95 rounded-xl p-3.5 transition-all focus-within:ring-slate-500">
                                <i className="fa fa-lock text-slate-400 mr-3 w-5 text-center"></i>
                                <input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full bg-transparent outline-none"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={toggleVisibility}
                                    className="text-slate-500 hover:text-slate-700 transition-colors focus:outline-none"
                                >
                                    <i className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </button>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className={`
    flex items-center justify-center gap-2 px-4 py-4 rounded-lg w-full text-white text-lg
    transition
    ${loadingLogin ? "bg-gray-500 cursor-not-allowed"  // disabled style
                                    : "bg-slate-900 hover:bg-slate-700 cursor-pointer" // normal style
                                }`}
                            disabled={loadingLogin}

                        >{loadingLogin ? (
                            <>
                                {/* Spinner */}
                                Creating Account
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                        ) : (
                            "Create Account"
                        )}
                        </button>


                        <p className="text-center text-sm text-slate-300">
                            Don't have an account?{' '}
                            <button type="button" className="text-white font-semibold hover:underline decoration-slate-400 underline-offset-4">
                                <a href="/company/signup">  Create one</a>
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminSignInPage