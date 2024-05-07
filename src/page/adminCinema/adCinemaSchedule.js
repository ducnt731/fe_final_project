import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import LayoutAdminCinema from "../../layout/adminCinema/layoutAdminCinema";
import AdminCinemaShowTimeSchedule from "../../components/scheduleShowTime/adminCinemaSchedule";

const AdminCinemaSchedule = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin cinema") {
            toast.error("You must be admin cinema to render this site!")
            navigate('/')
        }
    }, [])
    return (
        <LayoutAdminCinema>
            <AdminCinemaShowTimeSchedule />
        </LayoutAdminCinema>
    )
}

export default AdminCinemaSchedule