import React, { useContext, useEffect } from 'react'
import { authContext } from '../Context/AuthContext'
import { toast } from 'sonner'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
    const { isUserAuthenticated, userInfo } = useContext(authContext)

    const navigate = useNavigate()



    const isAuth = async () => {
        try {
            const checkAuth = await isUserAuthenticated()
            if (!checkAuth) {
                toast.error("Kindly SignIn")
                navigate("/signin")
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        isAuth()
    }, [])
    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoute