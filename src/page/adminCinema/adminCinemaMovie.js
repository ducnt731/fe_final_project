import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import LayoutAdminCinema from "../../layout/adminCinema/layoutAdminCinema";
import AdminCinemaManageMovie from "../../components/adminCinemaManageMovie/adminCinemaManageMovie";

const AdminCinemaHome = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin cinema") {
            toast.error("You must be admin cinema to render this site!")
            navigate('/')
        }
    }, [])
    return (
        <LayoutAdminCinema>
            <AdminCinemaManageMovie />
        </LayoutAdminCinema>
    )
}

export default AdminCinemaHome