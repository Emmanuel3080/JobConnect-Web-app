import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Upload,
  User,
} from "lucide-react";
import { authContext } from "../Context/AuthContext";
import logo from "../assets/jobconnect_logo.svg";
import authBgPic from "../assets/hr-employee-does-greeting-handshake-with-happy-candidate-wheelchair.jpg";

const employeeSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password Field is Required")
    .min(6, "Minimum of Six Characters")
    .matches(/[a-z]/, "Password must contain lowercase Letter"),
  phoneNumber: yup.number().required("Phone Number Field Required"),
  Location: yup.string().required("Location Field Required"),
  Skills: yup.string().required("Skill Field Required"),
});

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { loadiing, handleSignUp } = useContext(authContext);

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
  });

  const checkErrors = (err) => {
    console.log(errors);
    const firstError = Object.values(err)[0]?.message;
    if (firstError) toast.error(firstError);
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#14243A] grid grid-cols-1 lg:grid-cols-12">
      {/* Left Split-Screen Visual Panel (Reuse Project Asset) */}
      <div
        className="hidden lg:flex lg:col-span-5 relative bg-cover bg-center p-12 flex-col justify-between overflow-hidden"
        style={{ backgroundImage: `url(${authBgPic})` }}
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

        <div className="relative z-10 max-w-md space-y-5">
          {/* <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D6A875] bg-[#14243A]/80 border border-[#D6A875]/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
            Join Our Inclusive Community
          </span> */}

          <h2 className="text-3xl font-extrabold text-[#FFFCF6] tracking-tight leading-tight">
            Build your career profile and connect with top employers.
          </h2>

          <p className="text-sm text-[#E5DED2] leading-relaxed">
            Highlight your core skills, upload your resume once, and apply to verified positions with complete visibility into every hiring stage.
          </p>

          <div className="pt-2 space-y-2 text-xs text-[#FFFCF6]/90">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              <span>Skill-calibrated job recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.75} />
              <span>Direct recruiter communication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Split-Screen Form Panel */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-10">
        <div className="w-full max-w-xl space-y-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center justify-center gap-2.5 mb-2">
              <img
                src={logo}
                alt="JobConnect"
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-extrabold tracking-tight text-[#14243A]">
                Job<span className="text-[#39AFA0]">Connect</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#14243A] tracking-tight">
              Create your candidate account
            </h1>
            <p className="text-xs sm:text-sm text-[#526174]">
              Complete your profile details below to start exploring opportunities
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp, checkErrors)}
            className="bg-[#FFFCF6] border border-[#E5DED2] rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs"
          >
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#14243A]">
                Full Name *
              </label>
              <div className="relative">
                <User
                  className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                  {...register("name")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#14243A]">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                    {...register("email")}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#14243A]">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone
                    className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="w-full font-mono-tabular bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                    {...register("phoneNumber")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#14243A]">
                Password *
              </label>
              <div className="relative">
                <Lock
                  className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                  strokeWidth={1.5}
                />
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#14243A]">
                  Location *
                </label>
                <div className="relative">
                  <MapPin
                    className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    placeholder="City, Country"
                    className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                    {...register("Location")}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#14243A]">
                  Core Skills *
                </label>
                <div className="relative">
                  <Sparkles
                    className="w-4 h-4 text-[#7C8793] absolute left-3.5 top-1/2 -translate-y-1/2"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    placeholder="e.g. React, TypeScript, UI Design"
                    className="w-full bg-[#F4F1EA] border border-[#E5DED2] focus:bg-[#FFFCF6] focus:border-[#39AFA0] rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-[#14243A] placeholder:text-[#7C8793] outline-none transition-colors"
                    {...register("Skills")}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#14243A] flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#39AFA0]" strokeWidth={1.5} />
                Upload Resume / Photo
              </label>
              <input
                type="file"
                className="block w-full text-xs text-[#526174] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#39AFA0]/15 file:text-[#14243A] hover:file:bg-[#39AFA0]/25 cursor-pointer bg-[#F4F1EA] border-2 border-dashed border-[#E5DED2] hover:border-[#39AFA0] p-3 rounded-xl transition-colors"
                {...register("cvUrl")}
              />
            </div>

            <button
              type="submit"
              disabled={loadiing}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors mt-2 ${
                loadiing
                  ? "bg-[#7C8793] text-white cursor-not-allowed"
                  : "bg-[#14243A] text-[#FFFCF6] hover:bg-[#213B50] cursor-pointer"
              }`}
            >
              {loadiing ? (
                <>
                  <span>Creating Account...</span>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 text-[#39AFA0]" strokeWidth={1.5} />
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#526174] pt-2 border-t border-[#E5DED2]">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#39AFA0] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
