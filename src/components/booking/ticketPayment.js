import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { saveBooking } from "../../service/userService";

const TicketPayment = () => {
    const location = useLocation();
    console.log("Location:", location);
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const token = queryParams.get('token');
    const PayerID = queryParams.get('PayerID');
    // // Retrieve from localStorage
    const navigate = useNavigate();
    const paymentData = JSON.parse(localStorage.getItem('paymentData'));
    console.log("Payment data on ticket page:", paymentData);

    console.log("Payment data on ticket page:", paymentData.selectedTime);

    const saveBookingInfo = async () => {
        const userId = localStorage.getItem('user_id');
        console.log('userId:', userId); // Check if userId is retrieved correctly
        if (!paymentData) {
            console.error('No payment data available');
            return;
        }
        try {
            const data = {
                user: userId,
                showtime: paymentData.showtimeId,
                date: paymentData.selectedDate,
                totalPrice: paymentData.total,
                seats: paymentData.selectedSeats.join(','),
                time: paymentData.selectedTime,
                status: 'Paid',
            };
            console.log('Data being sent to saveBooking:', data); // Verify the data is correct
            await saveBooking(data);
            localStorage.setItem('bookingSaved', 'true');  // Mark as saved
            console.log('Booking information saved successfully');
        } catch (error) {
            console.error("Error saving booking info:", error);
        }
    };

    useEffect(() => {
        if (!paymentData) {
            console.error('No payment data available');
            return;
        }
        console.log('Payment data:', paymentData);
        const alreadySaved = localStorage.getItem('bookingSaved') === 'true';
        console.log('Booking already saved:', alreadySaved);
        if (!alreadySaved) {
            saveBookingInfo();
        }

    }, [paymentData]);


    const handleGoHome = () => {
        localStorage.removeItem('bookingSaved');
        navigate("/home");
    };
    return (
        <div>
            <div className="booking-container">
                <div className="booking-site">
                    <div className="total-price">
                        <div className="nameRoom">
                            <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{paymentId}</div>
                            <div style={{ fontWeight: "bold", fontSize: "1.2em", color: "#72be43" }}>{paymentData?.cinema}</div>
                            <div> <span style={{ color: "#72be43" }}>Room:</span> {paymentData?.room} -
                                <span style={{ color: "#ff0000" }}> Date:</span> {paymentData?.selectedDate} -
                                <span style={{ color: "#007bff" }}> Time:</span> {paymentData?.selectedTime}</div>
                        </div>
                        <div className="nameMovie">
                            <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>{paymentData?.name}</div>
                            <div> <span style={{ color: "#72be43" }}>Seats: </span> {paymentData?.selectedSeats.join(', ')}</div>
                            <div className="total">
                                <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#72be43" }}>Total price:</div>
                                <div style={{ fontWeight: "bold", fontSize: "1.6em", color: "#ff0000" }}>{paymentData?.total} VND</div>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "20px" }}>
                            <h2 style={{ color: "green" }}>Payment Successful!</h2>
                            <button className="buttonNext" onClick={handleGoHome}>Go to Home</button>
                        </div>
                    </div>
                </div>

            </div>


            {/* Other details */}
        </div>
    );
};

export default TicketPayment;
