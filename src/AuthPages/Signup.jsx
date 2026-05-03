import React, { useContext, useEffect, useState } from 'react';
import pic from "../assets/hr-employee-does-greeting-handshake-with-happy-candidate-wheelchair.jpg";
import { authContext } from '../Context/AuthContext';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"


const employeeSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
        .string()
        .required("Password Field is Required")
        .min(6, "Minimum of be Six Characters")
        .matches(/[a-z]/, "Password must contain lowercase Letter"),
    phoneNumber: yup.number().required("Phone Number Field Required"),
    Location: yup.string().required("Location Field Required"),
    Skills: yup.string().required("Skill Field Required"),
})

const Signup = () => {

    const [passwordVisible, setPasswordVisible] = useState(false)

    const { loadiing,
        handleSignUp } = useContext(authContext)





    const togglePassword = () => {
        setPasswordVisible(!passwordVisible)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(employeeSchema)
    })

    const checkErrors = (err) => {
        console.log(errors);

        const firstError = Object.values(err)[0].message;
        toast.error(firstError);
    };
    // useEffect(() => {
    //     greet()
    // }, [])

    // const submitData = async (data) => {
    //     try {
    //         const userData = handleSignUp(data)
    //     } catch (error) {
    //         console.log(error);

    //     }

    // }

    // useEffect(() => {
    //     greet()
    // }, [])
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
            style={{ backgroundImage: `url(${pic})` }}
        >
            {/* Overlay for background contrast */}
            <div className="absolute inset-0 bg-slate-900/60"></div>

            {/* Form Container */}
            <div className="relative z-10 w-full max-w-2xl" style={{ marginLeft: "" }}>
                <form className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-2xl max-w-10xl space-y-4" onSubmit={handleSubmit(handleSignUp, checkErrors)}>

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-white">
                            Create Account
                        </h1>

                        <p className="text-slate-200 text-sm mt-2">
                            Welcome to <span className="font-semibold">Job Connect</span> — join our inclusive community today.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <div className='flex items-center bg-white/90 border px-3 rounded-lg focus-within:ring-slate-500' >
                            <i className='fa fa-user text-gray-500 mr-2'></i>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                                className="w-full p-3 transparent  outline-none"
                                {...register("name")}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className='flex items-center justify-center bg-white/90 px-3 rounded-lg focus-within:ring-slate-500'>
                                <i className='fa fa-envelope text-gray-500 mr-2'></i>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full p-3 
                                    transparent  outline-none"
                                    {...register("email")}
                                />
                            </div>

                            <div className='flex items-center bg-white/90 px-3 rounded-lg focus:focus-within:ring-slate-500'>
                                <i className='fa fa-phone text-gray-500 mr-2'></i>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="w-full p-3 transparent  outline-none"
                                    {...register("phoneNumber")}
                                />

                            </div>
                        </div>



                        <div className='flex items-center bg-white/90 rounded-lg px-3 focus-within:ring-slate-500 '>
                            <i className='fa fa-lock text-gray-500 mr-2'></i>
                            <input
                                type={`${passwordVisible ? "text" : "password"}`}
                                placeholder="******"
                                className="w-full p-3 transparent  outline-none"
                                {...register("password")}
                            />
                            <div onClick={togglePassword}>
                                {passwordVisible ? (<div>
                                    <i className='fa fa-eye text-gray-500 ml-2'></i>
                                </div>) : (<div>
                                    <i className='fa fa-eye-slash text-gray-500 ml-2'></i>
                                </div>)}

                            </div>

                        </div>
                        <div className='flex items-center bg-white/90 px-3 rounded-lg focus:focus-within:ring-slate-500'>
                            <i class="fa fa-location text-gray-500 mr-2" aria-hidden="true"></i>
                            <input
                                type="text"
                                placeholder="Location (City, Country)"
                                className="w-full p-3 transparent  outline-none"
                                {...register("Location")}
                            />
                        </div>

                        <div className='flex items-center bg-white/90 px-3 rounded-lg focus:focus-within:ring-slate-500'>
                            <i className='fa fa-building text-gray-500 mr-2'></i>
                            <input
                                type="text"
                                placeholder="Skills (e.g. React, Design)"
                                className="w-full p-3 transparent outline-none"
                                {...register("Skills")}
                            />
                        </div>

                        <div className="flex flex-col">

                            <label className="text-xs text-slate-200 mb-1 ml-1">
                                Upload Resume/Photo
                            </label>

                            <div className="flex items-center bg-white/90 border rounded-lg px-3 focus-within:ring-2 focus-within:ring-slate-500">

                                <i className="fa fa-upload text-gray-500 mr-2"></i>

                                <input
                                    type="file"
                                    className="w-full p-2 bg-transparent outline-none text-sm text-gray-700 cursor-pointer
      file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 
      file:text-sm file:font-medium file:bg-slate-100 file:text-slate-700 
      hover:file:bg-slate-200"
                                    {...register("cvUrl")}
                                />

                            </div>
                        </div>
                    </div>

                    <button
                        type='submit'
                        className={`
    flex items-center justify-center gap-2 px-4 py-4 rounded-lg w-full text-white text-lg
    transition
    ${loadiing ? "bg-gray-500 cursor-not-allowed"  // disabled style
                                : "bg-slate-900 hover:bg-slate-700 cursor-pointer" // normal style
                            }`}
                        disabled={loadiing}
                    >
                        {loadiing ? (
                            <>
                                {/* Spinner */}
                                Creating Account
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                    <p className="text-center text-sm text-slate-300 mt-4">
                        Already have an account? <span className="text-slate-400 cursor-pointer hover:underline font-medium">
                            <a href="/signin">Log In</a>
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;