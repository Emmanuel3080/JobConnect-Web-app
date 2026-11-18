import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authContext } from "../Context/AuthContext";

const ProtectedRoute = () => {
  const { isUserAuthenticated } = useContext(authContext);
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    const isAuth = async () => {
      try {
        const checkAuth = await isUserAuthenticated();
        if (!checkAuth) {
          toast.error("Kindly SignIn");
          navigate("/signin");
        }
      } catch (error) {
        console.log(error);
        navigate("/signin");
      } finally {
        if (mounted) setChecking(false);
      }
    };
    isAuth();
    return () => {
      mounted = false;
    };
  }, [isUserAuthenticated, navigate]);

  if (checking) {
    return (
      <div className="min-h-screen bg-[#F4F1EA] flex flex-col">
        <div className="h-16 bg-[#FFFCF6] border-b border-[#E5DED2] px-6 flex items-center justify-between">
          <div className="w-32 h-6 bg-[#ECE7DC] rounded-md animate-pulse" />
          <div className="w-24 h-8 bg-[#ECE7DC] rounded-lg animate-pulse" />
        </div>
        <div className="max-w-7xl w-full mx-auto px-6 py-10 space-y-6">
          <div className="h-40 bg-[#FFFCF6] border border-[#E5DED2] rounded-xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-52 bg-[#FFFCF6] border border-[#E5DED2] rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
