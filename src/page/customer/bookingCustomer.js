import React, { useEffect } from "react"
import LayoutCustomer from "../../layout/customer/layoutCustomer"
import Booking from "../../components/booking/customerBooking"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const BookingCustomer = () => {

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('accessToken') !== true) {
            toast.error("You must to login to booking ticket!!!")
            navigate('/login')
        }
    }, [])

    return (
        <LayoutCustomer>
            <Booking/>
        </LayoutCustomer>
    )
}

export default BookingCustomer