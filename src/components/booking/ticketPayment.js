import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import '../../style/booking.css'

const TicketPayment = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const token = queryParams.get('token');
    const PayerID = queryParams.get('PayerID');
    // Retrieve from localStorage
    const paymentData = JSON.parse(localStorage.getItem('paymentData'));
    const navigate = useNavigate();
    console.log(paymentData)

    // // Retrieve payment data from localStorage
    // useEffect(() => {
    //     const storedData = localStorage.getItem('paymentData');
    //     if (storedData) {
    //         setPaymentData(JSON.parse(storedData));
    //     } else {
    //         // Handle the case where no payment data is found
    //         console.error('No payment data available');
    //     }
    // }, []);

    // Optionally save payment info to your backend
    useEffect(() => {
        if (paymentId && PayerID) {
            // Uncomment and modify this to match your actual endpoint and required body data
            // savePaymentInfo(paymentId, PayerID);
        }
    }, [paymentId, PayerID]);

    // const savePaymentInfo = async (paymentId, PayerID) => {
    //     try {
    //         const response = await axios.post('YOUR_BACKEND_ENDPOINT', { paymentId, PayerID });
    //         console.log('Payment information saved:', response.data);
    //     } catch (error) {
    //         console.error('Error saving payment information:', error);
    //     }
    // };
    const handleGoHome = () => {
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
                            <button className="buttonHome" onClick={handleGoHome}>Go to Home</button>
                        </div>
                    </div>
                </div>

            </div>


            {/* Other details */}
        </div>
    );
};

export default TicketPayment;
