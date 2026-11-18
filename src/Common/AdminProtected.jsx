import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { recruiterAuthContext } from "../Context/RecruiterContext";

const AdminProtected = () => {
  const { isRecruterAuthenticated } = useContext(recruiterAuthContext);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const isAuth = async () => {
      try {
        const checkAuth = await isRecruterAuthenticated();
        if (!checkAuth) {
          toast.error("Kindly Sign In");
          navigate("/company/signin");
        }
      } catch (error) {
        console.log(error);
        navigate("/company/signin");
      } finally {
        if (mounted) setChecking(false);
      }
    };
    isAuth();
    return () => {
      mounted = false;
    };
  }, [isRecruterAuthenticated, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex flex-col">
        <div className="h-16 bg-[#14243A] px-6 flex items-center justify-between">
          <div className="w-36 h-6 bg-[#213B50] rounded-md animate-pulse" />
          <div className="w-28 h-8 bg-[#213B50] rounded-lg animate-pulse" />
        </div>
        <div className="max-w-7xl w-full mx-auto px-6 py-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-24 bg-[#FFFCF6] border border-[#E5DED2] rounded-xl animate-pulse"
              />
            ))}
          </div>
          <div className="h-96 bg-[#FFFCF6] border border-[#E5DED2] rounded-xl animate-pulse" />
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default AdminProtected;
