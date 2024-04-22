import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import AdminHome from "../../components/adminHome/adminHome";
import LayoutAdmin from "../../layout/admin/layoutAdmin";
import LayoutAdminCinema from "../../layout/adminCinema/layoutAdminCinema";
import AdminCinema from "../../components/adminCinemaHome/adminCinemaHome";

const AdminCinemaHome = () => {
    // const navigate = useNavigate()
    // useEffect(() => {
    //     if (localStorage.getItem('role') !== "admin cinema") {
    //         toast.error("You must be admin cinema to render this site!")
    //         navigate('/')
    //     }
    // }, [])
    return (
        <LayoutAdminCinema>
            <AdminCinema />
        </LayoutAdminCinema>
    )
}

export default AdminCinemaHome