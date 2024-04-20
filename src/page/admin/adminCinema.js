import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import LayoutAdmin from "../../layout/admin/layoutAdmin";
import ManageCinema from "../../components/ManageCinema/manageCinema";

const AdminCinema = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return (
        <LayoutAdmin>
            <ManageCinema />
        </LayoutAdmin>
    )
}

export default AdminCinema