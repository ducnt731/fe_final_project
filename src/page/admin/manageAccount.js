import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import LayoutAdmin from "../../layout/admin/layoutAdmin";
import Account from "../../components/ManageAccounts/accounts";

const ManageAccount = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('role') !== "admin") {
            toast.error("You must be admin to render this site!")
            navigate('/')
        }
    }, [])
    return(
        <LayoutAdmin>
            <Account/>
        </LayoutAdmin>
    )
}

export default ManageAccount