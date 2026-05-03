import React, { useContext, useState } from 'react';
// Ensure your pathing is correct for your local setup
import pic from "../assets/hr-employee-does-greeting-handshake-with-happy-candidate-wheelchair.jpg";
import { authContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';


const employeeSchema = yup.object({
  userEmail: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password Field is Required")
    .min(6, "Minimum of be Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),

})
const SignInPage = () => {
  const { handleSigIn, loginState } = useContext(authContext)
  const [passwordVisible, setPasswordVisible] = useState(false);


  const toggleVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const submitData = async (data) => {
    try {
      await handleSigIn(data)
    } catch (error) {
      console.log(error);

    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(employeeSchema)
  })

  const checkErrors = (err) => {
    console.log(errors);

    const firstError = Object.values(err)[0].message;
    toast.error(firstError);
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6 relative font-sans"
      style={{ backgroundImage: `url(${pic})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/70" aria-hidden="true"></div>

      <div className="relative z-10 w-full max-w-xl">
        <form
          className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl space-y-6"
          onSubmit={handleSubmit(submitData, checkErrors)}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Welcome Back</h1>
            <p className="text-slate-300 mt-2">Please enter your details to sign in</p>
          </div>

          <div className="space-y-4">
            {/* Email Input */}
            <div className="group flex items-center bg-white/95 rounded-xl p-3.5 transition-all focus-within:ring-slate-500">
              <i className="fa fa-envelope text-slate-400 mr-3 w-5 text-center"></i>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-transparent outline-none"
                {...register("userEmail")}
              />
            </div>

            {/* Password Input */}
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
            type="submit"
            className={`
    flex items-center justify-center gap-2 px-4 py-4 rounded-lg w-full text-white text-lg
    transition
    ${loginState ? "bg-gray-500 cursor-not-allowed"  // disabled style
                : "bg-slate-900 hover:bg-slate-700 cursor-pointer" // normal style
              }`}
            disabled={loginState}
          >
            {loginState ? (
              <div
                className='flex items-center gap-2'>
                Autheniticating User
                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>

              </div>) : "Sign In"}
          </button>

          <p className="text-center text-sm text-slate-300">
            Don't have an account?{' '}
            <button type="button" className="text-white font-semibold hover:underline decoration-slate-400 underline-offset-4">
              <a href="/signup">  Create one</a>
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;