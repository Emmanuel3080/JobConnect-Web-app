import React, { useContext, useEffect } from 'react'
import { recruiterAuthContext } from '../Context/RecruiterContext'
import { toast } from 'sonner'
import { Outlet, useNavigate } from 'react-router-dom'

const AdminProtected = () => {

    const { isRecruterAuthenticated, userInfo } = useContext(recruiterAuthContext)
    const navigate = useNavigate()

    const isAuth = async () => {
        try {
            const checkAuth = await isRecruterAuthenticated()
            if (!checkAuth) {
                toast.error("Kindly Sign In")
                navigate("/company/signin")
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        isAuth()
    }, [])
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminProtected