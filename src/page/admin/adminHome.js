import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import AdminHome from "../../components/adminHome/adminHome";
import LayoutAdmin from "../../layout/admin/layoutAdmin";

const Admin = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return (
        <LayoutAdmin>
            <AdminHome />
        </LayoutAdmin>
    )
}

export default Admin