import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

import LayoutAdmin from "../../layout/admin/layoutAdmin";
import ManageMovie from "../../components/ManageMovie/manageMovie";

const AdminMovie = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return (
        <LayoutAdmin>
            <ManageMovie />
        </LayoutAdmin>
    )
}

export default AdminMovie