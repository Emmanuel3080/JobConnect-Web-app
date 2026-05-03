import { Children, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext()



const AuthProvider = ({ children }) => {


    const navigate = useNavigate()
    const [loadiing, setLoading] = useState(false)
    const [loginState, setLoggingIn] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    // const greet = () => {
    //     alert("Heloo")
    // }

    const baseUrl = import.meta.env.VITE_API_URL
    // console.log(baseUrl);



    const handleSignUp = async (userData) => {

        setLoading(true)
        const payload = new FormData()
        payload.append("name", userData.name)
        payload.append("email", userData.email)
        payload.append("password", userData.password)
        payload.append("phoneNumber", userData.phoneNumber)
        payload.append("Location", userData.Location)
        payload.append("Skills", userData.Skills)


        if (userData.cvUrl && userData.cvUrl[0]) {
            payload.append("cvUrl", userData.cvUrl[0]);
        }
        try {

            const response = await fetch(`${`${baseUrl}/employee/signup`}`,
                {
                    method: "POST",
                    headers: {
                        // "Content-Type": "application/json",

                    },
                    body: payload
                }
            )
            const data = await response.json()
            console.log(data);

            if (response.ok) {
                toast.success(data.Message || "Sign Up Successful")
                navigate("/signin")

            }
            else {
                toast.error(data.Message || "Sign Up Failed")
            }

        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false)
        }
    }


    // const greet = () => {
    //     alert("Helooo")
    // }


    const handleSigIn = async (userData) => {
        setLoggingIn(true)
        try {

            const response = await fetch(`${baseUrl}/employee/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json()
            console.log(data);
            if (response.ok) {
                toast.success(`Welcome onboard ${data.user.email}` || "Sign In Successful")
                navigate("/")
                localStorage.setItem("AccessToken", data.accessToken)
            }
            else {
                toast.error(data.Message || "Failed to Sign In")
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoggingIn(false)
        }
    }



    const isUserAuthenticated = async () => {
        const token = localStorage.getItem("AccessToken")
        if (!token) {
            return false
        }
        try {
            const response = await fetch(`${baseUrl}/employee/verify_token`, {
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
        loadiing,
        loginState,
        userInfo,
        handleSignUp,
        handleSigIn,
        isUserAuthenticated

    }
    return (
        <authContext.Provider value={authValue}>{children}</authContext.Provider>
    )
}


export default AuthProvider