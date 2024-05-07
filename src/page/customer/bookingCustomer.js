import React, { useEffect } from "react"
import LayoutCustomer from "../../layout/customer/layoutCustomer"
import Booking from "../../components/booking/customerBooking"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const BookingCustomer = () => {

    const navigate = useNavigate()
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            toast.error("You must log in to book tickets!!!")
            navigate('/login');
        }
    }, []);

    return (
        <LayoutCustomer>
            <Booking/>
        </LayoutCustomer>
    )
}

export default BookingCustomer