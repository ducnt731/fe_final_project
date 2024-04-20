import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import LayoutAdmin from "../../layout/admin/layoutAdmin";
import ShowTimeSchedule from "../../components/scheduleShowTime/schedule";

const AdminSchedule = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return (
        <LayoutAdmin>
            <ShowTimeSchedule />
        </LayoutAdmin>
    )
}

export default AdminSchedule