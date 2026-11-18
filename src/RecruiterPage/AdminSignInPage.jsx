import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { recruiterAuthContext } from "../Context/RecruiterContext";
import logo from "../assets/jobconnect_logo.svg";
import recruiterBgPic from "../assets/hr-expert-reading-files-identifying-right-candidates-job-opening.jpg";

const recruiterSchema = yup.object({
  recruiterEmail: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password Field is Required")
    .min(6, "Minimum of Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
});

const AdminSignInPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { handleSignIn, loadingLogin } = useContext(recruiterAuthContext);

  const submitData = async (data) => {
    try {
      await handleSignIn(data);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(recruiterSchema),
  });

  const checkErrors = (err) => {
    console.log(errors);
    const firstError = Object.values(err)[0]?.message;
    if (firstError) toast.error(firstError);
  };

  const toggleVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#14243A] grid grid-cols-1 lg:grid-cols-12">
      {/* Left Split-Screen Recruitment Visual Panel (Reuse Project Asset) */}
      <div
        className="hidden lg:flex lg:col-span-6 relative bg-cover bg-center p-12 flex-col justify-between overflow-hidden"
        style={{ backgroundImage: `url(${recruiterBgPic})` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#14243A]/95 via-[#14243A]/70 to-[#14243A]/45"
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFFCF6] flex items-center justify-center p-1.5 shadow-sm">
            <img
              src={logo}
              alt="JobConnect"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-[#FFFCF6]">
            Job<span className="text-[#39AFA0]">Connect</span>
          </span>
         
        </div>

        <div className="relative z-10 max-w-lg space-y-5">
          {/* <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A875] bg-[#14243A]/85 border border-[#D6A875]/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
            Enterprise Talent Acquisition
          </span> */}

          <h2 className="text-3xl xl:text-4xl font-extrabold text-[#FFFCF6] tracking-tight leading-tight">
            Find, evaluate, and hire exceptional talent with clarity.
          </h2>

          <p className="text-sm text-[#E5DED2] leading-relaxed">
            Streamline your recruitment workflow with split-pane candidate triage, Kanban pipelines, and direct applicant communication.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#FFFCF6]/90">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              Split-Pane Applicant Triage
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              Structured Pipeline Management
            </span>
          </div>
        </div>
      </div>

      {/* Right Split-Screen Form Panel */}
      <div className="lg:col-span-6 flex flex-col justify-center items-center p-6 sm:p-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center justify-center gap-2.5 mb-2">
              <img
                src={logo}
                alt="JobConnect"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight text-[#14243A]">
                Job<span className="text-[#39AFA0]">Connect</span>
              </span>
              <span className="text-[10px] font-semibold bg-[#14243A] text-[#D6A875] px-2 py-0.5 rounded-full">
                ATS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14243A] tracking-tight">
              Sign in to Recruiter Console
            </h1>
            <p className="text-xs sm:text-sm text-[#526174]">
              Manage job listings, evaluate applicants, and run your hiring pipeline
            </p>
          </div>

          <form
            onSubmit={handleSubmit(submitData, checkErrors)}
            className="bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xs"
          >
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#14243A]">
                  Work Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <input
                    type="email"
                    placeholder="recruiter@company.com"
                    className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                    {...register("recruiterEmail")}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#14243A]">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={
                      passwordVisible ? "Hide password" : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C8793] hover:text-[#14243A] cursor-pointer"
                  >
                    {passwordVisible ? (
                      <EyeOff className="w-4 h-4" strokeWidth={1.5} />
                    ) : (
                      <Eye className="w-4 h-4" strokeWidth={1.5} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loadingLogin}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${loadingLogin
                  ? "bg-[#7C8793] text-white cursor-not-allowed"
                  : "bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer"
                }`}
            >
              {loadingLogin ? (
                <>
                  <span>Signing In...</span>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <span>Sign In to ATS</span>
                  <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.5} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#526174] pt-2 border-t border-[#E5DED2]">
              Need a recruiter account?{" "}
              <Link
                to="/company/signup"
                className="text-[#39AFA0] font-semibold hover:underline"
              >
                Register Company
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};

export default AdminSignInPage;
