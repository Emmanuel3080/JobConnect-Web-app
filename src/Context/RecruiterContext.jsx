import { createContext, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const recruiterAuthContext = createContext()


const RecruiterAuthProvider = ({ children }) => {
    const baseUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [loadingLogin, setLoadinLogin] = useState(false)
    const [userInfo, setUserInfo] = useState({})



    const handleSignUp = async (recruiterData) => {
        setLoading(true)
        try {
            const response = await fetch(`${baseUrl}/company/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(recruiterData)
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Successful Signup🎉")
                navigate("/company/signin")
                console.log(data);

            }
            else {
                toast.error(`${data.Message}` || "Failed to Signup")
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false)
        }
    }



    const handleSignIn = async (recruiterData) => {
        setLoadinLogin(true)
        try {
            const response = await fetch(`${baseUrl}/company/signin`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(recruiterData)
                }
            )

            const data = await response.json()

            if (response.ok) {
                toast.success(`Welcome Onboard ${data.user.name}`)
                navigate("/company")
                localStorage.setItem("RecruiterAccessToken", data.accessToken)
            }
            else {
                toast.error(`${data.Message}` || "Unable to SignIn")
            }

        } catch (error) {
            console.log(error);

        }
        finally {
            setLoadinLogin(false)
        }
    }

    const isRecruterAuthenticated = async () => {
        const token = localStorage.getItem("RecruiterAccessToken")
        if (!token) {
            return false
        }
        try {
            const response = await fetch(`${baseUrl}/company/verify_token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setUserInfo(data.user)
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);

        }
    }

    const authValue = {
        loading,
        loadingLogin,
        userInfo,
        handleSignUp,
        handleSignIn,
        isRecruterAuthenticated
    }

    return (
        <recruiterAuthContext.Provider value={authValue}>{children}</recruiterAuthContext.Provider>
    )
}


export default RecruiterAuthProvider